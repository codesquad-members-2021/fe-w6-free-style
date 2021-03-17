import React, { useEffect } from 'react';
import axios from 'axios';

function Axios() {
  const ApiDefault = {
    url: 'http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson',
    serviceKey: '%2FhhlLesgYTFlmemw61qq1MG2h987yaf2g8fl0JC2fcXPPUrrAH%2BgpzsyvjLfnuPUfaq5MLQhCmTqgOtWXNELuw%3D%3D',
  };
  const param = {
    serviceKey: '%2FhhlLesgYTFlmemw61qq1MG2h987yaf2g8fl0JC2fcXPPUrrAH%2BgpzsyvjLfnuPUfaq5MLQhCmTqgOtWXNELuw%3D%3D',
    pageNo: 1,
    numOfRows: 10,
    startCreateDt: 20200310,
    endCreateDt: 20200315,
  };

  const queryParam = new URLSearchParams(param);
  console.log(queryParam.toString());
  const test = `${ApiDefault.url}?${queryParam.toString()}`;

  const request = `?serviceKey=${ApiDefault.serviceKey}&${queryParam.toString()}`;
  // const request = `${test}`;
  console.log(request);
  console.log(test);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(request);
      console.log(response);

      return response;
    };

    fetchData();
  }, []);

  return <div>Raccoon</div>;
}

export default Axios;
