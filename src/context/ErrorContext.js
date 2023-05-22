import React, { createContext, useContext, useState } from 'react';
import { useToast } from '@chakra-ui/react';

const ErrorContext = createContext();

export const useError = () => useContext(ErrorContext);

export const useResponse = () => {
  const toast = useToast();

  const showSuccess = message => {
    toast({
      title: 'Success',
      description: message,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const showInfo = message => {
    toast({
      title: 'Info',
      description: message,
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  const showError = message => {
    toast({
      title: 'Error',
      description: message,
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
  };

  return { showSuccess, showInfo, showError };
};

export const ErrorProvider = ({ children }) => {
  const toast = useToast();
  const [error, setError] = useState(null);

  const showError = message => {
    setError(message);
    toast({
      title: 'Error',
      description: message,
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
  };

  const clearError = () => {
    setError(null);
  };

  const errorContextValue = { error, showError, clearError };
  const responseContextValue = useResponse();

  return (
    <ErrorContext.Provider
      value={{ ...errorContextValue, ...responseContextValue }}
    >
      {children}
    </ErrorContext.Provider>
  );
};
