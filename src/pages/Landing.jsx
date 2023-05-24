import React from 'react';
import { ArticleList, Hero } from '../components';
import { useError, useResponse } from '../context/ErrorContext';
import { Box, Flex } from '@chakra-ui/react';

const Landing = () => {
  const { showError } = useError();
  const { showSuccess, showInfo } = useResponse();

  const handleButtonClick = () => {
    // Simulate an error
    // Simulating an error
    const errorMessage = 'Something went wrong!';
    showError(errorMessage);

    // Simulating a success message
    const successMessage = 'Action completed successfully.';
    showSuccess(successMessage);

    // Simulating an info message
    const infoMessage = 'Here is some additional information.';
    showInfo(infoMessage);
  };
  return (
    <div>
      {/* <button onClick={handleButtonClick}>Trigger Error</button> */}
      <Hero />
      <Flex align={'center'} justify={'center'}>
        <Box
          rounded={'lg'}
          boxShadow={'lg'}
          p={8}
          flex={1}
          maxH={'100em'}
          overflowY={'auto'}
        >
          {/* Content for the first column */}
          {/* Add your content here */}
        </Box>
        <Box
          rounded={'lg'}
          boxShadow={'lg'}
          p={8}
          flex={1}
          maxH={'50em'}
          overflowY={'auto'}
        >
          <ArticleList />
        </Box>
      </Flex>
    </div>
  );
};

export default Landing;
