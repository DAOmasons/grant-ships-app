import { Flex, Modal } from '@mantine/core';
import { ShowcaseLink } from '../utils/media';
import { MediaCarousel } from './MediaCarousel';

export const FullScreenGallery = ({
  items,
  isOpen,
  close,
}: {
  items: ShowcaseLink[];
  isOpen: boolean;
  close: () => void;
}) => {
  return (
    <Modal
      opened={isOpen}
      onClose={close}
      fullScreen
      transitionProps={{ transition: 'fade', duration: 200 }}
    >
      <Flex h="90vh" justify={'center'} align="center">
        <MediaCarousel items={items} size="lg" />
      </Flex>
    </Modal>
  );
};
