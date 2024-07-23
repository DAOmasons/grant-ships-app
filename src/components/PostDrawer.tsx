import { Drawer, ScrollArea, useMantineTheme } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';

export const PostDrawer = () => {
  const theme = useMantineTheme();

  const location = useLocation();
  const navigate = useNavigate();

  const isOpen = location.pathname.includes('post');

  const onClose = () =>
    navigate(location.pathname.replace(/\/(post(-media)?)$/, ''));

  return (
    <Drawer.Root opened={isOpen} size="lg" onClose={onClose} position="right">
      <Drawer.Overlay />
      <Drawer.Content bg={theme.colors.dark[6]}>
        <ScrollArea h="100vh">
          {/* <RegisterProject
            existingProject={project}
            refetchOnEdit={refetchProject}
          /> */}
        </ScrollArea>
      </Drawer.Content>
    </Drawer.Root>
  );
};
