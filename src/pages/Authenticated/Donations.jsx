import React, { useEffect, useState } from 'react';
import { getAllDonationsAdmin } from '../../services/authAPI';
import DonationCard from '../../components/DonationCard';
import { Box, Flex } from '@chakra-ui/react';

const Donations = () => {
  const [donationData, setDonationData] = useState(null);

  const getDonation = async () => {
    try {
      let res = await getAllDonationsAdmin();
      setDonationData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const chunkData = (data, size) =>
    data.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / size);

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [];
      }

      resultArray[chunkIndex].push(item);

      return resultArray;
    }, []);

  const donationListing = () => {
    const rows = chunkData(donationData, 4);

    return rows.map((row, rowIndex) => (
      <Flex key={rowIndex}>
        {row.map((donation, colIndex) => (
          <Box key={colIndex} flex="1" p={2}>
            <DonationCard data={donation} />
          </Box>
        ))}
      </Flex>
    ));
  };

  useEffect(() => {
    getDonation();
  }, []);

  return <div>{donationData && donationListing()}</div>;
};

export default Donations;
