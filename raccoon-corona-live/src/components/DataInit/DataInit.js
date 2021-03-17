import React, { useEffect } from 'react';
import axios from 'axios';

function DataInit() {
  useEffect(() => {
    const request = `/domestic-init.json`;
    const fetchData = async () => {
      const response = await axios.get(request);
      console.log(response);
      return response;
    };
    fetchData();
  });

  return <div>Raccoon</div>;
}

export default DataInit;
