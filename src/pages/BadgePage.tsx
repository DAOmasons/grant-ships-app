import { useQuery } from '@tanstack/react-query';

import {
  BadgeManager as BadgeManagerType,
  getBadgeShaman,
} from '../queries/getBadgeManager';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Avatar, Box, Group, Table, Tabs, Text } from '@mantine/core';
import { BadgeManager } from './BadgeManager';
import { MainSection, PageTitle } from '../layout/Sections';
import { Address, formatEther } from 'viem';
import { charLimit } from '../utils/helpers';
import { AddressAvatar } from '../components/AddressAvatar';
import { Display } from '../components/Display';

export const BadgePage = () => {
  const { data: shaman, refetch: refetchShaman } = useQuery({
    queryKey: ['badge-shaman'],
    queryFn: getBadgeShaman,
    enabled: true,
  });

  const navigate = useNavigate();
  const location = useLocation();

  if (!shaman) return null;

  const tab = location.pathname.split('/').pop();

  return (
    <MainSection>
      <PageTitle title="Badge Manager" />
      <Tabs
        value={tab || 'manager'}
        onChange={(tab) => navigate(`/badges/${tab}`)}
      >
        <Tabs.List mb="lg">
          <Tabs.Tab value="manager">Manager</Tabs.Tab>
          <Tabs.Tab value="records">Records</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="manager">
          <BadgeManager shaman={shaman} refetchShaman={refetchShaman} />
        </Tabs.Panel>
        <Tabs.Panel value="records">
          <BadgeRecordsPage shaman={shaman} />
        </Tabs.Panel>
      </Tabs>
    </MainSection>
  );
};

const BadgeRecordsPage = ({ shaman }: { shaman: BadgeManagerType }) => {
  return (
    <Box>
      {shaman.templates?.length > 0 ? (
        shaman.templates?.map((template) => (
          <Box mb="xl">
            <Group mb="sm">
              <Avatar src={template.templateMetadata.imgUrl} />
              <Text fw={600}>{template.name}</Text>
            </Group>
            {template.resolvedBadges.length > 0 ? (
              <Table>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th maw={'30%'}>Recipient</Table.Th>
                    <Table.Th>Amount</Table.Th>
                    <Table.Th>Comment</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                {template.resolvedBadges.map((badge) => (
                  <Table.Tr>
                    <Table.Td maw={'30%'}>
                      <Link
                        to={`/profile/${badge.wearer}`}
                        style={{ cursor: 'pointer' }}
                      >
                        <AddressAvatar
                          address={badge.wearer as Address}
                          size={20}
                        />
                      </Link>
                    </Table.Td>
                    <Table.Td>
                      {formatEther(badge?.amount)}{' '}
                      {template?.isVotingToken
                        ? shaman?.sharesToken.symbol
                        : shaman?.lootToken.symbol}
                    </Table.Td>
                    <Table.Td>
                      {badge.reason ? charLimit(badge?.reason || '') : '--'}
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table>
            ) : (
              <Display
                title="No Badges Minted"
                description="Badges of this type have not been minted"
              />
            )}
          </Box>
        ))
      ) : (
        <Display title="No Records" description="No badges have been created" />
      )}
    </Box>
  );
};
