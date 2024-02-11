import { Stack, Text } from '@mantine/core';
import { FacShipData } from '../../../queries/getFacDashShipData';
import { ShipDashCard, ShipDashCardSkeleton } from './ShipDashCard';
import { GameStatus } from '../../../types/common';
import { ReactNode } from 'react';

export const FacilitatorShipDash = ({
  shipData,
  isLoading,
}: {
  shipData?: FacShipData;
  isLoading: boolean;
}) => {
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
    <PageLayout
      top={
        <>
          <Text fw={500}>
            Open Applications ({shipData.shipApplicants.length})
          </Text>
          {shipData.shipApplicants.map((ship) => (
            <ShipDashCard
              key={ship.id}
              name={ship.name}
              avatarUrl={ship.profileMetadata.avatarHash_IPFS}
              shipStatus={GameStatus.Pending}
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
              name={ship.name}
              avatarUrl={ship.profileMetadata.avatarHash_IPFS}
              shipStatus={GameStatus.Accepted}
            />
          ))}
        </>
      }
    />
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
