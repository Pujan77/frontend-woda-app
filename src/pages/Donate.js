import React, { useState } from 'react';
import { CheckoutBT } from '../components';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Formik, Field, Form } from 'formik';

const Donate = () => {
  const [enabled, setEnabled] = useState(null);
  const [message, setMessage] = useState(null);
  const [allInfo, setAllInfo] = useState(null);
  const [priceAmount, setPriceAmount] = useState(0);
  const handleSubmit = values => {
    // Handle form submission here
    console.log(values);
    let d = {
      email: values.email,
      body: {
        amount: values.amount,
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
      },
    };
    setAllInfo(d);
    setPriceAmount(values.amount);
    setEnabled(true);
  };

  const validateEmail = value => {
    let error;
    if (!value) {
      error = 'Email is required';
    }
    return error;
  };
  const validateText = value => {
    let error;
    if (!value) {
      error = 'Field is required';
    }
    return error;
  };

  const validateAmount = value => {
    let error;
    if (!value) {
      error = 'Amount is required';
    }
    return error;
  };

  return (
    <Flex align="center" justify="center">
      <Flex
        height={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Donate for a cause</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              Donate for change.
            </Text>
          </Stack>
          {message && (
            <Alert status="success">
              <AlertIcon />
              {message}
            </Alert>
          )}
          {!enabled && (
            <Formik
              initialValues={{
                email: '',
                amount: '',
                firstName: '',
                lastName: '',
                phone: '',
              }}
              onSubmit={handleSubmit}
            >
              {props => (
                <Form>
                  <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
                    <Box flex={1}>
                      <Field name="firstName" validate={validateText}>
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.firstName && form.touched.firstName
                            }
                          >
                            <FormLabel htmlFor="firstName">
                              First Name
                            </FormLabel>
                            <Input {...field} type="firstName" id="firstName" />
                            <FormErrorMessage>
                              {form.errors.firstName}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Box>
                    <Box flex={1}>
                      <Field name="lastName" validate={validateText}>
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.lastName && form.touched.lastName
                            }
                          >
                            <FormLabel htmlFor="lastName">Last Name</FormLabel>
                            <Input {...field} type="lastName" id="lastName" />
                            <FormErrorMessage>
                              {form.errors.lastName}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Box>
                  </Stack>

                  <Field name="email" validate={validateEmail}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.email && form.touched.email}
                      >
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input {...field} type="email" id="email" />
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
                    <Box flex={1}>
                      <Field name="amount" validate={validateAmount}>
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.amount && form.touched.amount
                            }
                          >
                            <FormLabel htmlFor="amount">Amount $</FormLabel>
                            <Input {...field} type="number" id="amount" />
                            <FormErrorMessage>
                              {form.errors.amount}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Box>
                    <Box flex={1}>
                      <Field name="phone" validate={validateAmount}>
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.phone && form.touched.phone}
                          >
                            <FormLabel htmlFor="phone">Phone</FormLabel>
                            <Input {...field} type="text" id="phone" />
                            <FormErrorMessage>
                              {form.errors.phone}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Box>
                  </Stack>

                  <Button
                    type="submit"
                    marginTop={'10px'}
                    onClick={props.handleSubmit}
                    isDisabled={!props.isValid || props.isSubmitting}
                  >
                    Confirm
                  </Button>
                </Form>
              )}
            </Formik>
          )}

          {enabled && allInfo && (
            <CheckoutBT
              price={priceAmount}
              setEnabled={setEnabled}
              setMessage={setMessage}
              email={allInfo.email}
              bodyData={allInfo.body}
            />
          )}
        </Stack>
      </Flex>
    </Flex>
  );
};

export default Donate;
