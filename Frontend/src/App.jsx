import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import './App.css';

function App() {
    const location = useLocation();
    const showNav = location.pathname === '/';

    return (
        <div className="min-h-screen relative overflow-x-hidden bg-surface-base">
            {showNav && <Navbar />}
            <main>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
