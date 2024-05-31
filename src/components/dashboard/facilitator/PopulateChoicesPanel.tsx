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

export const PopulateChoicesPanel = ({
  ships,
}: {
  ships: CompressedApprovedShip[];
}) => {
  const shipIds = ships.map((ship) => ship.id);
  const theme = useMantineTheme();

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
  const amountApproved = 0;
  const allAreApproved = amountApproved === ships.length;

  // have ships submitted PRs?

  // no? display awaiting PR UI

  // have all ship PRs been approved?

  // no? display awaiting approval UI

  // Has the contest entered into the voting phase?

  // no? display the finalize choices UI

  // yes? display the completed choices UI

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
        <Text size="xs">
          You can approve ships by navigating to the{' '}
          <Link to="/vote">vote</Link> page and selecting 'Approve' while logged
          in as a game facilitator
        </Text>
      </Box>
      <Text mb="md">Ships</Text>
      <Box mb="lg">
        {ships.map((ship, index) => {
          const shipReport = shipReports[index];
          return (
            <ShipIndicator
              key={ship.id}
              ship={ship}
              hasShipReport={!!shipReport}
              hasBeenApproved={false}
            />
          );
        })}
      </Box>
      <Button size="md" w="100%" disabled={!allAreApproved || !allHaveReports}>
        Finalize Choices
      </Button>
    </Box>
  );
};

const ShipIndicator = ({
  ship,
  hasBeenApproved,
  hasShipReport,
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
