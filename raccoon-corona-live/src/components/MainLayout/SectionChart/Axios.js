import React from 'react';
import axios from 'axios';
import XMLParser from 'react-xml-parser';

function Axios() {
  const fetchData = async () => {
    const config = {
      headers: { 'Access-Control-Allow-Origin': '*' },
    };
    const response = await axios.get(
      'http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson?serviceKey=%2FhhlLesgYTFlmemw61qq1MG2h987yaf2g8fl0JC2fcXPPUrrAH%2BgpzsyvjLfnuPUfaq5MLQhCmTqgOtWXNELuw%3D%3D&pageNo=1&numOfRows=10&startCreateDt=20200310&endCreateDt=20200315',
      config
    );
    const text = response.text();
    const data = new XMLParser().parserFromString(text);
    console.log(data);
    return data;
  };

  fetchData();
  return <div>Raccoon</div>;
}

export default Axios;
