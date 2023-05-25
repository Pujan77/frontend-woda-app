import React from 'react';
import { Formik, Form, Field, useFormikContext } from 'formik';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import TimePicker from 'react-time-picker';
import RichTextEditorInput from './RichTextEditorInput';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import { convertTo12HourFormat, formatDateYMD } from '../utils';
import { submitNoticeAdmin } from '../services/authAPI';
import { useError, useResponse } from '../context/ErrorContext';
export default function PublishNoticeForm() {
  const { showError } = useError();
  const { showSuccess } = useResponse();
  const initialValues = {
    typeOfNotice: '',
    typeOf: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    details: '',
    viewPage: '',
    publishedDate: formatDateYMD(Date.now()),
  };

  const handleSubmit = async (values, { resetForm }) => {
    // Handle form submission
    values.typeOf = values.typeOfNotice;
    try {
      let res = await submitNoticeAdmin(values);
      resetForm();
      showSuccess(res.data.message);
    } catch (error) {
      showError('Some error occured');
    }
  };

  return (
    <Flex minH={'100vh'} bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'100%'}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          Publish Notice
        </Heading>

        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ setFieldValue, resetForm }) => (
            <Form>
              <Field name="typeOfNotice">
                {({ field }) => (
                  <FormControl id="typeOfNotice" isRequired>
                    <FormLabel>Type of Notice</FormLabel>
                    <Select {...field}>
                      <option value="trainings">Trainings</option>
                      <option value="campaign">Campaign</option>
                      <option value="garbage">Garbage</option>
                      <option value="sanitation">Sanitation</option>
                    </Select>
                  </FormControl>
                )}
              </Field>

              <Field name="startDate">
                {({ field }) => (
                  <FormControl id="startDate" isRequired>
                    <FormLabel>Start Date</FormLabel>
                    <Input type="date" {...field} />
                  </FormControl>
                )}
              </Field>

              <Field name="startTime">
                {({ field }) => (
                  <FormControl id="startTime" isRequired>
                    <FormLabel>Start Time</FormLabel>
                    <TimePicker
                      name={field.name}
                      value={field.value}
                      clockIcon={false}
                      closeClock={false}
                      clearIcon={null}
                      onChange={time => {
                        const event = {
                          target: {
                            name: field.name,
                            value: convertTo12HourFormat(time),
                          },
                        };
                        field.onChange(event);
                      }}
                    />
                  </FormControl>
                )}
              </Field>

              <Field name="endDate">
                {({ field }) => (
                  <FormControl id="endDate" isRequired>
                    <FormLabel>End Date</FormLabel>
                    <Input type="date" {...field} />
                  </FormControl>
                )}
              </Field>
              <Field name="endTime">
                {({ field }) => (
                  <FormControl id="endTime" isRequired>
                    <FormLabel>End Time</FormLabel>
                    <TimePicker
                      name={field.name}
                      value={field.value}
                      clockIcon={false}
                      closeClock={false}
                      clearIcon={null}
                      onChange={time => {
                        const event = {
                          target: {
                            name: field.name,
                            value: convertTo12HourFormat(time),
                          },
                        };
                        field.onChange(event);
                      }}
                    />
                  </FormControl>
                )}
              </Field>
              <Field name="details">
                {({ field }) => (
                  <FormControl id="details" isRequired>
                    <FormLabel>Details</FormLabel>
                    <Input as="textarea" {...field} />
                  </FormControl>
                )}
              </Field>
              <FormLabel>View Page</FormLabel>
              <RichTextEditorInput
                setFieldValue={setFieldValue}
                label="viewPage"
                name="viewPage"
              />
              <Button
                type="submit"
                bg={'blue.400'}
                color={'white'}
                w="full"
                _hover={{
                  bg: 'blue.500',
                }}
                marginTop={'5px'}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Stack>
    </Flex>
  );
}
