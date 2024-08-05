import { Drawer, ScrollArea, useMantineTheme } from '@mantine/core';
import { RegisterProject } from '../../pages/RegisterProject';
import { ProjectPageUI } from '../../types/ui';
import { useLocation, useNavigate } from 'react-router-dom';

type EditProfileDrawerProps = {
  project: ProjectPageUI;
  refetchProject: () => void;
};

export const EditProfileDrawer = ({
  project,
  refetchProject,
}: EditProfileDrawerProps) => {
  const theme = useMantineTheme();

  const location = useLocation();
  const navigate = useNavigate();

  const isEditing = location.pathname.includes('edit');

  const onClose = () =>
    navigate(location.pathname.replace(/\/(edit(-media)?)$/, ''));

  return (
    <Drawer.Root opened={isEditing} size="lg" onClose={onClose}>
      <Drawer.Overlay />
      <Drawer.Content bg={theme.colors.dark[6]}>
        <ScrollArea h="100vh">
          <RegisterProject
            existingProject={project}
            refetchOnEdit={refetchProject}
          />
        </ScrollArea>
      </Drawer.Content>
    </Drawer.Root>
  );
};
