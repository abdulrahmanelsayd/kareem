import { Routes, Route, Navigate } from 'react-router-dom';
import Onboarding from './pages/Onboarding';
import Home from './pages/Home';
import PlaceholderPage from './pages/PlaceholderPage';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';

function App() {
    return (
        <div className="app-container">
            <Routes>
                <Route path="/" element={<Onboarding />} />
                <Route path="/home" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:id" element={<ProjectDetails />} />
                <Route path="/services" element={<PlaceholderPage title="خدماتنا - قريباً" />} />
                <Route path="/contact" element={<PlaceholderPage title="تواصل معنا - قريباً" />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </div>
    );
}

export default App;
