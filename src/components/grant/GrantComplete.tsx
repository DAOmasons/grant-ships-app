import {
  Box,
  Button,
  Divider,
  Flex,
  Group,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { IconHandClick } from '@tabler/icons-react';
import React from 'react';
import { useTx } from '../../hooks/useTx';
import ShipAbi from '../../abi/GrantShip.json';
import { useGrant } from '../../hooks/useGrant';
import { notifications } from '@mantine/notifications';
import { Address } from 'viem';
import Complete from '../../assets/Complete.svg?react';
import { useUserData } from '../../hooks/useUserState';

export const GrantComplete = () => {
  const theme = useMantineTheme();

  const { tx } = useTx();
  const {
    ship,
    project,
    refetchGrant,
    grant,
    isLoadingGrant,
    isProjectMember,
    isShipOperator,
  } = useGrant();
  const { userData } = useUserData();
  const [isLoading, setIsLoading] = React.useState(false);

  const isCompleted = grant?.grantCompleted;

  const handleCompleteGrant = async () => {
    setIsLoading(true);
    if (!ship || !project) {
      notifications.show({
        title: 'Error',
        message: 'Ship or Project not found',
        color: 'red',
      });
      setIsLoading(false);
      return;
    }

    tx({
      writeContractParams: {
        abi: ShipAbi,
        functionName: 'completeGrant',
        address: ship?.shipContractAddress as Address,
        args: [project?.id, [1n, 'NULL']],
      },
      writeContractOptions: {
        onPollSuccess() {
          refetchGrant();
        },
        onPollError() {
          setIsLoading(false);
        },
      },
    });
  };

  if (
    !isProjectMember &&
    !isShipOperator &&
    !userData?.isFacilitator &&
    !isCompleted
  ) {
    return <></>;
  }

  if (isLoadingGrant) {
    return <></>;
  }

  return (
    <>
      {isCompleted ? (
        <>
          <Flex justify="center" align="center" direction="column" mb="lg">
            <Box mb="md">
              <Complete height={90} width={90} />
            </Box>
            <Text>Congratulations! The grant is complete.</Text>
          </Flex>
          <Divider mb="lg" />
        </>
      ) : (
        <Flex
          justify="center"
          align="center"
          py="lg"
          mb="lg"
          style={{
            border: `1px solid ${theme.colors.blue[6]}`,
            borderRadius: '8px',
          }}
          direction="column"
        >
          <Group gap={'sm'} mb="md">
            <Button
              size="md"
              disabled={isLoading}
              variant="priority"
              onClick={handleCompleteGrant}
            >
              Complete
            </Button>
            <IconHandClick />
          </Group>
          <Text fz="sm">
            Complete your grant. Click the the button to finalize
          </Text>
        </Flex>
      )}
    </>
  );
};
