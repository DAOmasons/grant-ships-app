import { Button, Group, Paper, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

import classes from '../pages/PageStyles.module.css';
import { useGameManager } from '../hooks/useGameMangers';
import { GameStatus } from '../types/common';
import { ReactNode } from 'react';
import { useMobile } from '../hooks/useBreakpoint';

export const Banner = () => {
  const { gm, isLoadingGm, gmError } = useGameManager();

  if (isLoadingGm) return <BannerBG />;

  if (gmError || !gm)
    return (
      <BannerBG>
        <Text fz={24} fw={700} c="white">
          Game Manager Error
        </Text>
      </BannerBG>
    );

  if (
    !gm.currentRound ||
    (gm?.currentRound?.gameStatus &&
      gm?.currentRound?.gameStatus < GameStatus.Allocated)
  ) {
    return (
      <BannerBG>
        <Innards
          statusText="Now accepting Grant Ships."
          ctaText="Submit your application today."
          ctaButton={
            <Button component={Link} to="create-ship" size="xs">
              Submit an Application
            </Button>
          }
          infoBtn={
            <Button
              component="a"
              href="https://rules.grantships.fun/"
              variant="transparent"
              rel="noopener noreferrer"
              target="_blank"
            >
              What is a Grant Ship?
            </Button>
          }
        />
      </BannerBG>
    );
  }

  if (gm.currentRound.gameStatus < GameStatus.Active) {
    return (
      <BannerBG>
        <Innards
          statusText="Ships Accepted."
          ctaText="Pre-submit projects for funding."
          ctaButton={
            <Button component={Link} to="create-project">
              Create a Project
            </Button>
          }
          infoBtn={
            <Button
              component="a"
              href="https://rules.grantships.fun/"
              variant="transparent"
              rel="noopener noreferrer"
              target="_blank"
            >
              What is Grant Ships?
            </Button>
          }
        />
      </BannerBG>
    );
  }

  if (gm.currentRound.gameStatus === GameStatus.Active) {
    return (
      <BannerBG>
        <Innards
          statusText="Projects Accepted."
          ctaText="Vote for your favorite projects."
          ctaButton={
            <Button component={Link} to="create-project">
              Create a Project
            </Button>
          }
          infoBtn={
            <Button
              component="a"
              href="https://rules.grantships.fun/"
              variant="transparent"
              rel="noopener noreferrer"
              target="_blank"
            >
              What is a Grant Ship?
            </Button>
          }
        />
      </BannerBG>
    );
  }

  if (gm.currentRound.gameStatus === GameStatus.Completed) {
    return (
      <BannerBG>
        <Innards
          statusText="Round Complete."
          ctaText="Stay tuned for election details."
          ctaButton={
            <Button component={Link} to="create-project">
              View Details
            </Button>
          }
          infoBtn={
            <Button
              component="a"
              href="https://rules.grantships.fun/"
              variant="transparent"
              rel="noopener noreferrer"
              target="_blank"
            >
              What are we electing?
            </Button>
          }
        />
      </BannerBG>
    );
  }

  return (
    <BannerBG>
      <Text fw={700} c="white">
        Game State Not Found
      </Text>
    </BannerBG>
  );
};

const BannerBG = ({ children }: { children?: ReactNode }) => {
  const isMobile = useMobile();

  if (isMobile) {
    return (
      <Paper h={124} w="100%" p="md" classNames={{ root: classes.banner }}>
        {children}
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
      {children}
    </Paper>
  );
};

export const Innards = ({
  statusText,
  ctaText,
  ctaButton,
  infoBtn,
}: {
  statusText?: string;
  ctaText?: string;
  ctaButton?: ReactNode;
  infoBtn?: ReactNode;
}) => {
  const isMobile = useMobile();

  const fz = isMobile ? 'md' : '1.5rem';
  return (
    <>
      {isMobile ? (
        <>
          <Text fz={fz} fw={700} c="white" mr={8}>
            {statusText}
          </Text>
          <Text fz={fz} fw={700} c="white">
            {ctaText}
          </Text>
        </>
      ) : (
        <Text fz={fz} fw={700} c="white" mr={8}>
          {statusText} {ctaText}
        </Text>
      )}
      <Group mt={isMobile ? 8 : 'md'} gap={isMobile ? 4 : 'md'}>
        {ctaButton}
        {infoBtn}
      </Group>
    </>
  );
};
