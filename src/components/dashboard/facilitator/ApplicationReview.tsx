import { useState } from 'react';
import { Button, Flex, Text, TextInput, Textarea } from '@mantine/core';
import { ShipReviewData } from './FacilitatorShipDash';
import { AppAlert } from '../../UnderContruction';
import { ReviewPage } from '../../../layout/ReviewPage';

export const ApplicationReview = ({
  shipReviewData,
  handleApprove,
  hasCurrentRound,
}: {
  hasCurrentRound: boolean;
  shipReviewData: ShipReviewData | null;
  handleApprove: (isApproved: boolean, reason: string, hatId: string) => void;
}) => {
  const [reasonText, setReasonText] = useState('');
  const [hatId, setHatId] = useState('');

  // Todo: Add a check for shipReviewData
  if (!shipReviewData) return null;

  return (
    <ReviewPage
      title="Review Application"
      sections={[
        {
          subtitle: 'Ship Name',
          content: shipReviewData.name,
        },
        {
          subtitle: 'Impact Thesis',
          content: shipReviewData.impactThesis,
        },
        {
          subtitle: 'Submission Guidelines',
          content: shipReviewData.submissionGuidelines,
        },
        {
          subtitle: 'Management Fee',
          content: shipReviewData.fee,
        },
        {
          subtitle: 'Additional Link',
          content: shipReviewData.extraLink ? (
            <Text
              fz="md"
              component="a"
              rel="noopener noreferrer"
              target="_blank"
            >
              {shipReviewData.extraLink}
            </Text>
          ) : (
            <Text fz="md" fs="italic" opacity={0.7}>
              No additional link provided
            </Text>
          ),
        },
        {
          subtitle: 'Additional Information',
          content: shipReviewData.additionalInfo,
        },
      ]}
      footerSection={
        <>
          <Textarea
            label="Reasoning"
            description="Why are you approving or rejecting this application?"
            value={reasonText}
            onChange={(e) => setReasonText(e.currentTarget.value)}
            autosize
            required
            minRows={4}
            maxRows={8}
            mb="xl"
          />
          <TextInput
            value={hatId}
            label="Ship Operator Hat ID"
            description="Only required if approving"
            onChange={(e) => setHatId(e.currentTarget.value)}
            mb="lg"
          />
          <AppAlert
            title="Hat Id Required to Approve"
            description="A hat ID is required to operate a ship. Make sure that that you enter a correct, live Hat ID before approving. If you are rejecting, you can leave this field empty."
          />
          <Flex justify="space-between">
            <Button
              variant="outline"
              disabled={!reasonText || !hasCurrentRound}
              onClick={() => handleApprove(false, reasonText, '')}
            >
              Reject
            </Button>
            <Button
              disabled={!reasonText || !hatId || !hasCurrentRound}
              onClick={() => handleApprove(true, reasonText, hatId)}
            >
              Approve
            </Button>
          </Flex>
        </>
      }
    />
  );
};
