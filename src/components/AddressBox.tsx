import {
  ActionIcon,
  CloseIcon,
  Flex,
  Group,
  Highlight,
  MantineComponent,
  Mark,
  Paper,
  Pill,
  Text,
  Textarea,
  TextareaProps,
  __InputStylesNames,
  useMantineTheme,
} from '@mantine/core';
import { IconSquareRoundedX, IconX } from '@tabler/icons-react';
import React, { forwardRef, useMemo, useState } from 'react';
import { isAddress } from 'viem';

export const AddressBox = (props: TextareaProps) => {
  const theme = useMantineTheme();
  const [value, setValue] = useState('');
  //   const [addrData, setAddrData] = useState<string[]>([]);

  //   const [hasInvalidAddress, setHasInvalidAddress] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const addrData = useMemo(() => {
    const addresses = value
      .split(',')
      .map((addr) => addr.trim())
      .filter(Boolean);

    console.log('addresses', addresses);
    return addresses;
  }, [value]);

  const nonValidAddresses = addrData.filter((addr) => !isAddress(addr));
  const errorMessage = nonValidAddresses.length
    ? `Has ${nonValidAddresses?.length} Invalid ${
        nonValidAddresses?.length === 1 ? 'Address' : 'Addresses'
      }`
    : props.error;

  const deleteAddress = (addr: string) => {
    setValue(value.replace(addr, ''));
  };
  return (
    <>
      <Textarea
        {...props}
        onChange={handleChange}
        error={errorMessage}
        value={value}
      />
      <Flex w="100%" direction="column">
        {addrData.map((addr, index) => (
          <Paper
            bg={theme.colors.dark[5]}
            w="fit-content"
            key={addr + index}
            mb={'xs'}
            p={4}
          >
            <Group align="center">
              <Text
                component="a"
                href=""
                size="xs"
                c={theme.colors.blue[5]}
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
