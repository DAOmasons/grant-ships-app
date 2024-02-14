import { Avatar, Group, MantineSize, StyleProp, Text } from '@mantine/core';
import React from 'react';
import { Address } from 'viem';
import { useEnsAvatar, useEnsName } from 'wagmi';
import { ensConfig } from '../utils/config';
import { mainnet } from 'viem/chains';
import { normalize } from 'path';

export const AddressAvatar = ({
  address,
  size = 28,
  fz,
  displayText = true,
}: {
  address: Address;
  size?: MantineSize | number;
  fz?: StyleProp<number | MantineSize>;
  displayText?: boolean;
}) => {
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
      <Avatar src={imgUrl} size={size} />
      {displayText && <Text fz={fz}>{name}</Text>}
    </Group>
  );
};
