import {
  Flex,
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
import React, { forwardRef, useState } from 'react';
import { isAddress } from 'viem';

export const AddressBox = (props: TextareaProps) => {
  const theme = useMantineTheme();
  const [inputData, setInputData] = useState<string[]>([]);

  //   const [hasInvalidAddress, setHasInvalidAddress] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const pastedData = e.target.value;

    const addresses = pastedData
      .split(',')
      .filter(Boolean)
      .map((addr) => addr.trim());

    console.log('addresses', addresses);

    setInputData(addresses);
  };

  const nonValidAddresses = inputData.filter((addr) => !isAddress(addr));
  const errorMessage = nonValidAddresses.length
    ? `Has ${nonValidAddresses?.length} Invalid ${
        nonValidAddresses?.length === 1 ? 'Address' : 'Addresses'
      }`
    : props.error;
  return (
    <>
      <Textarea {...props} onChange={handleChange} error={errorMessage} />
      <Flex w="100%" direction="column">
        {inputData.map((addr, index) => (
          <Paper
            bg={theme.colors.dark[5]}
            w="fit-content"
            key={addr + index}
            mb={'xs'}
          >
            <Text
              p={4}
              component="a"
              href=""
              size="xs"
              c={theme.colors.blue[5]}
            >
              {isAddress(addr) ? addr : <Mark color="red">{addr}</Mark>}
            </Text>
          </Paper>
        ))}
      </Flex>
    </>
  );
};
