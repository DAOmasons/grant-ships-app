import { useEffect, useMemo, useState } from 'react';
import { MainSection, PageTitle } from '../layout/Sections';
import { Avatar, Box, Flex, Group, Stack, Stepper, Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { getShipsPageData } from '../queries/getShipsPage';
import { useLaptop, useMobile, useTablet } from '../hooks/useBreakpoint';
import { useForm, zodResolver } from '@mantine/form';
import { votingSchema } from '../components/forms/validationSchemas/votingFormSchema';
import { z } from 'zod';
import { VoteAffix } from '../components/voting/VoteAffix';
import { VoteTimesIndicator } from '../components/voting/VoteTimesIndicator';
import { ShipVotingPanel } from '../components/voting/ShipVotingPanel';
import { ConfirmationPanel } from '../components/voting/ConfirmationPanel';
import { useVoting } from '../hooks/useVoting';
import { VotingStage } from '../types/common';
import { ShipsCardUI } from '../types/ui';

export type VotingFormValues = z.infer<typeof votingSchema>;

export const Vote = () => {
  const [step, setStep] = useState(0);
  const { data: ships } = useQuery({
    queryKey: ['ships-page'],
    queryFn: getShipsPageData,
  });
  const { hasUserVoted, votingStage } = useVoting();

  const isLaptop = useLaptop();

  const isTablet = useTablet();

  const isMobile = useMobile();

  const form = useForm({
    initialValues: {
      ships: [],
    } as VotingFormValues,
    validate: zodResolver(votingSchema),
  });

  useEffect(
    () => {
      if (!ships) return;
      const updatedShips = ships?.map((ship) => ({
        shipId: ship.id,
        shipPerc: '',
        shipComment: '',
      }));
      form.setValues((prev) => ({ ...prev, ships: updatedShips }));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ships]
  );

  if (!ships) {
    return null;
  }

  // if (hasUserVoted || votingStage > VotingStage.Active) {
  //   return <PostVote ships={ships} />;
  // }

  const nextStep = () =>
    setStep((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setStep((current) => (current > 0 ? current - 1 : current));

  return (
    <Flex w="100%">
      <MainSection>
        <VoteAffix formValues={form.values} />
        <PageTitle title="Vote" />
        <Stepper
          active={step}
          maw={600}
          miw={300}
          size="xs"
          w={'100%'}
          mt={'lg'}
          mb="xl"
          onStepClick={setStep}
        >
          {ships?.map((ship, index) => (
            <Stepper.Step
              key={ship.id}
              mih={isTablet ? 36 : undefined}
              label={isMobile ? undefined : `Ship ${index + 1}`}
              style={{
                alignItems: 'center',
              }}
            >
              <ShipVotingPanel
                ship={ship}
                form={form}
                index={index}
                nextStep={nextStep}
                prevStep={prevStep}
              />
            </Stepper.Step>
          ))}
          <Stepper.Step
            label={isMobile ? undefined : 'Final'}
            mih={isTablet ? 36 : undefined}
            style={{
              alignItems: 'center',
            }}
          >
            <ConfirmationPanel ships={ships} form={form} />
          </Stepper.Step>
        </Stepper>
      </MainSection>
      {!isLaptop && (
        <Stack gap={'md'} mt={72} w={270}>
          <VoteTimesIndicator />
        </Stack>
      )}
    </Flex>
  );
};

// const PostVote = ({ ships }: { ships: ShipsCardUI[] }) => {
//   const { hasUserVoted, userVotes, contest } = useVoting();

//   const consolidatedShipData = useMemo(() => {
//     if (!contest?.choices || !ships) return [];

//     return ships.map((ship) => {
//       const choice = contest.choices.find(
//         (choice) => choice.shipId === ship.id
//       );

//       return {
//         shipData: ship,
//         choice,
//       };
//     });
//   }, [ships, contest?.choices]);

//   const consolidatedShipVoteData = useMemo(() => {
//     if (!consolidatedShipData || !userVotes) return [];

//     return consolidatedShipData.map((shipData) => {
//       const voteData = userVotes.find(
//         (vote) => vote.choice_id === shipData.choice?.id
//       );

//       return {
//         ...shipData,
//         voteData,
//       };
//     });
//   }, [consolidatedShipData, userVotes]);

//   const totalUserVotes = consolidatedShipVoteData.reduce(
//     (acc, { voteData }) => acc + BigInt(voteData?.amount) || 0n,
//     0n
//   );

//   console.log('totalUserVotes', totalUserVotes);

//   return (
//     <Flex w="100%">
//       <MainSection>
//         <PageTitle title="Vote" />
//         <Text fz={32} mt="xl" fw={600} mb="xl">
//           {hasUserVoted ? 'Your vote has been submitted!' : 'Voting is closed'}
//         </Text>
//         {hasUserVoted && (
//           <>
//             <Text fz={'lg'} fw={600} mb="md">
//               Your Vote
//             </Text>
//             <Box mb="xl">
//               {consolidatedShipVoteData.map(({ shipData, voteData }) => {
//                 console.log('voteData', voteData || BigInt(voteData.amount) || 0n);
//                 return (
//                   <Box mb={'sm'}>
//                     <Group>
//                       <Avatar
//                         src={shipData.imgUrl}
//                         alt={shipData.name}
//                         size={32}
//                       />
//                       <Text fz="md">{shipData.name}</Text>
//                     </Group>
//                   </Box>
//                 );
//               })}
//             </Box>
//           </>
//         )}
//       </MainSection>
//     </Flex>
//   );
// };
