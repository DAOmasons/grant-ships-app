import { useState } from 'react';
import { MainSection, PageTitle } from '../layout/Sections';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Group,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { IconBadge, IconPencil, IconPlus, IconUser } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { IconTrash } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { getBadgeShaman, ResolvedTemplate } from '../queries/getBadgeManager';

import { formatEther } from 'viem';
import { Bold } from '../components/Typography';
import { BadgeTemplateDrawer } from '../components/dashboard/facilitator/BadgeTemplateDrawer';
import { DeleteBadgeModal } from '../components/dashboard/facilitator/DeleteBadgeModal';
import { BadgeMintDrawer } from '../components/dashboard/facilitator/BadgeMintDrawer';

export const BadgeManager = () => {
  const theme = useMantineTheme();
  const [createOpened, { close: closeCreate, open: openCreate }] =
    useDisclosure(false);
  const [editOpened, { close: closeEdit, open: openEdit }] =
    useDisclosure(false);

  const [deleteOpened, { close: closeDelete, open: openDelete }] =
    useDisclosure(false);

  const [applyOpened, { close: closeApply, open: openApply }] =
    useDisclosure(false);

  const [selectedTemplate, setSelectedTemplate] =
    useState<ResolvedTemplate | null>(null);

  const { data: shaman, refetch: refetchShaman } = useQuery({
    queryKey: ['badge-shaman'],
    queryFn: getBadgeShaman,
    enabled: true,
  });

  if (!shaman) return null;

  const selectTemplate = (template: ResolvedTemplate) => {
    if (shaman) {
      if (selectedTemplate?.badgeId === template.badgeId) {
        setSelectedTemplate(null);
      } else {
        setSelectedTemplate(template);
      }
    }
  };

  return (
    <Flex h={'200vh'}>
      <MainSection>
        <PageTitle title="Badge Manager" />
        <Group align="start" gap="md" w="100%" mb="xl">
          <Avatar
            bg={theme.colors.dark[5]}
            src={selectedTemplate?.templateMetadata.imgUrl || undefined}
            size={240}
            radius={'sm'}
            pos="relative"
          >
            <IconBadge size={80} />
          </Avatar>
          {selectedTemplate ? (
            <Stack w={280} gap="xs">
              <Text fw={600} lineClamp={1}>
                {selectedTemplate.name}
              </Text>
              <Text
                fz={'sm'}
                opacity={0.8}
                lineClamp={4}
                style={{
                  wordBreak: 'break-word',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {selectedTemplate.templateMetadata.description}
              </Text>
              <Text fz={'sm'} opacity={0.8}>
                <Bold>Badge ID: </Bold>
                {selectedTemplate.badgeId}
              </Text>
              <Text
                fz={'sm'}
                opacity={0.8}
                c={
                  selectedTemplate?.isSlash
                    ? theme.colors.red[6]
                    : theme.colors.green[6]
                }
              >
                <Bold>
                  {selectedTemplate?.isSlash ? 'Penalty: ' : 'Reward: '}{' '}
                </Bold>
                {selectedTemplate?.hasFixedAmount
                  ? formatEther(selectedTemplate.amount)
                  : 'Dynamic (determined at mint)'}
              </Text>
              <Text fz={'sm'} opacity={0.8}>
                <Bold>Token: </Bold>
                {selectedTemplate.isVotingToken
                  ? `${shaman.sharesToken.symbol} (Voting Token)`
                  : `${shaman.lootToken.symbol} (Non-Voting Token)`}
              </Text>
            </Stack>
          ) : (
            <Stack w={280} gap="xs">
              <Text fw={600} lineClamp={1}>
                Badge Manager
              </Text>
              <Text
                fz={'sm'}
                opacity={0.8}
                lineClamp={4}
                style={{
                  wordBreak: 'break-word',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {shaman?.templates && shaman?.templates.length > 0
                  ? 'Select a badge from below to award it to any user'
                  : 'Create a new badge to award it to an user'}
              </Text>
            </Stack>
          )}
        </Group>
        <Divider mb="xl" />
        <Flex gap={'md'} wrap={'wrap'}>
          {shaman?.templates?.map((template) => (
            <Avatar
              key={template.badgeId}
              size={94}
              radius="sm"
              src={template.templateMetadata.imgUrl || ''}
              onClick={() => selectTemplate(template)}
            >
              <IconBadge />
            </Avatar>
          ))}
        </Flex>
        <BadgeTemplateDrawer
          opened={createOpened}
          onClose={closeCreate}
          shaman={shaman}
          onPollSuccess={() => {
            refetchShaman();
          }}
        />
        {selectedTemplate && (
          <BadgeTemplateDrawer
            key={selectedTemplate.badgeId}
            opened={editOpened}
            onClose={closeEdit}
            shaman={shaman}
            selectedTemplate={selectedTemplate}
            onPollSuccess={() => {
              refetchShaman();
            }}
          />
        )}
        {selectedTemplate && deleteOpened && (
          <DeleteBadgeModal
            opened={deleteOpened}
            onClose={closeDelete}
            template={selectedTemplate}
            onPollSuccess={() => {
              refetchShaman();
            }}
          />
        )}
        {selectedTemplate && (
          <BadgeMintDrawer
            opened={applyOpened}
            onClose={closeApply}
            shaman={shaman}
            onPollSuccess={() => {
              refetchShaman();
            }}
            selectedTemplate={selectedTemplate}
          />
        )}
      </MainSection>
      <Box pos="relative" mt="82">
        <Stack pos="fixed">
          {!selectedTemplate && (
            <Button
              onClick={openCreate}
              leftSection={<IconPlus />}
              variant="menu"
            >
              Create Badge
            </Button>
          )}
          {selectedTemplate && (
            <>
              <Button
                onClick={openApply}
                leftSection={<IconUser />}
                variant="menu"
              >
                Award Badge
              </Button>
              <Button
                onClick={openEdit}
                leftSection={<IconPencil />}
                variant="menu"
              >
                Edit Badge
              </Button>
              <Button
                onClick={openCreate}
                leftSection={<IconPlus />}
                variant="menu"
              >
                Create Badge
              </Button>
              <Button
                onClick={openDelete}
                leftSection={<IconTrash />}
                c={theme.colors.red[6]}
                variant="menu"
              >
                Delete Badge
              </Button>
            </>
          )}
        </Stack>
      </Box>
    </Flex>
  );
};
