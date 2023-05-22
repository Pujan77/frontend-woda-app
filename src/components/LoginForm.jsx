import { Field, Form, Formik } from 'formik';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

export default function LoginForm() {
  const initialValues = {
    email: '',
    password: '',
    rememberMe: false,
  };

  const validate = values => {
    const errors = {};

    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.password) {
      errors.password = 'Password is required';
    }

    return errors;
  };

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      console.log(values);
      setSubmitting(false);
    }, 400);
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      width={'100%'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validate={validate}
      >
        {({ isSubmitting }) => (
          <Form>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
              <Stack align={'center'}>
                <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                <Text fontSize={'lg'} color={'gray.600'}>
                  to get access to your account.
                </Text>
              </Stack>
              <Box rounded={'lg'} boxShadow={'lg'} p={8}>
                <Stack spacing={4}>
                  <Field name="email">
                    {({ field, meta }) => (
                      <FormControl id="email">
                        <FormLabel>Email address</FormLabel>
                        <Input {...field} type="email" />
                        {meta.touched && meta.error && (
                          <Text color="red.500">{meta.error}</Text>
                        )}
                      </FormControl>
                    )}
                  </Field>
                  <Field name="password">
                    {({ field, meta }) => (
                      <FormControl id="password">
                        <FormLabel>Password</FormLabel>
                        <Input {...field} type="password" />
                        {meta.touched && meta.error && (
                          <Text color="red.500">{meta.error}</Text>
                        )}
                      </FormControl>
                    )}
                  </Field>
                  <Stack spacing={10}>
                    <Stack
                      direction={{ base: 'column', sm: 'row' }}
                      align={'start'}
                      justify={'space-between'}
                    >
                      <Link color={'blue.400'}>Forgot password?</Link>
                    </Stack>
                    <Button
                      type="submit"
                      bg={'blue.400'}
                      color={'white'}
                      _hover={{
                        bg: 'blue.500',
                      }}
                      isLoading={isSubmitting}
                    >
                      Sign in
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
