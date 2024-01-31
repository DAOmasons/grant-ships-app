import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { Project } from './pages/Project';
import { RegisterProject } from './components/forms/RegisterProject';

export const ClientRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="projects" element={<Projects />} />
    <Route path="project/:id" element={<Project />} />
    <Route path="register-project" element={<RegisterProject />} />
  </Routes>
);
