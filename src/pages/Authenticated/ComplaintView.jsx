import React, { useEffect, useState } from 'react';
import { getAllComplaintsAdmin } from '../../services/authAPI';
import { ComplainViewComponent } from '../../components';

const ComplaintView = () => {
  const [complainData, setComplainData] = useState(null);
  const getComplain = async () => {
    try {
      let res = await getAllComplaintsAdmin();
      setComplainData(res.data.data.complains);
    } catch (error) {
      console.log(error);
    }
  };
  const viewComplain = () => {
    return complainData.map((complain, i) => (
      <ComplainViewComponent
        data={complain}
        key={i}
        getComplain={getComplain}
      />
    ));
  };
  useEffect(() => {
    getComplain();
  }, []);

  return <div>{complainData && viewComplain()}</div>;
};

export default ComplaintView;
