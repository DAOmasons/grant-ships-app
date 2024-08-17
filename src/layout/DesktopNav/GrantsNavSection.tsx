import {
  Avatar,
  AvatarGroup,
  Box,
  Divider,
  Flex,
  Group,
  Menu,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useAccount, useChainId } from 'wagmi';
import { useUserData } from '../../hooks/useUserState';
import { getAllUserGrants } from '../../queries/getProjectGrants';
import { GAME_MANAGER } from '../../constants/gameSetup';
import { Address } from 'viem';
import { Link, useLocation } from 'react-router-dom';
import classes from './DesktoNavStyles.module.css';
import { useState } from 'react';
import { IconChevronUp } from '@tabler/icons-react';

export const GrantsNavSection = () => {
  const { address } = useAccount();
  const theme = useMantineTheme();

  const {
    data: grants,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['user-project-grants', address, GAME_MANAGER.ADDRESS],
    queryFn: () => getAllUserGrants(address as Address, GAME_MANAGER.ADDRESS),
    enabled: !!address,
  });

  if (isLoading || error || !grants || grants.length === 0) return null;

  return (
    <Box>
      <Divider mt="md" mb="sm" />
      <Text fz="sm" mb={'md'} c={theme.colors.gray[6]}>
        Grants
      </Text>
      {grants?.map((grant) => (
        <NavGrantLink
          key={grant.id}
          grantId={grant.id}
          projectImgUrl={grant.project?.metadata?.imgUrl || ''}
          shipImgUrl={grant.ship?.profileMetadata?.imgUrl || ''}
          collabText={`${grant.project.name} <> ${grant.ship?.name}`}
        />
      ))}
    </Box>
  );
};

const NavGrantLink = ({
  projectImgUrl,
  shipImgUrl,
  collabText,
  grantId,
}: {
  projectImgUrl: string;
  shipImgUrl: string;
  collabText: string;
  grantId: string;
}) => {
  const location = useLocation();
  const isActive = location.pathname.includes(grantId);

  return (
    <Link
      to={`grant/${grantId}`}
      data-active={isActive ? grantId : undefined}
      className={classes.grantLink}
    >
      <Flex align="center" gap={8}>
        <AvatarGroup>
          <Avatar src={projectImgUrl} size={24} />
          <Avatar src={shipImgUrl} size={24} />
        </AvatarGroup>
        <Text
          fz="sm"
          style={{
            flexGrow: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {collabText}
        </Text>
      </Flex>
    </Link>
  );
};
