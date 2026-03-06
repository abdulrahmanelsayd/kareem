import React from 'react';
import GlobalNavigation from '../components/GlobalNavigation';

const PlaceholderPage = ({ title }) => {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg-primary)' }}>
            <GlobalNavigation />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <h1 style={{ fontWeight: 300, color: 'var(--color-accent)' }}>{title}</h1>
            </div>
        </div>
    );
};

export default PlaceholderPage;
