import React from 'react';
import { Subscribe } from '../components';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';

const Subscriber = () => {
  return (
    <Flex align="center" justify="center">
      <Box w="100%" p={4}>
        <Subscribe />
      </Box>
    </Flex>
  );
};

export default Subscriber;
