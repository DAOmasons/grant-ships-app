import {
  ActionIcon,
  Flex,
  Group,
  Mark,
  Paper,
  Text,
  Textarea,
  TextareaProps,
  useMantineTheme,
} from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import React, { useMemo, useState } from 'react';
import { isAddress } from 'viem';

import { scanAddressLink } from '../utils/scan';

export const AddressBox = (props: TextareaProps) => {
  const theme = useMantineTheme();
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const addrData = useMemo(() => {
    const addresses = value
      .split(',')
      .map((addr) => addr.trim())
      .filter(Boolean);

    return addresses;
  }, [value]);

  const nonValidAddresses = addrData.filter((addr) => !isAddress(addr));
  const errorMessage = nonValidAddresses.length
    ? `Has ${nonValidAddresses?.length} Invalid ${
        nonValidAddresses?.length === 1 ? 'Address' : 'Addresses'
      }`
    : props.error;

  const deleteAddress = (addr: string) => {
    const scrub1 = value.replace(addr, '');
    const scrub2 = scrub1.replace(',,', ',');
    const scrub3 = scrub2.replace(/(\r?\n\s*),/g, '');
    setValue(scrub3);
  };

  return (
    <>
      <Textarea
        {...props}
        onChange={handleChange}
        error={errorMessage}
        value={value}
        autosize
        spellCheck={false}
        minRows={4}
        maxRows={6}
      />
      <Flex w="100%" direction="column">
        {addrData.map((addr, index) => (
          <Paper
            bg={theme.colors.dark[6]}
            w="fit-content"
            key={addr + index}
            mb={'xs'}
            p={4}
          >
            <Group align="center">
              <Text
                component="a"
                href={scanAddressLink(addr)}
                rel="noopener noreferrer"
                target="_blank"
                size="xs"
                c={theme.colors.blue[4]}
                style={{ transform: 'translateY(1px)' }}
              >
                {isAddress(addr) ? addr : <Mark color="red">{addr}</Mark>}
              </Text>
              <ActionIcon
                variant="subtle"
                size="xs"
                onClick={() => deleteAddress(addr)}
              >
                <IconX size={12} />
              </ActionIcon>
            </Group>
          </Paper>
        ))}
      </Flex>
    </>
  );
};
