import React from 'react';
import { Box, VStack, Grid } from '@chakra-ui/react';
import { RotatingTriangles } from 'react-loader-spinner';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

const Loader = () => {
  return (
    <div>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={6}>
          <VStack spacing={16}>
            <RotatingTriangles
              visible={true}
              height="250"
              colors={['#146C94', '#F6F1F1', '#AFD3E2']}
              width="250"
              ariaLabel="rotating-triangels-loading"
              wrapperStyle={{}}
              wrapperClass="rotating-triangels-wrapper"
            />
          </VStack>
        </Grid>
      </Box>
    </div>
  );
};

export default Loader;
