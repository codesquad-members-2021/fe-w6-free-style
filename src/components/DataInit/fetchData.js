import axios from 'axios';

async function fetchData() {
  const request = `/domestic-init.json`;
  const response = await axios.get(request);
  const data = response.data.stats;
  console.table(data);
  return data;
}

export default fetchData;
