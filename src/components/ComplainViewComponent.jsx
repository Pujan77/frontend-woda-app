import React from 'react';
import { Stack, Text, Button } from '@chakra-ui/react';
import { FcCheckmark, FcAlarmClock } from 'react-icons/fc';
import { addressComplainAdmin } from '../services/authAPI';
import { useError, useResponse } from '../context/ErrorContext';
import { formatDate } from '../utils';

export default function ComplainViewComponent({ data, getComplain }) {
  const { showError } = useError();
  const { showSuccess } = useResponse();
  const handleClick = async () => {
    let body = {
      message: 'Issue has been fixed and addressed',
    };
    try {
      let res = await addressComplainAdmin(data._id, body);
      showSuccess(res.data.message);
      getComplain();
    } catch (error) {
      showError('error occured while addressing');
    }
  };
  return (
    <Stack p="4" boxShadow="lg" m="4" borderRadius="sm">
      <Stack direction="row" alignItems="center">
        <Text fontWeight="semibold">{data.typeOfComplain}</Text>
        {data.addressedStatus ? <FcCheckmark /> : <FcAlarmClock />}
      </Stack>

      <Stack
        direction={{ base: 'column', md: 'row' }}
        justifyContent="space-between"
      >
        <Text fontSize={{ base: 'sm' }} textAlign={'left'} maxW={'4xl'}>
          {data.message}
        </Text>
        <Text color="gray.500" fontSize="sm">
          By: {data.user.firstName} {data.user.lastName}
        </Text>
        <Stack direction={{ base: 'column', md: 'row' }}>
          {data.addressedStatus ? (
            <Button disabled colorScheme="gray">
              Addressed
            </Button>
          ) : (
            <Button onClick={handleClick} colorScheme="green">
              Address Issue
            </Button>
          )}
        </Stack>
      </Stack>
      <Text color="gray.500" fontSize="sm">
        Date: {formatDate(data.createdDate)}
      </Text>
    </Stack>
  );
}
