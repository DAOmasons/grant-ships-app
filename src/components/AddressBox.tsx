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
import React, { useEffect, useState } from 'react';
import { isAddress } from 'viem';

import { scanAddressLink } from '../utils/scan';

export const AddressBox = (
  props: TextareaProps & { formSetValue?: (addresses: string[]) => void }
) => {
  const { formSetValue, ...rest } = props;
  const theme = useMantineTheme();
  const [value, setValue] = useState('');
  const [addrData, setAddrData] = useState<string[]>([]);

  // Sets string value of the text area
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  // Parses the comma separated string into an array of strings
  useEffect(() => {
    const addresses = value
      .split(',')
      .map((addr) => addr.trim())
      .filter(Boolean);

    setAddrData(addresses);
  }, [value]);

  // Optionally sets the form value
  useEffect(() => {
    formSetValue?.(addrData);

    // disable exhaustive-deps because formSetValue triggers effect
    // Should only have addrData as a dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addrData]);

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
    <div>
      <Textarea
        {...rest}
        onChange={handleChange}
        error={errorMessage}
        value={value}
        autosize
        spellCheck={false}
        minRows={4}
        maxRows={6}
      />
      <Flex w="100%" direction="column" mb={0}>
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
    </div>
  );
};
