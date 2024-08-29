import { Avatar, Box, Group, Table, Text } from '@mantine/core';
import { BadgeManager } from '../../../queries/getBadgeManager';
import { Link } from 'react-router-dom';
import { AddressAvatar } from '../../AddressAvatar';
import { Address, formatEther } from 'viem';
import { charLimit } from '../../../utils/helpers';
import { Display } from '../../Display';

export const BadgeRecordsPage = ({ shaman }: { shaman: BadgeManager }) => {
  return (
    <Box>
      {shaman.templates?.length > 0 ? (
        shaman.templates?.map((template) => (
          <Box mb="xl" key={`template-${template.badgeId}`}>
            <Group>
              <Avatar src={template.templateMetadata.imgUrl} />
              <Text fw={600}>{template.name}</Text>
            </Group>
            {template.resolvedBadges.length > 0 ? (
              <Table verticalSpacing={'md'}>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Recipient</Table.Th>
                    <Table.Th>Amount</Table.Th>
                    <Table.Th>Comment</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {template.resolvedBadges.map((badge, index) => (
                    <Table.Tr
                      key={`${template.badgeId}-${badge.wearer}-${index}`}
                    >
                      <Table.Td>
                        <Link
                          to={`/profile/${badge.wearer}`}
                          style={{ cursor: 'pointer' }}
                        >
                          <AddressAvatar
                            fz={'sm'}
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
                </Table.Tbody>
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
