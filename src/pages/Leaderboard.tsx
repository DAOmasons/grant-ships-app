import { useQuery } from '@tanstack/react-query';
import { getLeaderboardQuery } from '../queries/getLeaderboard';
import { Avatar, Box, Group, Table, Text, Title } from '@mantine/core';
import { Address, formatEther } from 'viem';
import { AddressAvatar } from '../components/AddressAvatar';

export const Leaderboard = () => {
  const { data } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: getLeaderboardQuery,
    enabled: true,
  });

  if (!data) return null;

  return (
    <Box>
      <Title fw={100} fz={28} mb="xl">
        Leaderboard
      </Title>
      <Table verticalSpacing={'sm'} horizontalSpacing={'sm'}>
        <Table.Thead>
          <Table.Tr fw={700}>
            <Table.Td>Player</Table.Td>
            <Table.Td>Balance</Table.Td>
            <Table.Td>Badges</Table.Td>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((holder) => (
            <Table.Tr key={holder.address}>
              <Table.Td>
                <AddressAvatar
                  fz={'sm'}
                  address={holder.address as Address}
                  size={20}
                />
              </Table.Td>
              <Table.Td>{formatEther(holder.badgeBalance)}</Table.Td>
              <Table.Td>
                <Group>
                  <Avatar.Group>
                    {holder.badges.slice(0, 3).map((badge, index) => (
                      <Avatar
                        src={badge.imgUrl}
                        size={24}
                        key={`avatar-${holder.address}-${index}`}
                      />
                    ))}
                  </Avatar.Group>
                  {holder.badges.length > 3 && (
                    <Text fz="xs">and {holder.badges.length - 3} more</Text>
                  )}
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Box>
  );
};
