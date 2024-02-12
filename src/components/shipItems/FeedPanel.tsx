import { FeedCardUI } from '../../types/ui';
import { Feed } from '../feed/Feed';

const DummyFeed: FeedCardUI[] = [
  {
    subject: {
      name: 'Project X',
      id: '0x123',
      entityType: 'project',
      imgUrl: 'https://i.pravatar.cc/300',
    },
    object: {
      name: 'Devrel Gallactica',
      id: '0x123',
      entityType: 'ship',
    },
    message:
      'Project X has submitted Milestone 1 for Devrel Gallactica for approval',
    timestamp: 1630000000,
    sender: '0x57abda4ee50Bb3079A556C878b2c345310057569',
    embedText:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen...",
  },

  {
    subject: {
      name: 'Project X',
      id: '0x123',
      entityType: 'project',
      imgUrl: 'https://i.pravatar.cc/300',
    },
    object: {
      name: 'Devrel Gallactica',
      id: '0x123',
      entityType: 'ship',
    },
    message:
      'Project X has submitted Milestone 1 for Devrel Gallactica for approval',
    timestamp: 1630000000,
    sender: '0x57abda4ee50Bb3079A556C878b2c345310057569',
  },
  {
    subject: {
      name: 'Project X',
      id: '0x123',
      entityType: 'project',
      imgUrl: 'https://i.pravatar.cc/300',
    },
    object: {
      name: 'Devrel Gallactica',
      id: '0x123',
      entityType: 'ship',
    },
    message:
      'Project X has submitted Milestone 1 for Devrel Gallactica for approval',
    timestamp: 1630000000,
    sender: '0x57abda4ee50Bb3079A556C878b2c345310057569',
  },
  {
    subject: {
      name: 'Project X',
      id: '0x123',
      entityType: 'project',
      imgUrl: 'https://i.pravatar.cc/300',
    },
    object: {
      name: 'Devrel Gallactica',
      id: '0x123',
      entityType: 'ship',
    },
    message:
      'Project X has submitted Milestone 1 for Devrel Gallactica for approval',
    timestamp: 1630000000,
    sender: '0x57abda4ee50Bb3079A556C878b2c345310057569',
  },
];

export const FeedPanel = () => {
  return <Feed feed={DummyFeed} />;
};
