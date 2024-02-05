import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { Project } from './pages/Project';
import { RegisterProject } from './components/forms/RegisterProject';
import { Ships } from './pages/Ships';
import { GameRules } from './pages/GameRules';
import { Apply } from './pages/Apply';
import { CreateShip } from './pages/CreateShip';

export const ClientRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="projects" element={<Projects />} />
      <Route path="create-project" element={<RegisterProject />} />
      <Route path="create-ship" element={<CreateShip />} />
      <Route path="ships" element={<Ships />} />
      <Route path="game-rules" element={<GameRules />} />
      <Route path="apply" element={<Apply />} />
      <Route path="project/:id" element={<Project />} />
    </Routes>
  );
};