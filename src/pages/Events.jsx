import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { EventListing } from '../components';

const Events = () => {
  return (
    <Flex align={'center'} justify={'center'}>
      <Box
        rounded={'lg'}
        boxShadow={'lg'}
        p={8}
        flex={1}
        maxH={'50em'}
        overflowY={'auto'}
      >
        <EventListing />
      </Box>
    </Flex>
  );
};

export default Events;
