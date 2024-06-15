import { Button, Group, Paper, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

import classes from '../pages/PageStyles.module.css';
import { useGameManager } from '../hooks/useGameMangers';
import { ContestStatus, GameStatus, VotingStage } from '../types/common';
import { ReactNode, useEffect, useState } from 'react';
import { useMobile } from '../hooks/useBreakpoint';
import { useVoting } from '../hooks/useVoting';
import { secondsToLongDate } from '../utils/time';

export const Banner = () => {
  const { gm, isLoadingGm, gmError } = useGameManager();
  const { contestStatus, contest, votingStage } = useVoting();
  const isMobile = useMobile();

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
            <Button
              component={Link}
              to="create-ship"
              size={isMobile ? 'xs' : 'sm'}
            >
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
            <Button
              component={Link}
              to="create-project"
              size={isMobile ? 'xs' : 'sm'}
            >
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
          statusText="Game On!"
          ctaText="Now Accepting Project Applications"
          ctaButton={
            <Button
              component={Link}
              to="create-project"
              size={isMobile ? 'xs' : 'sm'}
            >
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

  const roundOver = gm.currentRound.gameStatus === GameStatus.Completed;

  if (
    (roundOver && contestStatus === ContestStatus.Populating) ||
    (roundOver && contestStatus === ContestStatus.None)
  ) {
    return (
      <BannerBG>
        <Innards
          statusText="Round Complete."
          ctaText="Stay tuned for voting details."
          ctaButton={
            <Button component={Link} to="/vote" size={isMobile ? 'xs' : 'sm'}>
              Preview Portfolios
            </Button>
          }
          infoBtn={
            <Button
              component="a"
              href="https://rules.grantships.fun/how-to-play/as-a-dao-mem.html"
              variant="transparent"
              rel="noopener noreferrer"
              target="_blank"
            >
              Vote details
            </Button>
          }
        />
      </BannerBG>
    );
  }

  const voteIsIdle =
    roundOver &&
    contestStatus === ContestStatus.None &&
    votingStage === VotingStage.None;

  const voteIsSetup =
    roundOver &&
    contestStatus === ContestStatus.Voting &&
    (votingStage === VotingStage.Initiated || votingStage === VotingStage.None);

  const voteIsActive =
    roundOver &&
    contestStatus === ContestStatus.Voting &&
    votingStage === VotingStage.Active;

  const voteIsClosed =
    votingStage >= VotingStage.Closed ||
    contestStatus >= ContestStatus.Finalized;

  if (voteIsIdle || voteIsSetup) {
    return (
      <BannerBG>
        <Innards
          statusText="Voting is almost ready! "
          ctaText={
            voteIsSetup && contest?.startTime
              ? `Starts: ${secondsToLongDate(contest.startTime)}`
              : 'Stay tuned'
          }
          ctaButton={
            <Button
              component={Link}
              to="create-project"
              size={isMobile ? 'xs' : 'sm'}
            >
              View Details
            </Button>
          }
          infoBtn={
            <Button
              component="a"
              href="https://rules.grantships.fun/how-to-play/as-a-dao-mem.html"
              variant="transparent"
              rel="noopener noreferrer"
              target="_blank"
            >
              Vote details
            </Button>
          }
        />
      </BannerBG>
    );
  }

  if (voteIsActive) {
    return (
      <BannerBG>
        <VoteCountdown />
      </BannerBG>
    );
  }

  if (voteIsClosed) {
    return (
      <BannerBG>
        <Innards
          statusText="Voting is Closed. "
          ctaText="Stay tuned for the next round."
          ctaButton={
            <Button
              component={Link}
              to="create-project"
              size={isMobile ? 'xs' : 'sm'}
            >
              See Results
            </Button>
          }
          infoBtn={
            <Button
              component="a"
              href="https://rules.grantships.fun/how-to-play/as-a-dao-mem.html"
              variant="transparent"
              rel="noopener noreferrer"
              target="_blank"
            >
              More info.
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
          <Text fz={fz} fw={400} c="white">
            {ctaText}
          </Text>
        </>
      ) : (
        <Group>
          <Text fz={fz} fw={700} c="white">
            {statusText}
          </Text>
          <Text fz={fz} fw={400} c="white">
            {ctaText}
          </Text>
        </Group>
      )}
      <Group mt={isMobile ? 8 : 'md'} gap={isMobile ? 4 : 'md'}>
        {ctaButton}
        {infoBtn}
      </Group>
    </>
  );
};

const VoteCountdown = () => {
  const { contest } = useVoting();
  const [timeLeft, setTimeLeft] = useState<string | null>(null);
  const isMobile = useMobile();

  useEffect(() => {
    const postTime = (futureDate: Date, onComplete: () => void) => {
      const now = new Date().getTime();

      const distance = futureDate.getTime() - now;

      if (distance < 0) {
        onComplete();
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    };

    if (contest?.endTime) {
      const futureDate = new Date(contest.endTime * 1000);

      postTime(futureDate, () => setTimeLeft(null));

      const interval = setInterval(() => {
        postTime(futureDate, () => setTimeLeft(null));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [contest]);
  return (
    <Innards
      statusText="Voting is live! "
      ctaText={timeLeft ? `Vote Ends in ${timeLeft}` : ''}
      ctaButton={
        <Button component={Link} to="/vote" size={isMobile ? 'xs' : 'sm'}>
          Vote Now
        </Button>
      }
      infoBtn={
        <Button
          component="a"
          href="https://rules.grantships.fun/how-to-play/as-a-dao-mem.html"
          variant="transparent"
          rel="noopener noreferrer"
          target="_blank"
        >
          What am I voting on?
        </Button>
      }
    />
  );
};
