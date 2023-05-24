import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Stack,
  Button,
} from '@chakra-ui/react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { publicSignupForNotice } from '../services/publicAPI';
import { useError, useResponse } from '../context/ErrorContext';

export default function EventForm({ id, onClose }) {
  const { showError } = useError();
  const { showSuccess } = useResponse();
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };
  const validate = values => {
    const errors = {};

    if (!values.firstName) {
      errors.firstName = 'First Name is required';
    }
    if (!values.lastName) {
      errors.lastName = 'Last Name is required';
    }
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.phone) {
      errors.phone = 'Phone number is required';
    }

    return errors;
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      let res = await publicSignupForNotice(id, values);
      showSuccess(res.data.message);
      onClose();
    } catch (error) {
      showError(error.response.data.error);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, values }) => (
        <Form>
          <Flex align={'center'} justify={'center'} bg={'gray.20'}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
              <Stack spacing={4}>
                <HStack>
                  <Box>
                    <FormControl id="firstName" isRequired>
                      <FormLabel>First Name</FormLabel>
                      <Field as={Input} type="text" name="firstName" />
                      <ErrorMessage
                        name="firstName"
                        component="div"
                        color="red.500"
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl id="lastName">
                      <FormLabel>Last Name</FormLabel>
                      <Field as={Input} type="text" name="lastName" />
                      <ErrorMessage
                        name="lastName"
                        component="div"
                        color="red.500"
                      />
                    </FormControl>
                  </Box>
                </HStack>
                <FormControl id="email" isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Field as={Input} type="email" name="email" />
                  <ErrorMessage name="email" component="div" color="red.500" />
                </FormControl>
                <FormControl id="phone" isRequired>
                  <FormLabel>Phone number</FormLabel>
                  <Field as={Input} type="text" name="phone" />
                  <ErrorMessage name="phone" component="div" color="red.500" />
                </FormControl>
                <Stack spacing={10} pt={2}>
                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                    loadingText="Submitting"
                    size="lg"
                    _hover={{
                      bg: 'blue.500',
                    }}
                  >
                    Participate
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </Flex>
        </Form>
      )}
    </Formik>
  );
}
