import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import EventForm from './EventForm';
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';
import CardUserView from './CardUserView';

export default function EventModal({ isOpen, onClose, modalData, bodyData }) {
  const { user } = useContext(AuthContext);
  const getUserDetail = () => {
    return modalData.users.map((user, i) => {
      return <CardUserView key={i} detail={user} />;
    });
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalData.details}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {user ? (
              getUserDetail()
            ) : (
              <EventForm id={bodyData} onClose={onClose} />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
