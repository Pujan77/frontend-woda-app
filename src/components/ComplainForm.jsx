import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Textarea,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { BsPersonFill, BsFillEnvelopeFill, BsPhone } from 'react-icons/bs';
import { publicComplain } from '../services/publicAPI';
import { useError, useResponse } from '../context/ErrorContext';

export default function ComplainForm() {
  const { showError } = useError();
  const { showSuccess } = useResponse();
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    typeOf: '',
  };

  const validateForm = values => {
    const errors = {};

    if (!values.firstName) {
      errors.firstName = 'First Name is required';
    }

    if (!values.lastName) {
      errors.lastName = 'Last Name is required';
    }

    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.phone) {
      errors.phone = 'Phone is required';
    }

    if (!values.message) {
      errors.message = 'Message is required';
    }

    if (!values.typeOf) {
      errors.typeOf = 'Type of is required';
    }

    return errors;
  };

  const handleSubmit = async (values, { resetForm }) => {
    // Handle form submission logic here
    let body = {
      firstName: values.firstName,
      lastName: values.lastName,
      typeOfComplain: values.typeOf,
      message: values.message,
    };
    try {
      let res = await publicComplain(
        `?email=${values.email}&phone=${values.phone}`,
        body
      );
      if (res) {
        showSuccess(res.data.message);
        resetForm();
      }
    } catch (error) {
      showError(error.response.data.error);
    }
  };

  return (
    <Flex align="center" justify="center" id="contact">
      <Box
        borderRadius="lg"
        m={{ base: 5, md: 16, lg: 10 }}
        p={{ base: 5, lg: 16 }}
      >
        <Box>
          <VStack spacing={{ base: 4, md: 8, lg: 20 }}>
            <Heading
              fontSize={{
                base: '4xl',
                md: '5xl',
              }}
            >
              Register your complaint
            </Heading>

            <Stack
              spacing={{ base: 4, md: 8, lg: 20 }}
              direction={{ base: 'column', md: 'row' }}
            >
              <Box
                bg={useColorModeValue('white', 'gray.700')}
                borderRadius="lg"
                p={8}
                color={useColorModeValue('gray.700', 'whiteAlpha.900')}
                shadow="base"
              >
                <Formik
                  initialValues={initialValues}
                  validate={validateForm}
                  onSubmit={handleSubmit}
                >
                  <Form>
                    <VStack spacing={5}>
                      <Field name="firstName">
                        {({ field }) => (
                          <FormControl isRequired>
                            <FormLabel>Name</FormLabel>
                            <InputGroup>
                              <InputLeftElement children={<BsPersonFill />} />
                              <Input
                                {...field}
                                type="text"
                                placeholder="First Name"
                              />
                            </InputGroup>
                          </FormControl>
                        )}
                      </Field>
                      <ErrorMessage name="firstName" component="div" />

                      <Field name="lastName">
                        {({ field }) => (
                          <FormControl isRequired>
                            <FormLabel>Last Name</FormLabel>
                            <InputGroup>
                              <InputLeftElement children={<BsPersonFill />} />
                              <Input
                                {...field}
                                type="text"
                                placeholder="Last Name"
                              />
                            </InputGroup>
                          </FormControl>
                        )}
                      </Field>
                      <ErrorMessage name="lastName" component="div" />

                      <Field name="email">
                        {({ field }) => (
                          <FormControl isRequired>
                            <FormLabel>Email</FormLabel>
                            <InputGroup>
                              <InputLeftElement
                                children={<BsFillEnvelopeFill />}
                              />
                              <Input
                                {...field}
                                type="email"
                                placeholder="Your Email"
                              />
                            </InputGroup>
                          </FormControl>
                        )}
                      </Field>
                      <ErrorMessage name="email" component="div" />

                      <Field name="phone">
                        {({ field }) => (
                          <FormControl isRequired>
                            <FormLabel>Phone</FormLabel>
                            <InputGroup>
                              <InputLeftElement children={<BsPhone />} />
                              <Input
                                {...field}
                                type="text"
                                placeholder="Phone"
                              />
                            </InputGroup>
                          </FormControl>
                        )}
                      </Field>
                      <ErrorMessage name="phone" component="div" />
                      <Field name="typeOf">
                        {({ field }) => (
                          <FormControl isRequired>
                            <FormLabel>Type of complaint</FormLabel>
                            <InputGroup>
                              <Field as="select" {...field}>
                                <option value="">Select Type</option>
                                <option value="Service">Service</option>
                                <option value="Website">Website</option>
                                <option value="Notification">
                                  Notification
                                </option>
                                <option value="Other">Other</option>
                              </Field>
                            </InputGroup>
                          </FormControl>
                        )}
                      </Field>
                      <ErrorMessage name="typeOf" component="div" />
                      <Field name="message">
                        {({ field }) => (
                          <FormControl isRequired>
                            <FormLabel>Message</FormLabel>
                            <Textarea
                              {...field}
                              placeholder="Your Message"
                              rows={6}
                              resize="none"
                            />
                          </FormControl>
                        )}
                      </Field>
                      <ErrorMessage name="message" component="div" />

                      <Button
                        type="submit"
                        colorScheme="blue"
                        bg="blue.400"
                        color="white"
                        _hover={{
                          bg: 'blue.500',
                        }}
                        isFullWidth
                      >
                        Send Message
                      </Button>
                    </VStack>
                  </Form>
                </Formik>
              </Box>
            </Stack>
          </VStack>
        </Box>
      </Box>
    </Flex>
  );
}
