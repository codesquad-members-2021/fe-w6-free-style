import { useEffect } from 'react';
import axios from 'axios';

function useAsync(deps = []) {
  const request = `/domestic-init.json`;
  const fetchData = async () => {
    const response = await axios.get(request);
    const data = response.data.stats;
    console.table(data);
    return data;
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, deps);

  return fetchData;
}

export default useAsync;
