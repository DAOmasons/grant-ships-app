import { Modal, Stack, Text } from '@mantine/core';
import { FacShipData } from '../../../queries/getFacDashShipData';
import { ShipDashCard, ShipDashCardSkeleton } from './ShipDashCard';
import { GameStatus } from '../../../types/common';
import { ReactNode } from 'react';
import { ApplicationReview } from './ApplicationReview';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { decodeAbiParameters, parseAbiParameters } from 'viem';
import { getIpfsJson } from '../../../utils/ipfs/get';

export const FacilitatorShipDash = ({
  shipData,
  isLoading,
}: {
  shipData?: FacShipData;
  isLoading: boolean;
}) => {
  const [opened, { open, close }] = useDisclosure(false);

  const handleReviewApplicant = async (id: string) => {
    open();

    if (!shipData) {
      notifications.show({
        title: 'Error',
        message: 'Could not find ship data',
        color: 'red',
        icon: null,
      });
      return;
    }

    const allShips = [
      ...shipData.approvedShips,
      ...shipData.shipApplicants,
      ...shipData.rejectedShips,
    ];

    const ship = allShips.find((ship) => ship.id === id);

    if (!ship) {
      notifications.show({
        title: 'Error',
        message: 'Could not find ship',
        color: 'red',
        icon: null,
      });
      return;
    }

    const decodedApplicationData = decodeAbiParameters(
      parseAbiParameters('address, string, (uint256, string)'),
      '0x'
    );

    if (!decodedApplicationData) {
      notifications.show({
        title: 'Error',
        message: 'Could not decode Ship Application Data',
        color: 'red',
        icon: null,
      });
      return;
    }

    const CID = decodedApplicationData[2][1];

    const applicationData = await getIpfsJson(CID);

    console.log('applicationData', applicationData);
  };

  if (isLoading || !shipData) {
    return (
      <PageLayout
        top={
          <>
            <ShipDashCardSkeleton />
            <ShipDashCardSkeleton />
            <ShipDashCardSkeleton />
          </>
        }
        middle={
          <>
            <ShipDashCardSkeleton />
            <ShipDashCardSkeleton />
          </>
        }
        bottom={
          <>
            <ShipDashCardSkeleton />
            <ShipDashCardSkeleton />
          </>
        }
      />
    );
  }

  return (
    <>
      <PageLayout
        top={
          <>
            <Text fw={500}>
              Open Applications ({shipData.shipApplicants.length})
            </Text>
            {shipData.shipApplicants.map((ship) => (
              <ShipDashCard
                key={ship.id}
                id={ship.id}
                name={ship.name}
                avatarUrl={ship.profileMetadata.avatarHash_IPFS}
                shipStatus={GameStatus.Pending}
                onReview={handleReviewApplicant}
              />
            ))}
          </>
        }
        middle={
          <>
            <Text fw={500}>
              Accepted Applications ({shipData.approvedShips.length})
            </Text>
            {shipData.approvedShips.map((ship) => (
              <ShipDashCard
                key={ship.id}
                id={ship.id}
                name={ship.name}
                avatarUrl={ship.profileMetadata.avatarHash_IPFS}
                shipStatus={GameStatus.Accepted}
              />
            ))}
          </>
        }
        bottom={
          <>
            <Text fw={500}>
              Rejected Applications ({shipData.rejectedShips.length})
            </Text>
            {shipData.approvedShips.map((ship) => (
              <ShipDashCard
                key={ship.id}
                id={ship.id}
                name={ship.name}
                avatarUrl={ship.profileMetadata.avatarHash_IPFS}
                shipStatus={GameStatus.Accepted}
              />
            ))}
          </>
        }
      />
      <Modal
        opened={opened}
        onClose={close}
        fullScreen
        transitionProps={{ transition: 'fade', duration: 200 }}
      >
        <ApplicationReview />
      </Modal>
    </>
  );
};

const PageLayout = ({
  top,
  middle,
  bottom,
}: {
  top: ReactNode;
  middle: ReactNode;
  bottom: ReactNode;
}) => {
  return (
    <Stack gap="xl">
      <Stack>{top}</Stack>
      <Stack>{middle}</Stack>
      <Stack>{bottom}</Stack>
    </Stack>
  );
};
