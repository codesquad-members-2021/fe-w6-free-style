import React, { useEffect } from 'react';
import axios from 'axios';
import XMLParser from 'react-xml-parser';

function Axios() {
  useEffect(() => {
    const fetchData = async () => {
      const url =
        'http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson?serviceKey=%2FhhlLesgYTFlmemw61qq1MG2h987yaf2g8fl0JC2fcXPPUrrAH%2BgpzsyvjLfnuPUfaq5MLQhCmTqgOtWXNELuw%3D%3D&pageNo=1&numOfRows=10&startCreateDt=20200310&endCreateDt=20200315';
      const response = await axios.get(url);
      console.log(response);
      const data = new XMLParser();

      return data;
    };

    fetchData();
  }, []);
  return <div>Raccoon</div>;
}

export default Axios;
