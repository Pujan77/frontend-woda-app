import { Box, Button, Stack, Text, useDisclosure } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { formatDate, formatDateTime } from '../utils';
import EventModal from './EventModal';
import { useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const EventListOneByOne = ({ event }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useContext(AuthContext);
  const location = useLocation();
  return (
    <>
      <Stack p="4" boxShadow="lg" m="4" borderRadius="sm">
        <Stack direction="row" alignItems="center">
          <Text fontWeight="semibold">{event.details}</Text>
        </Stack>

        <Stack
          direction={{ base: 'column', md: 'row' }}
          justifyContent="space-between"
        >
          <Box
            fontSize={{ base: 'sm' }}
            textAlign={'left'}
            maxW={'4xl'}
            dangerouslySetInnerHTML={{ __html: event.viewPage }}
          ></Box>
          {location.pathname === '/events' && (
            <Stack direction={{ base: 'column', md: 'row' }}>
              <Button onClick={onOpen} colorScheme="green">
                Participate
              </Button>
            </Stack>
          )}
          {location.pathname === '/user/notices' && user ? (
            <Stack direction={{ base: 'column', md: 'row' }}>
              <Button onClick={onOpen} colorScheme="green">
                View Participants
              </Button>
            </Stack>
          ) : null}
        </Stack>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          justifyContent="space-between"
        >
          <Text color="gray.500" fontSize="sm">
            Start Date: {formatDateTime(event.startDate, event.startTime)}
          </Text>
          <Text color="gray.500" fontSize="sm">
            End Date: {formatDateTime(event.endDate, event.endTime)}
          </Text>
        </Stack>
        <Text color="gray.300" fontSize="sm">
          Published: {formatDate(event.publishedDate)}
        </Text>
      </Stack>
      <EventModal
        onClose={onClose}
        isOpen={isOpen}
        modalData={event}
        bodyData={event._id}
      />
    </>
  );
};

export default EventListOneByOne;
