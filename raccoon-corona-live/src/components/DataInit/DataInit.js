import axios from 'axios';
import React, { useEffect } from 'react';

function DataInit() {
  const request = `/domestic-init.json`;
  const fetchData = async () => {
    const response = await axios.get(request);
    const data = response.data.stats;
    console.log(data);
    return data;
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <div data={useEffect}></div>;
}

export default DataInit;
