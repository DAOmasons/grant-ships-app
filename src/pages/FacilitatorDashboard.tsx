import {
  Alert,
  Avatar,
  Box,
  Button,
  Flex,
  Group,
  Modal,
  Paper,
  Skeleton,
  Stack,
  Tabs,
  Text,
  Textarea,
  useMantineTheme,
} from '@mantine/core';
import { MainSection, PageTitle } from '../layout/Sections';

import { useQuery } from '@tanstack/react-query';
import { getFacDashShipData } from '../queries/getFacDashShipData';
import { FacilitatorShipDash } from '../components/dashboard/facilitator/FacilitatorShipDash';
import { FacilitatorGameDash } from '../components/dashboard/facilitator/FacilitatorGameDash';
import { AppAlert } from '../components/UnderContruction';
import { useGameManager } from '../hooks/useGameMangers';
import GameManagerAbi from '../abi/GameManager.json';
import { useMemo, useState } from 'react';
import { GAME_TOKEN, SHIP_AMOUNT } from '../constants/gameSetup';
import { useReadContract } from 'wagmi';
import { arbitrumSepolia } from 'viem/chains';
import { ADDR } from '../constants/addresses';
import { AlloStatus, GameStatus, GrantStatus } from '../types/common';
import { getFacilitatorGrants } from '../queries/getFacilitatorGrants';
import { DashGrant } from '../resolvers/grantResolvers';
import { secondsToLongDateTime, secondsToRelativeTime } from '../utils/time';
import AlloAbi from '../abi/Allo.json';
import { Link } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { ReviewPage } from '../layout/ReviewPage';
import { encodeAbiParameters, formatEther, parseAbiParameters } from 'viem';
import { useTx } from '../hooks/useTx';
import { pinJSONToIPFS } from '../utils/ipfs/pin';
import { notifications } from '@mantine/notifications';
import { TxButton } from '../components/TxButton';

export const FacilitatorDashboard = () => {
  const { data: shipData, isLoading: shipsLoading } = useQuery({
    queryKey: ['facShipData'],
    queryFn: getFacDashShipData,
  });

  const { gm, isLoadingGm } = useGameManager();

  const { data: poolBalance, isLoading: poolLoading } = useReadContract({
    abi: GameManagerAbi,
    chainId: arbitrumSepolia.id,
    functionName: 'getPoolAmount',
    address: ADDR.GAME_MANAGER,
  });

  const gameOperationStage = useMemo(() => {
    if (!gm || !shipData || typeof poolBalance !== 'bigint') {
      return undefined;
    }

    // Create Round Ready
    // if there is no game round, or game status === 0, then the game is not started
    if (!gm.currentRound) {
      return 0;
    }

    if (
      gm.currentRound.gameStatus === GameStatus.Pending &&
      poolBalance < BigInt(gm.currentRound?.totalRoundAmount)
    ) {
      return 1;
    }
    // Application Phase Ready
    // if there is is not enough ships, then we are in the application stage, stage === 1
    if (
      gm.currentRound.gameStatus === GameStatus.Pending &&
      shipData.approvedShips.length < SHIP_AMOUNT
    ) {
      return 2;
    }

    // Allocation Ready
    // if there are enough ships, then we are in the game, stage === 2
    if (
      gm.currentRound.gameStatus === GameStatus.Pending &&
      shipData.approvedShips.length >= SHIP_AMOUNT
    ) {
      return 3;
    }

    // Distribution Ready
    // if the gameStatus is 4, then we are in the distribution, stage === 3
    if (gm.currentRound.gameStatus === GameStatus.Allocated) {
      return 4;
    }

    // Start Game Ready
    // if the gameStatus is 5, then we are in the funded stage and are ready to start the game, stage === 4
    if (gm.currentRound.gameStatus === GameStatus.Funded) {
      return 5;
    }

    // Stop Game Ready
    // if the gameStatus is 6, then we are in the the we in the active stage, and can stop the game, stage === 5
    if (gm.currentRound.gameStatus === GameStatus.Active) {
      return 6;
    }

    // Game Complete Ready
    // If the gameStatus is 7, then the game is complete and and we can reset the game, stage === 6
    if (gm.currentRound.gameStatus === GameStatus.Completed) {
      return 7;
    }
  }, [shipData, gm, poolBalance]);

  return (
    <MainSection>
      <PageTitle title="Facilitator Dashboard" />
      <Tabs defaultValue="ships">
        <Tabs.List mb="xl" grow>
          <Tabs.Tab value="game-manager">Game</Tabs.Tab>
          <Tabs.Tab value="ships">Ships</Tabs.Tab>
          <Tabs.Tab value="projects">Approvals</Tabs.Tab>
          <Tabs.Tab value="hats">Post</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="ships">
          <FacilitatorShipDash
            shipData={shipData}
            isLoading={shipsLoading || isLoadingGm}
          />
        </Tabs.Panel>
        <Tabs.Panel value="game-manager">
          <FacilitatorGameDash
            gm={gm}
            gameStatusNumber={gameOperationStage}
            isLoading={shipsLoading || isLoadingGm || poolLoading}
            poolBalance={poolBalance as bigint | undefined}
            shipData={shipData}
          />
        </Tabs.Panel>
        <Tabs.Panel value="projects">
          <ProjectApproval />
        </Tabs.Panel>
        <Tabs.Panel value="hats">
          <AppAlert
            title="This Feature is under construction."
            description="Check back soon to try it out!"
          />
        </Tabs.Panel>
      </Tabs>
    </MainSection>
  );
};

const ProjectApproval = () => {
  const {
    data: grants,
    error: grantsError,
    isLoading: grantsLoading,
  } = useQuery({
    queryKey: ['fac-grants'],
    queryFn: getFacilitatorGrants,
  });

  const theme = useMantineTheme();

  if (grantsLoading)
    return (
      <Stack gap={'lg'}>
        <Skeleton w={'100%'} h={228} />
        <Skeleton w={'100%'} h={228} />
        <Skeleton w={'100%'} h={228} />
        <Skeleton w={'100%'} h={228} />
      </Stack>
    );

  if (grantsError)
    return (
      <AppAlert
        title="Error"
        color={theme.colors.pink[6]}
        description={grantsError.message || 'Error loading grants data'}
      />
    );

  if (!grants)
    return (
      <AppAlert
        title="Error"
        color={theme.colors.pink[6]}
        description={'Erro loading grants data'}
      />
    );

  if (grants.length === 0)
    return (
      <AppAlert
        title={'No Grants'}
        description={'Grants have not been submitted to Grant Ships yet'}
      />
    );

  return (
    <Stack gap={'lg'}>
      {grants.map((grant) => (
        <GrantApprovalCard key={grant.id} grant={grant} />
      ))}
    </Stack>
  );
};

const GrantApprovalCard = ({ grant }: { grant: DashGrant }) => {
  const theme = useMantineTheme();
  return (
    <Paper bg={theme.colors.dark[6]} mih={100} w="100%" p="lg">
      <Flex>
        <Group align="start">
          <Avatar
            size={66}
            component={Link}
            to={`/project/${grant.projectId.id}`}
            src={grant.projectMetadata.imgUrl}
          />
          <Box>
            <Text
              fw={600}
              component={Link}
              to={`/project/${grant.projectId.id}`}
            >
              {grant.projectId.name}
            </Text>
            <Text fz="xs">
              {' '}
              Approved by:{' '}
              <Link
                to={`/ship/${grant.shipId.id}`}
                style={{ color: theme.colors.dark[0] }}
              >
                {grant.shipId.name}
              </Link>
            </Text>
            <Text fz="xs">
              Last Updated: {secondsToRelativeTime(grant.lastUpdated)}
            </Text>
          </Box>
        </Group>
        <FacilitatorReview grant={grant} />
      </Flex>
    </Paper>
  );
};

const FacilitatorReview = ({ grant }: { grant: DashGrant }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { tx } = useTx();
  const [reasonText, setReasonText] = useState('');

  const handleApprove = async (isApproved: boolean) => {
    if (grant.grantStatus !== GrantStatus.ShipApproved) {
      return;
    }

    const poolId = grant.shipId.poolId;
    const grantAmount = grant.applicationData.grantAmount;

    if (
      isApproved === undefined ||
      !reasonText ||
      !poolId ||
      !grant.shipId.id ||
      !grantAmount
    ) {
      console.error(
        `Invalid Data for review ${isApproved} ${reasonText} ${poolId} ${isApproved} ${grantAmount}`
      );
      notifications.show({
        title: 'Error',
        message: 'Invalid Data for review',
        color: 'red',
      });

      return;
    }

    close();

    const pinRes = await pinJSONToIPFS({
      reason: reasonText,
      reviewer: grant.shipId.id,
    });

    if (typeof pinRes.IpfsHash !== 'string' && pinRes.IpfsHash[0] !== 'Q') {
      notifications.show({
        title: 'IPFS Upload Error',
        message: pinRes.IpfsHash[1],
        color: 'red',
      });
      return;
    }

    // (address recipientId, Status recipientStatus, uint256 grantAmount, Metadata memory _reason)

    const encoded = encodeAbiParameters(
      parseAbiParameters('address, uint8, uint256, (uint256, string)'),
      [
        grant.projectId.id,
        isApproved ? AlloStatus.Accepted : AlloStatus.Rejected,
        grantAmount,
        [1n, pinRes.IpfsHash],
      ]
    );

    tx({
      writeContractParams: {
        address: ADDR.ALLO,
        abi: AlloAbi,
        functionName: 'allocate',
        args: [poolId, encoded],
      },
    });
  };

  return (
    <>
      <Button size="xs" ml="auto" onClick={open}>
        Review
      </Button>
      <Modal
        opened={opened}
        onClose={close}
        fullScreen
        transitionProps={{ transition: 'fade', duration: 200 }}
      >
        <ReviewPage
          title={`Application from ${grant.projectId.name}`}
          sections={[
            {
              subtitle: 'Project Description',
              content: grant.projectMetadata.description,
            },
            'DIVIDER',
            {
              subtitle: 'The Ask',
              content: `${formatEther(grant.applicationData.grantAmount)} ${GAME_TOKEN.SYMBOL}`,
            },
            {
              subtitle: 'Expected Delivery',
              content: secondsToLongDateTime(
                Number(grant.applicationData.dueDate)
              ),
            },
            {
              subtitle: 'Receiving Address',
              content: grant.applicationData.receivingAddress,
            },
            {
              subtitle: 'Proposal Link',
              content: grant.applicationData.proposalLink,
            },
            {
              subtitle: 'Objectives',
              content: grant.applicationData.objectives,
            },
            grant.applicationData.extraInfo
              ? {
                  subtitle: 'Additional Information',
                  content: grant.applicationData.extraInfo,
                }
              : null,
            grant.applicationData.extraLink
              ? {
                  subtitle: 'Additional Link',
                  content: (
                    <Text component="a">grant.applicationData.extraLink </Text>
                  ),
                }
              : null,
          ]}
          footerSection={
            <>
              {grant.shipApprovalReason && (
                <Alert mb="xl">
                  <Text mb="sm">Approval from Grant Ship</Text>
                  <Text fz="sm" opacity={0.75} fs={'italic'}>
                    "{grant.shipApprovalReason}"
                  </Text>
                </Alert>
              )}
              {grant.grantStatus === GrantStatus.ShipApproved && (
                <>
                  <Text mb="md" fw={600}>
                    Approve or Reject Applicant
                  </Text>
                  <Textarea
                    label="Reasoning"
                    description="Why are you approving or rejecting this application?"
                    value={reasonText}
                    onChange={(e) => setReasonText(e.currentTarget.value)}
                    autosize
                    required
                    minRows={4}
                    maxRows={8}
                    mb="xl"
                  />
                  <Flex justify="space-between">
                    <TxButton
                      variant="outline"
                      disabled={!reasonText}
                      onClick={() => handleApprove(false)}
                    >
                      Reject
                    </TxButton>
                    <TxButton
                      disabled={!reasonText}
                      onClick={() => handleApprove(true)}
                    >
                      Approve
                    </TxButton>
                  </Flex>
                </>
              )}
            </>
          }
        />
      </Modal>
    </>
  );
};
