import React, { useEffect, useState } from 'react';
import { getAllNoticeAdmin } from '../../services/authAPI';
import { Box, Flex } from '@chakra-ui/react';
import EventListOneByOne from '../../components/EventListOneByOne';
import { PublishNoticeForm } from '../../components';

const Notices = () => {
  const [eventData, setEventData] = useState(null);
  const first = async () => {
    try {
      let res = await getAllNoticeAdmin();
      setEventData(res.data.notices);
    } catch (error) {
      console.log(error);
    }
  };
  const showEventData = () => {
    if (eventData) {
      return eventData.map((event, i) => {
        return <EventListOneByOne event={event} key={i} />;
      });
    }
  };
  useEffect(() => {
    first();
  }, []);

  return (
    <Flex>
      <Box flex={1}>
        <PublishNoticeForm />
      </Box>
      <Box maxH={'100vh'} overflowY={'auto'} flex={1}>
        {eventData && showEventData()}
      </Box>
    </Flex>
  );
};

export default Notices;
