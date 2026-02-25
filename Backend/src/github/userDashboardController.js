import axios from 'axios';
import { User } from './userModel.js';
import { Review } from '../models/Review.js';

export const getDashboardData = async (req, res) => {
    try {
        const user = req.user;
        console.log(`>>> Fetching dashboard data for: ${user.username}`);
        if (!user.accessToken) {
            return res.status(400).json({ success: false, message: "No access token found for user" });
        }

        // Active projects from user DB
        const activeProjectNames = user.projects || [];

        // Fetch user repositories from GitHub
        const repoResponse = await axios.get('https://api.github.com/user/repos?sort=updated&per_page=50', {
            headers: {
                Authorization: `Bearer ${user.accessToken}`,
                Accept: 'application/vnd.github.v3+json'
            }
        });

        console.log(`>>> GitHub returned ${repoResponse.data.length} repos`);

        // Map repos and mark those that are in user's projects
        const allRepos = repoResponse.data.map(repo => ({
            name: repo.name,
            fullName: repo.full_name,
            isActive: activeProjectNames.includes(repo.full_name),
            prs: repo.open_issues_count,
            description: repo.description
        }));

        const activeRepos = allRepos.filter(r => r.isActive);

        // Fetch actual review count from DB for user's repos
        const scanCount = await Review.countDocuments({
            repoFullName: { $in: activeProjectNames }
        });

        res.status(200).json({
            success: true,
            data: {
                username: user.username,
                activeRepos: activeRepos,
                allRepos: allRepos, // To show in "Add Project" list
                stats: {
                    totalPrs: activeRepos.reduce((acc, r) => acc + r.prs, 0),
                    activeProjects: activeRepos.length,
                    totalScans: scanCount || 0
                }
            }
        });
    } catch (err) {
        console.error("Dashboard Data Error:", err.message);
        res.status(500).json({ success: false, message: "Failed to fetch dashboard data" });
    }
};

export const toggleProject = async (req, res) => {
    try {
        const { repoFullName } = req.body;
        const user = await User.findById(req.user._id);

        const index = user.projects.indexOf(repoFullName);
        if (index > -1) {
            user.projects.splice(index, 1); // Remove if exists
        } else {
            user.projects.push(repoFullName); // Add if not
        }

        await user.save();
        res.status(200).json({ success: true, projects: user.projects });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const getRepoAnalytics = async (req, res) => {
    try {
        const { repoFullName } = req.params;
        const user = req.user;

        // 1. Fetch real PRs from GitHub
        const githubPrs = await axios.get(`https://api.github.com/repos/${repoFullName}/pulls?state=all&per_page=5`, {
            headers: {
                Authorization: `Bearer ${user.accessToken}`,
                Accept: 'application/vnd.github.v3+json'
            }
        });

        // 2. Fetch comments for EACH PR to show real interaction
        const reports = await Promise.all(githubPrs.data.map(async (pr) => {
            const dbReview = await Review.findOne({ repoFullName, prNumber: pr.number });

            // 1. Fetch GitHub Issue Comments (general conversation)
            const issueComments = await axios.get(pr.comments_url, {
                headers: { Authorization: `Bearer ${user.accessToken}`, Accept: 'application/vnd.github.v3+json' }
            });

            // 2. Fetch GitHub Review Comments (line-specific)
            const reviewComments = await axios.get(pr.review_comments_url, {
                headers: { Authorization: `Bearer ${user.accessToken}`, Accept: 'application/vnd.github.v3+json' }
            });

            // 3. Fetch GitHub Reviews (the overall summaries/bodies)
            const reviewsUrl = `https://api.github.com/repos/${repoFullName}/pulls/${pr.number}/reviews`;
            const reviewsRes = await axios.get(reviewsUrl, {
                headers: { Authorization: `Bearer ${user.accessToken}`, Accept: 'application/vnd.github.v3+json' }
            });

            // Combine EVERYTHING: general comments, line comments, and review bodies
            const allTexts = [
                ...issueComments.data.map(c => ({ body: c.body, date: c.created_at, author: c.user.login })),
                ...reviewComments.data.map(c => ({ body: c.body, date: c.created_at, author: c.user.login })),
                ...reviewsRes.data.filter(r => r.body).map(r => ({ body: r.body, date: r.submitted_at, author: r.user.login }))
            ].sort((a, b) => new Date(b.date) - new Date(a.date));

            console.log(`>>> PR #${pr.number} Context: ${issueComments.data.length} issues, ${reviewComments.data.length} lines, ${reviewsRes.data.length} review-bodies`);

            return {
                prNumber: pr.number,
                title: pr.title,
                status: dbReview ? dbReview.status : (pr.state === 'open' ? 'Pending' : 'Closed'),
                score: dbReview ? dbReview.score : (pr.state === 'closed' ? 100 : 0),
                timestamp: pr.created_at,
                // Pick the most recent real comment if no AI report exists
                analysis: dbReview ? dbReview.analysis : (allTexts.length > 0 ? allTexts[0].body : "No conversation history found on this PR."),
                isAiGenerated: !!dbReview,
                author: (allTexts.length > 0) ? allTexts[0].author : pr.user.login,
                commentsCount: allTexts.length
            };
        }));

        const dbReviews = await Review.find({ repoFullName });

        res.status(200).json({
            success: true,
            data: {
                repoFullName,
                reports: reports,
                metadata: {
                    openPrs: githubPrs.data.filter(p => p.state === 'open').length,
                    totalScans: dbReviews.length,
                    averageScore: reports.length > 0 ? (reports.reduce((a, b) => a + (b.score || 0), 0) / reports.length).toFixed(0) : 0
                }
            }
        });
    } catch (err) {
        console.error("Analytics Error:", err.message);
        res.status(500).json({ success: false, message: "Failed to fetch analytics" });
    }
};
