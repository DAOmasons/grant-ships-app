import { Alert, Avatar, Box, Button, Group, Stack, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { getGatewayUrl } from '../../../utils/ipfs/get';
import { SHIP_AMOUNT } from '../../../constants/gameSetup';
import { FacShipData } from '../../../queries/getFacDashShipData';

export const ShipApplicationPanel = ({
  shipData,
}: {
  shipData: FacShipData;
}) => {
  return (
    <Box>
      <Text fz="sm" mb="md">
        This Game Requires {SHIP_AMOUNT} approved ships before allocating
      </Text>
      {shipData.approvedShips.length ? (
        <Stack>
          {shipData.approvedShips.map((ship, index) => (
            <Button
              variant="subtle"
              key={ship.id}
              size="sm"
              component={Link}
              to={`/ship/${ship.id}`}
              style={{ display: 'flex', justifyItems: 'center' }}
              leftSection={
                <Group gap={'xs'}>
                  <Text>{index + 1}</Text>
                  <Avatar
                    size={32}
                    src={
                      ship.profileMetadata.avatarHash_IPFS &&
                      getGatewayUrl(ship.profileMetadata.avatarHash_IPFS)
                    }
                  />
                </Group>
              }
            >
              <Text fz="sm">{ship.name}</Text>
            </Button>
          ))}
        </Stack>
      ) : (
        <Alert w={350}>
          <Text size="md" mb="sm">
            No ships approved yet
          </Text>
          <Text size="sm" opacity={0.7}>
            This game requires {SHIP_AMOUNT} ships to play. The next step will
            be complete once you approve three Grant Ship applications
          </Text>
        </Alert>
      )}
    </Box>
  );
};
