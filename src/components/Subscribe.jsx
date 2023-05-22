import React, { useState } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Stack,
  Button,
  Heading,
  Text,
  useColorMode,
  Checkbox,
} from '@chakra-ui/react';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import {
  editSubscribeToContent,
  subscribeToContent,
} from '../services/publicAPI';
import { useError, useResponse } from '../context/ErrorContext';
// import { CountrySelect } from 'your-country-select-package'; // Replace 'your-country-select-package' with the actual package name

export default function Subscribe() {
  const { showError } = useError();
  const { showSuccess } = useResponse();
  const [isEditDisabled, setIsEditDisabled] = useState(true);
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    garbage: false,
    sanitation: false,
    trainings: false,
    campaign: false,
    countryCode: '977',
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    let body = {
      firstName: values.firstName,
      lastName: values.lastName,
      trainings: values.trainings,
      campaign: values.campaign,
      garbage: values.garbage,
      sanitation: values.sanitation,
    };
    let res = await subscribeToContent(
      `?email=${values.email}&phone=${values.countryCode + values.phone}`,
      body
    );
    if (res) {
      if (res.status === 200) {
        showSuccess(res.data.message);
        resetForm();
      } else if (res.status === 207) {
        resetForm();
        showError(res.data.message);
      } else {
        showError('Some error occured. Try again later.');
      }
    }
    setSubmitting(false);
  };

  const handleEdit = async (values, resetForm) => {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone'];

    // Check if all required fields have values
    const allFieldsFilled = requiredFields.every(field => values[field]);

    // Update the disabled state of the "Edit" button
    setIsEditDisabled(!allFieldsFilled);

    if (allFieldsFilled) {
      let body = {
        firstName: values.firstName,
        lastName: values.lastName,
        trainings: values.trainings,
        campaign: values.campaign,
        garbage: values.garbage,
        sanitation: values.sanitation,
      };
      try {
        let res = await editSubscribeToContent(
          `?email=${values.email}&phone=${values.countryCode + values.phone}`,
          body
        );

        // Handle the response and reset the form
        if (res) {
          console.log(res);
          if (res.status === 200) {
            showSuccess(res.data.message);
            resetForm();
          } else if (res.status === 207) {
            resetForm();
            showError(res.data.message);
          }
        }
      } catch (error) {
        if (error.response.status === 404) {
          showError('User not registered to edit.');
        } else {
          showError('Some error occurred. Try again later.');
        }
      }
    }
  };

  const validate = values => {
    const errors = {};

    if (!values.firstName) {
      errors.firstName = 'Required';
    }

    if (!values.lastName) {
      errors.lastName = 'Required';
    }

    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.phone) {
      errors.phone = 'Required';
    } else if (!/^\+?\d{10,}$/i.test(values.phone)) {
      errors.phone = 'Invalid phone number';
    }

    return errors;
  };

  const { colorMode } = useColorMode();
  const boxBgColor = colorMode === 'light' ? 'white' : 'gray.700';

  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validate={validate}
      >
        {({ isSubmitting, values, resetForm }) => (
          <Form>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
              <Stack align={'center'}>
                <Heading fontSize={'4xl'} textAlign={'center'}>
                  Get Connected
                </Heading>
                <Text fontSize={'lg'} color={'gray.600'}>
                  to get all the notifications in email as your convenience,
                </Text>
              </Stack>
              <Box rounded={'lg'} bg={boxBgColor} boxShadow={'lg'} p={8}>
                <Stack spacing={4}>
                  <HStack>
                    <Box>
                      <FormControl id="firstName" isRequired>
                        <FormLabel>First Name</FormLabel>
                        <Field name="firstName">
                          {({ field }) => <Input {...field} type="text" />}
                        </Field>
                        <ErrorMessage
                          name="firstName"
                          component={Text}
                          color="red.500"
                        />
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl id="lastName" isRequired>
                        <FormLabel>Last Name</FormLabel>
                        <Field name="lastName">
                          {({ field }) => <Input {...field} type="text" />}
                        </Field>
                        <ErrorMessage
                          name="lastName"
                          component={Text}
                          color="red.500"
                        />
                      </FormControl>
                    </Box>
                  </HStack>
                  <FormControl id="email" isRequired>
                    <FormLabel>Email address</FormLabel>
                    <Field name="email">
                      {({ field }) => <Input {...field} type="email" />}
                    </Field>
                    <ErrorMessage
                      name="email"
                      component={Text}
                      color="red.500"
                    />
                  </FormControl>
                  <FormControl id="phone" isRequired>
                    <FormLabel>Phone</FormLabel>
                    <HStack>
                      {/* <CountrySelect
                        name="countryCode"
                        onChange={value => {
                          // Set the selected country code to Formik field
                          setFieldValue('countryCode', value);
                        }}
                      /> */}
                      <Field name="phone">
                        {({ field }) => <Input {...field} type="text" />}
                      </Field>
                    </HStack>
                    <ErrorMessage
                      name="phone"
                      component={Text}
                      color="red.500"
                    />
                  </FormControl>
                  <FormLabel>Notification Category</FormLabel>
                  <Field name="garbage">
                    {({ field }) => (
                      <FormControl display="flex" alignItems="center">
                        <Checkbox id="garbage" {...field} />
                        <FormLabel htmlFor="garbage" ml={2} mb={0}>
                          Garbage Collection
                        </FormLabel>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="sanitation">
                    {({ field }) => (
                      <FormControl display="flex" alignItems="center">
                        <Checkbox id="sanitation" {...field} />
                        <FormLabel htmlFor="sanitation" ml={2} mb={0}>
                          Sanitation Programs
                        </FormLabel>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="trainings">
                    {({ field }) => (
                      <FormControl display="flex" alignItems="center">
                        <Checkbox id="trainings" {...field} />
                        <FormLabel htmlFor="trainings" ml={2} mb={0}>
                          Trainings
                        </FormLabel>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="campaign">
                    {({ field }) => (
                      <FormControl display="flex" alignItems="center">
                        <Checkbox id="campaign" {...field} />
                        <FormLabel htmlFor="campaign" ml={2} mb={0}>
                          campaign
                        </FormLabel>
                      </FormControl>
                    )}
                  </Field>
                  <Stack spacing={10} pt={2}>
                    <Button
                      type="submit"
                      isLoading={isSubmitting}
                      loadingText="Submitting"
                      size="lg"
                      bg={'blue.400'}
                      color={'white'}
                      _hover={{
                        bg: 'blue.500',
                      }}
                    >
                      Subscribe (First Time)
                    </Button>
                  </Stack>
                  <Stack spacing={10} pt={2}>
                    <Button
                      size="lg"
                      bg={isEditDisabled === false ? `blue.200` : `gray.300`}
                      color={'white'}
                      _hover={{
                        bg: 'gray.400',
                      }}
                      onClick={() => handleEdit(values, resetForm)}
                      disabled={isEditDisabled}
                    >
                      Edit (Change preferences)
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </Form>
        )}
      </Formik>
    </Flex>
  );
}
