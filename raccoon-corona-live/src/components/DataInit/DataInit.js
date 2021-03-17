import React, { useEffect } from 'react';
import axios from 'axios';

function DataInit() {
  useEffect(() => {
    const request = `/domestic-init.json`;
    const fetchData = async () => {
      const response = await axios.get(request);
      console.table(response.data.stats);
      return response;
    };
    fetchData();
  });

  return <div></div>;
}

export default DataInit;
