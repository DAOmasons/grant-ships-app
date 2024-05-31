import { CompressedApprovedShip } from '../../../queries/getFacDashShipData';
import { useQuery } from '@tanstack/react-query';
import { getAllShipReports } from '../../../queries/getRecordsByTag';
import { useVoting } from '../../../hooks/useVoting';
import {
  Avatar,
  Box,
  Button,
  Group,
  Text,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { PINATA_GATEWAY } from '../../../utils/ipfs/get';
import { IconInfoCircle, IconSquareCheck } from '@tabler/icons-react';
import { IconSquare } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { notifications } from '@mantine/notifications';
import HatsAllowList from '../../../abi/HatsAllowList.json';
import { ADDR } from '../../../constants/addresses';
import { useTx } from '../../../hooks/useTx';
import { Address } from 'viem';
import { TxButton } from '../../TxButton';

export const PopulateChoicesPanel = ({
  ships,
}: {
  ships: CompressedApprovedShip[];
}) => {
  const shipIds = ships.map((ship) => ship.id);
  const theme = useMantineTheme();
  const { tx } = useTx();

  const {
    data: shipReports,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['fac-ship-reports', shipIds],
    queryFn: () => getAllShipReports(shipIds),
    enabled: !!shipIds,
  });

  const { votingExists } = useVoting();

  const { contest, refetchGsVotes } = useVoting();

  const shipChoiceIds = useMemo(() => {
    if (!ships?.length || !contest?.choices?.length) {
      return {};
    }

    let ids: Record<string, boolean> = {};

    for (const ship of ships) {
      const shipId = contest?.choices.find(
        (choice) => choice.shipId === ship.id
      )?.shipId;

      if (shipId) {
        ids = { ...ids, [shipId]: true };
      }
    }

    return ids;
  }, [contest?.choices, ships]);

  console.log('shipChoiceIds', shipChoiceIds);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading ship reports</div>;
  }

  if (!votingExists) {
    // no? return the create game panel
    return <div>Voting does not exist</div>;
  }

  if (!shipReports) {
    return <div>No ship reports</div>;
  }
  const completedReports = shipReports.filter(Boolean);
  const allHaveReports = completedReports.length === ships.length;
  const amountApproved = Object.keys(shipChoiceIds).length;
  const allAreApproved = amountApproved === ships.length;

  const handleFinalizeChoices = () => {
    if (!allAreApproved || !allHaveReports) {
      notifications.show({
        title: 'Error',
        message:
          'All ships must have approved reports before finalizing choices',
        color: 'red',
      });
      return;
    }

    const choicesAddress = contest?.contest?.choicesModule_id;

    if (!choicesAddress) {
      notifications.show({
        title: 'Error',
        message: 'Choices address not found',
        color: 'red',
      });
      return;
    }

    tx({
      viewParams: {
        awaitEnvioPoll: true,
      },
      writeContractParams: {
        abi: HatsAllowList,
        address: choicesAddress as Address,
        functionName: 'finalizeChoices',
        args: [],
      },
      writeContractOptions: {
        onPollSuccess() {
          refetchGsVotes();
        },
      },
    });
  };

  return (
    <Box>
      <Text fz="md" mb="md">
        Requires {ships.length} approved portfolio reports before vote starts
      </Text>
      <Box mb="xl">
        <Group mb="sm">
          {allHaveReports ? (
            <IconSquareCheck size={16} color={theme.colors.teal[5]} />
          ) : (
            <IconSquare size={16} />
          )}
          <Text fz="sm">
            <Text fw={600} component="span" fz="sm">
              Reports:
            </Text>{' '}
            {completedReports.length}/{ships.length} submitted
          </Text>
        </Group>
        <Group mb="md">
          {allAreApproved ? (
            <IconSquareCheck size={16} color={theme.colors.teal[5]} />
          ) : (
            <IconSquare size={16} />
          )}
          <Text fz="sm">
            <Text fw={600} component="span" fz="sm">
              Reports:
            </Text>{' '}
            {amountApproved}/{ships.length} approved
          </Text>
        </Group>
        <Text size="sm">
          You can approve ships by navigating to the{' '}
          <Link to="/vote">vote</Link> page and selecting 'Approve' while logged
          in as a game facilitator
        </Text>
      </Box>
      <Text mb="md">Ships</Text>
      <Box mb="lg">
        {ships.map((ship, index) => {
          const shipReport = shipReports[index];
          const hasBeenApproved = !!shipChoiceIds[ship.id as string];
          return (
            <ShipIndicator
              key={ship.id}
              ship={ship}
              hasShipReport={!!shipReport}
              hasBeenApproved={hasBeenApproved}
            />
          );
        })}
      </Box>
      <TxButton
        size="md"
        w="100%"
        disabled={!allAreApproved || !allHaveReports}
        onClick={handleFinalizeChoices}
      >
        Finalize Choices
      </TxButton>
    </Box>
  );
};

const ShipIndicator = ({
  ship,
  hasShipReport,
  hasBeenApproved,
}: {
  ship: CompressedApprovedShip;
  hasShipReport: boolean;
  hasBeenApproved: boolean;
}) => {
  const theme = useMantineTheme();

  const imgUrl = `${PINATA_GATEWAY}/${ship.profileMetadata.avatarHash_IPFS}`;

  return (
    <Group key={ship.id} mb="sm">
      {hasBeenApproved ? (
        <IconSquareCheck size={16} color={theme.colors.teal[5]} />
      ) : (
        <IconSquare size={16} />
      )}
      <Group opacity={hasShipReport ? 1 : 0.5}>
        <Avatar size={30} src={imgUrl} />
        <Text fz={'sm'}>{ship.name}</Text>
      </Group>
      {!hasShipReport && (
        <Tooltip label={'This ship has not submitted a report yet'}>
          <IconInfoCircle
            size={18}
            color={theme.colors.yellow[6]}
            style={{ marginLeft: 'auto' }}
          />
        </Tooltip>
      )}
    </Group>
  );
};
