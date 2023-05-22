import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { LoginForm } from '../components';

const Login = () => {
  return (
    <Flex align="center" justify="center">
      <LoginForm />
    </Flex>
  );
};

export default Login;
