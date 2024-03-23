import { Button, Group, Paper, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

import classes from '../pages/PageStyles.module.css';
import { useGameManager } from '../hooks/useGameMangers';
import { GameStatus } from '../types/common';

export const Banner = () => {
  const { gm, isLoadingGm, gmError } = useGameManager();

  if (isLoadingGm)
    return (
      <Paper
        h={180}
        w="100%"
        p="xl"
        mb={-30}
        classNames={{ root: classes.banner }}
      />
    );

  if (gmError || !gm)
    return (
      <Paper
        h={180}
        w="100%"
        p="xl"
        mb={-30}
        classNames={{ root: classes.banner }}
      >
        <Text fz={24} fw={700} c="white">
          Game Manager Error
        </Text>
      </Paper>
    );

  if (
    !gm.currentRound ||
    (gm?.currentRound?.gameStatus &&
      gm?.currentRound?.gameStatus < GameStatus.Allocated)
  ) {
    return (
      <Paper
        h={180}
        w="100%"
        p="xl"
        mb={-30}
        classNames={{ root: classes.banner }}
      >
        <Text fz={24} fw={700} c="white">
          Now accepting ship operatators.{' '}
          <Text fz={24} fw={700} component="span">
            Submit your application today.{' '}
          </Text>
        </Text>
        <Group mt="md">
          <Button component={Link} to="create-ship">
            Submit an Application
          </Button>
          <Button
            component="a"
            href="https://rules.grantships.fun/"
            variant="transparent"
            rel="noopener noreferrer"
            target="_blank"
          >
            What is a Grant Ship?
          </Button>
        </Group>
      </Paper>
    );
  }

  if (gm.currentRound.gameStatus < GameStatus.Active) {
    return (
      <Paper
        h={180}
        w="100%"
        p="xl"
        mb={-30}
        classNames={{ root: classes.banner }}
      >
        <Text fz={24} fw={700} c="white">
          Ships Accepted.{' '}
          <Text fz={24} fw={700} component="span">
            Pre-submit projects for funding.{' '}
          </Text>
        </Text>
        <Group mt="md">
          <Button component={Link} to="create-project">
            Create a Project
          </Button>
          <Button
            component="a"
            href="https://rules.grantships.fun/"
            variant="transparent"
            rel="noopener noreferrer"
            target="_blank"
          >
            What is Grant Ships?
          </Button>
        </Group>
      </Paper>
    );
  }

  if (gm.currentRound.gameStatus === GameStatus.Active) {
    return (
      <Paper
        h={180}
        w="100%"
        p="xl"
        mb={-30}
        classNames={{ root: classes.banner }}
      >
        <Text fz={24} fw={700} c="white">
          Now Accepting Grantees.{' '}
          <Text fz={24} fw={700} component="span">
            Submit your application today.{' '}
          </Text>
        </Text>
        <Group mt="md">
          <Button component={Link} to="create-project">
            Create a Project
          </Button>
          <Button
            component="a"
            href="https://rules.grantships.fun/"
            variant="transparent"
            rel="noopener noreferrer"
            target="_blank"
          >
            What is a Grant Ship?
          </Button>
        </Group>
      </Paper>
    );
  }

  if (gm.currentRound.gameStatus === GameStatus.Completed) {
    return (
      <Paper
        h={180}
        w="100%"
        p="xl"
        mb={-30}
        classNames={{ root: classes.banner }}
      >
        <Text fz={24} fw={700} c="white">
          Round complete.{' '}
          <Text fz={24} fw={700} component="span">
            Stay tuned for election details.{' '}
          </Text>
        </Text>
        <Group mt="md">
          <Button component={Link} to="create-project">
            View Details
          </Button>
          <Button
            component="a"
            href="https://rules.grantships.fun/"
            variant="transparent"
            rel="noopener noreferrer"
            target="_blank"
          >
            What are we electing?
          </Button>
        </Group>
      </Paper>
    );
  }

  return (
    <Paper
      h={180}
      w="100%"
      p="xl"
      mb={-30}
      classNames={{ root: classes.banner }}
    >
      <Text fz={24} fw={700} c="white">
        Game State Not Found
      </Text>
    </Paper>
  );
};
