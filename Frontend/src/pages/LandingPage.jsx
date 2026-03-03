import React from 'react';
import HeroSection from '../components/landing/HeroSection';
import StatsSection from '../components/landing/StatsSection';
import HowItWorksSection from '../components/landing/HowItWorksSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import QuotesSection from '../components/landing/QuotesSection';
import CtaSection from '../components/landing/CtaSection';
import Footer from '../components/landing/Footer';

const LandingPage = () => {
    return (
        <div className="relative overflow-x-hidden">
            <HeroSection />
            <StatsSection />
            <HowItWorksSection />
            <FeaturesSection />
            <QuotesSection />
            <CtaSection />
            <Footer />
        </div>
    );
};

export default LandingPage;
