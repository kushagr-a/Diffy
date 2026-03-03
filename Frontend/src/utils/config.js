const config = {
    // Backend API URL - defaults to localhost in development
    // For production, set VITE_API_URL in your .env file
    API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3030',
};

export default config;
