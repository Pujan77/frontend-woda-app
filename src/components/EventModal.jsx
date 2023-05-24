import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import EventForm from './EventForm';

export default function EventModal({ isOpen, onClose, modalData, bodyData }) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalData.details}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EventForm id={bodyData} onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
