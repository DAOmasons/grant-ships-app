import { getBuiltGraphSDK } from '../.graphclient';
import { useQuery } from '@tanstack/react-query';

const getProjects = async () => {
  const { GetProjects } = getBuiltGraphSDK();

  const { projects } = await GetProjects();

  return projects;
};

export const Projects = () => {
  const { data } = useQuery({ queryKey: ['projects'], queryFn: getProjects });

  console.log('data', data);

  return <div>Projects</div>;
};
