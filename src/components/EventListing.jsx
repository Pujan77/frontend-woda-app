import React, { useEffect, useState } from 'react';
import { getAllPublicNotices } from '../services/publicAPI';
import EventListOneByOne from './EventListOneByOne';

export default function EventListing() {
  const [eventData, setEventData] = useState(null);
  const getData = async () => {
    try {
      let res = await getAllPublicNotices();
      if (res) {
        setEventData(res.data.notices);
      }
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
    getData();
  }, []);

  return <>{eventData && showEventData()}</>;
}
