import {
  Avatar,
  Box,
  Flex,
  Paper,
  Skeleton,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { useBreakpoints } from '../../hooks/useBreakpoint';
import { useGrant } from '../../hooks/useGrant';

export const TopSection = () => {
  const { project, ship, isLoadingGrant } = useGrant();
  const theme = useMantineTheme();
  const { isTablet, isMobile } = useBreakpoints();

  const avatarSize = isMobile ? 80 : 115;

  const shipImg = ship?.profileMetadata?.imgUrl;
  const projectImg = project?.metadata?.imgUrl;
  const shipName = ship?.name;
  const projectName = project?.name;

  return (
    <Paper
      py="lg"
      px="md"
      mb={'lg'}
      bg={theme.colors.dark[6]}
      w={isTablet ? '100%' : 600}
    >
      <Flex
        align={isTablet ? 'flex-start' : 'center'}
        gap="md"
        direction={isTablet ? 'column' : 'row'}
      >
        <Avatar.Group spacing={'xl'}>
          <Avatar size={avatarSize} src={shipImg ? shipImg : null}>
            <Skeleton h={avatarSize} w={avatarSize} circle />
          </Avatar>
          <Avatar size={avatarSize} src={projectImg ? projectImg : null}>
            <Skeleton h={avatarSize} w={avatarSize} circle />
          </Avatar>
        </Avatar.Group>
        <Box>
          {isLoadingGrant ? (
            <Skeleton w={175} h={20} mb="sm" />
          ) : (
            <Text fz="xl" fw={600} c={theme.colors.dark[0]} mb={2}>
              Grant Partnership
            </Text>
          )}
          {isLoadingGrant ? (
            <Skeleton w={120} h={16} />
          ) : (
            <Text fz="sm" c={theme.colors.dark[2]}>
              {projectName} {'<>'} {shipName}
            </Text>
          )}
        </Box>
      </Flex>
    </Paper>
  );
};
