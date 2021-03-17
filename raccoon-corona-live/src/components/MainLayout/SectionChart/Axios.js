import React, { useEffect } from 'react';
import axios from 'axios';

function Axios() {
  const requestDefault = {
    path: '/openapi/service/rest/Covid19/getCovid19InfStateJson',
    serviceKey: '%2FhhlLesgYTFlmemw61qq1MG2h987yaf2g8fl0JC2fcXPPUrrAH%2BgpzsyvjLfnuPUfaq5MLQhCmTqgOtWXNELuw%3D%3D',
  };
  const param = {
    pageNo: 1,
    numOfRows: 10,
    startCreateDt: 20200310,
    endCreateDt: 20200315,
  };

  const queryParam = new URLSearchParams(param);

  const request = `${requestDefault.path}?serviceKey=${requestDefault.serviceKey}&${queryParam.toString()}`;

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(request);
      console.log(res.data.response.body.items.item);
      const data = res.data.response.body.items.item;
      return data;
    };

    fetchData();
  }, []);

  return <div>Raccoon</div>;
}

export default Axios;
