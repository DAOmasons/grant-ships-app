// import {
//   Avatar,
//   Box,
//   Group,
//   Paper,
//   Progress,
//   Spoiler,
//   Text,
//   useMantineTheme,
// } from '@mantine/core';
// import { CondensedChoiceData } from '../../pages/Vote';
// import { GsVoter } from '../../queries/getVoters';
// import { useMemo } from 'react';
// import { AddressAvatar } from '../AddressAvatar';
// import { Address } from 'viem';
// import { formatBigIntPercentage } from '../../utils/helpers';
// import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
// import classes from '../feed/FeedStyles.module.css';
// import { formatBalance } from '../../types/common';

// export const VoteCard = ({
//   voter,
//   choices,
//   tokenSymbol,
// }: {
//   voter: GsVoter;
//   choices: CondensedChoiceData[];
//   tokenSymbol?: string;
// }) => {
//   const theme = useMantineTheme();
//   const colors = [
//     theme.colors.blue[5],
//     theme.colors.violet[5],
//     theme.colors.pink[5],
//   ];

//   const totalUserVotes = useMemo(() => {
//     return voter.votes.reduce((acc, vote) => {
//       return acc + BigInt(vote?.amount ? vote.amount : 0);
//     }, 0n);
//   }, [voter]);

//   const consolidated = useMemo(() => {
//     return choices.map((choice) => {
//       const vote = voter.votes.find((vote) => choice.id === vote.choice.id);
//       return { ...choice, vote };
//     });
//   }, [voter, choices]);

//   return (
//     <Paper w={350} mb="lg" bg={theme.colors.dark[6]} p={'lg'}>
//       <Box mb="xl">
//         <AddressAvatar address={voter.id as Address} size={36} />
//       </Box>

//       {consolidated.map((choice, index) => {
//         return (
//           <ShipChoiceVoteBar
//             tokenSymbol={tokenSymbol}
//             key={`${voter.id}-${choice.id}`}
//             choice={{
//               shipImg: choice.shipImg,
//               shipName: choice.shipName,
//               id: choice.id,
//             }}
//             totalVotes={totalUserVotes}
//             reason={choice?.vote?.reason}
//             voteAmount={BigInt(choice.vote?.amount || 0)}
//             color={colors[index]}
//             didVote={!!choice.vote}
//           />
//         );
//       })}
//     </Paper>
//   );
// };

// const ShipChoiceVoteBar = ({
//   choice,
//   totalVotes,
//   voteAmount,
//   reason,
//   color,
//   tokenSymbol,
//   didVote,
// }: {
//   choice: CondensedChoiceData;
//   totalVotes: bigint;
//   voteAmount: bigint;
//   reason?: string | null;
//   color: string;
//   tokenSymbol?: string;
//   didVote?: boolean;
// }) => {
//   const voteAmountDisplay = formatBalance(voteAmount);
//   const votePercentage = formatBigIntPercentage(voteAmount, totalVotes);
//   return (
//     <Box mb="md">
//       <Group w={'100%'} mb="sm" align="flex-end">
//         <Avatar size={32} src={choice.shipImg} />
//         <Box maw={250} w="100%">
//           <Progress
//             value={Number(votePercentage)}
//             color={color}
//             opacity={0.7}
//             mb={2}
//           />
//           <Text fz="xs">
//             {votePercentage}% Voted ({voteAmountDisplay}) {tokenSymbol || ''}
//           </Text>
//         </Box>
//       </Group>
//       <Spoiler
//         mb={'xs'}
//         maw={300}
//         hideLabel={<IconChevronUp stroke={1} />}
//         showLabel={<IconChevronDown stroke={1} />}
//         classNames={{
//           root: classes.embedTextBox,
//           control: classes.embedTextControl,
//         }}
//         maxHeight={24}
//       >
//         {!didVote && (
//           <Text fz="sm" className="ws-pre-wrap">
//             Did not vote
//           </Text>
//         )}
//         {didVote && !reason && (
//           <Text fz="sm" className="ws-pre-wrap">
//             No reason given
//           </Text>
//         )}
//         {didVote && reason && (
//           <Text fz="sm" className="ws-pre-wrap">
//             {reason}
//           </Text>
//         )}
//       </Spoiler>
//     </Box>
//   );
// };
