import { Modal, Stack, Text } from '@mantine/core';
import { FacShipData } from '../../../queries/getFacDashShipData';
import { ShipDashCard, ShipDashCardSkeleton } from './ShipDashCard';
import { GameStatus } from '../../../types/common';
import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { ApplicationReview } from './ApplicationReview';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { decodeAbiParameters, parseAbiParameters } from 'viem';
import { getGatewayUrl, getIpfsJson } from '../../../utils/ipfs/get';
import GameManagerAbi from '../../../abi/GameManager.json';
import { ShipApplicationMetadata } from '../../../utils/ipfs/metadataValidation';
import { HATS } from '../../../constants/gameSetup';
import { ADDR } from '../../../constants/addresses';
import { pinJSONToIPFS } from '../../../utils/ipfs/pin';
import { useTx } from '../../../hooks/useTx';
import { useQueryClient } from '@tanstack/react-query';
import { GameManager } from '../../../.graphclient';
import { AppAlert } from '../../UnderContruction';

export type ShipReviewData = {
  id: string;
  name: string;
  impactThesis: string;
  submissionGuidelines: string;
  fee: string;
  extraLink: string;
  additionalInfo: string;
};

export const FacilitatorShipDash = ({
  shipData,
  isLoading,
  gm,
}: {
  gm?: GameManager;
  shipData?: FacShipData;
  isLoading: boolean;
}) => {
  const queryClient = useQueryClient();
  const [opened, { open, close }] = useDisclosure(false);
  const { tx } = useTx();

  const [shipReviewData, setShipReviewData] = useState<ShipReviewData | null>(
    null
  );

  const hasCurrentRound = gm?.currentRound !== null;

  const handleReviewApplicant = async (
    id: string,
    // this setter breaks one-way data flow
    // TODO: refactor User flow to separate page later on
    buttonLoading: Dispatch<SetStateAction<boolean>>
  ) => {
    buttonLoading(true);

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
      ship.shipApplicationBytesData
    );

    if (!decodedApplicationData) {
      notifications.show({
        title: 'Encoding Error',
        message: 'Could not decode Ship Application Data',
        color: 'red',
        icon: null,
      });
      return;
    }

    const CID = decodedApplicationData[2][1];

    const applicationData = await getIpfsJson(CID);

    if (!applicationData) {
      notifications.show({
        title: 'IPFS Error',
        message: 'Could not find application data',
        color: 'red',
        icon: null,
      });
      return;
    }

    const validatedApplicationData =
      ShipApplicationMetadata.safeParse(applicationData);

    if (!validatedApplicationData.success) {
      notifications.show({
        title: 'Validation Error',
        message: 'Invalid application data',
        color: 'red',
        icon: null,
      });
      return;
    }

    setShipReviewData({
      id: ship.id,
      name: ship.name,
      impactThesis: applicationData.thesis,
      submissionGuidelines: applicationData.guidelines,
      fee: applicationData.fee,
      extraLink: applicationData.extraLink,
      additionalInfo: applicationData.extraInfo,
    });
    buttonLoading(false);
    open();
  };

  const handleApprove = async (
    isApproved: boolean,
    reason: string,
    hatId: string
  ) => {
    close();

    if (!shipReviewData) {
      notifications.show({
        title: 'Error',
        message: 'Could not find necessary data to complete the transaction',
        color: 'red',
        icon: null,
      });
      return;
    }

    const allShips = [
      ...shipData!.approvedShips,
      ...shipData!.shipApplicants,
      ...shipData!.rejectedShips,
    ];

    const ship = allShips.find((ship) => ship.id === shipReviewData.id);

    if (!ship) {
      notifications.show({
        title: 'Error',
        message: 'Could not find ship',
        color: 'red',
        icon: null,
      });
      return;
    }

    const pinRes = await pinJSONToIPFS({
      reason,
    });

    if (typeof pinRes.IpfsHash !== 'string' && pinRes.IpfsHash[0] !== 'Q') {
      notifications.show({
        title: 'IPFS Upload Error',
        message: pinRes.IpfsHash[1],
        color: 'red',
      });
      return;
    }

    if ((isApproved && hatId === '') || (isApproved && hatId.length !== 70)) {
      notifications.show({
        title: 'Error',
        message: 'A valid Operator Hat ID is required for approval',
        color: 'red',
        icon: null,
      });
      return;
    }

    const shipInitData = {
      registryGating: true,
      metadataRequired: true,
      grantAmountRequired: true,
      shipName: ship.name,
      shipMetadata: {
        protocol: 1n,
        pointer: ship.profilePointer,
      },
      recipientId: ship.id,
      operatorHatId: hatId,
      facilitatorHatId: HATS.FACILITATOR,
    };

    tx({
      writeContractParams: {
        abi: GameManagerAbi,
        address: ADDR.GAME_MANAGER,
        functionName: 'reviewRecipient',
        args: [
          shipReviewData.id,
          isApproved ? GameStatus.Accepted : GameStatus.Rejected,
          shipInitData,
          ADDR.GS_FACTORY,
          { protocol: 1n, pointer: pinRes.IpfsHash },
        ],
      },
      onComplete() {
        queryClient.invalidateQueries({ queryKey: ['fac-ship-data'] });
      },
    });
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
      {!hasCurrentRound && (
        <AppAlert
          title="Cannot review until Game Round is created"
          description="Cannot approve or reject a Grant Ship Application until a game round is created "
        />
      )}
      <PageLayout
        top={
          <>
            <Text fw={500}>
              Open Applications ({shipData.shipApplicants.length})
            </Text>
            {shipData.shipApplicants.map((ship) => (
              <ShipDashCard
                hasCurrentRound={hasCurrentRound}
                key={ship.id}
                id={ship.id}
                name={ship.name}
                avatarUrl={getGatewayUrl(ship.profileMetadata.avatarHash_IPFS)}
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
                avatarUrl={getGatewayUrl(ship.profileMetadata.avatarHash_IPFS)}
                shipStatus={GameStatus.Accepted}
                onReview={handleReviewApplicant}
              />
            ))}
          </>
        }
        bottom={
          <>
            <Text fw={500}>
              Rejected Applications ({shipData.rejectedShips.length})
            </Text>
            {shipData.rejectedShips.map((ship) => (
              <ShipDashCard
                key={ship.id}
                id={ship.id}
                name={ship.name}
                avatarUrl={getGatewayUrl(ship.profileMetadata.avatarHash_IPFS)}
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
        <ApplicationReview
          shipReviewData={shipReviewData}
          handleApprove={handleApprove}
          hasCurrentRound={hasCurrentRound}
        />
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
    <Stack gap="xl" w="100%">
      <Stack>{top}</Stack>
      <Stack>{middle}</Stack>
      <Stack>{bottom}</Stack>
    </Stack>
  );
};
