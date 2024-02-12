import { Avatar, Group, Text } from '@mantine/core';
import React from 'react';
import { Address } from 'viem';
import { useEnsAvatar, useEnsName } from 'wagmi';
import { ensConfig } from '../utils/config';
import { mainnet } from 'viem/chains';
import { normalize } from 'path';

export const AddressAvatar = ({ address }: { address: Address }) => {
  const { data: ensName } = useEnsName({
    address,
    config: ensConfig,
    chainId: mainnet.id,
  });

  const { data: ensAvatar } = useEnsAvatar({
    name: ensName ? normalize(ensName) : undefined,
    config: ensConfig,
    chainId: mainnet.id,
  });

  const name = ensName || address.slice(0, 6) + '...' + address.slice(-4);
  const imgUrl = ensAvatar || `https://effigy.im/a/${address}.svg`;

  return (
    <Group>
      <Avatar src={imgUrl} size={28} />
      <Text fz="sm">{name}</Text>
    </Group>
  );
};
