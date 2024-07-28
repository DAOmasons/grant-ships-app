import React, { useMemo } from 'react';
import { useUserData } from '../../hooks/useUserState';
import {
  Avatar,
  Box,
  Button,
  Modal,
  ScrollArea,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { useAccount, useConnect } from 'wagmi';
import { useDisclosure } from '@mantine/hooks';
import { Link, useNavigate } from 'react-router-dom';
import { _grantId } from '../../utils/id';
import { IconAward } from '@tabler/icons-react';

export const ApplyButton = ({ shipSrcAddress }: { shipSrcAddress: string }) => {
  const { userData, userLoading } = useUserData();
  const [opened, { close, open }] = useDisclosure();
  const { isConnected } = useAccount();
  const theme = useMantineTheme();
  const { connectors, connect } = useConnect();
  const navigate = useNavigate();

  const modalContent = useMemo(() => {
    if (!isConnected) {
      return (
        <Stack>
          {[...connectors]?.reverse()?.map((connector) => (
            <Button
              key={connector.uid}
              onClick={() => {
                close();
                connect({ connector });
              }}
            >
              {connector.name}
            </Button>
          ))}
        </Stack>
      );
    }
    if (userData && userData?.projects?.length === 0) {
      return (
        <Stack h={350} p="lg">
          <Text ta="center" fw={600} fz="lg" mb="xs">
            Build your project
          </Text>
          <Text ta="center" fz="sm">
            You need to create a project profile before applying for funding
          </Text>
          <IconAward
            size={100}
            style={{ margin: 'auto' }}
            color={theme.colors.blue[6]}
          />
          <Button
            mt="auto"
            onClick={(e) => {
              e.stopPropagation();
              navigate('/create-project');
            }}
          >
            Create Project
          </Button>
        </Stack>
      );
    }
    if (userData && userData?.projects?.length > 1) {
      return (
        <Stack h={350} p="lg">
          <Text ta="center" fw={600} fz="lg">
            Select a project
          </Text>
          <ScrollArea>
            {userData.projects.map((project) => (
              <Button
                w="100%"
                my={'sm'}
                key={project.id}
                variant="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(
                    `/grant/${_grantId({ projectId: project.id, shipSrc: shipSrcAddress })}/timeline`
                  );
                }}
              >
                <Text>{project.name}</Text>
              </Button>
            ))}
          </ScrollArea>
        </Stack>
      );
    }
  }, [userData, isConnected]);

  if (userData?.projects?.length === 1) {
    return (
      <Button
        onClick={(e) => {
          e.stopPropagation();
          navigate(
            `/grant/${_grantId({ projectId: userData.projects[0].id, shipSrc: shipSrcAddress })}/timeline`
          );
        }}
      >
        Apply for Funding
      </Button>
    );
  }

  return (
    <>
      <Button
        disabled={userLoading}
        onClick={(e) => {
          e.stopPropagation();
          open();
        }}
      >
        Apply For Funding
      </Button>
      <Modal.Root opened={opened} onClose={close} centered>
        <Modal.Overlay />
        <Modal.Content bg={theme.colors.dark[6]}>
          <Modal.Body>{modalContent}</Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
};
