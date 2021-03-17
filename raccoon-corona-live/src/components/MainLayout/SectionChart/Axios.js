import React, { useEffect } from 'react';
import axios from 'axios';

function Axios() {
  function CreateDate(year, month, date) {
    const newDate = new Date(year, month, date);
    const getYear = newDate.getFullYear();
    const getMonth = () => {
      const month = newDate.getMonth();
      return month.toString().length === 1 ? `0${month}` : `1${month}`;
    };
    const getDate = newDate.getDate();
    const createdDate = `${getYear}${getMonth()}${getDate}`;
    console.log(createdDate);
    return createdDate;
  }

  const requestDefault = {
    path: '/openapi/service/rest/Covid19/getCovid19InfStateJson',
    serviceKey: '%2FhhlLesgYTFlmemw61qq1MG2h987yaf2g8fl0JC2fcXPPUrrAH%2BgpzsyvjLfnuPUfaq5MLQhCmTqgOtWXNELuw%3D%3D',
  };
  const param = {
    pageNo: 1,
    numOfRows: 10,
    startCreateDt: CreateDate(2021, 3, 12),
    endCreateDt: CreateDate(2021, 3, 17),
  };

  const queryParam = new URLSearchParams(param);

  const request = `${requestDefault.path}?serviceKey=${requestDefault.serviceKey}&${queryParam.toString()}`;

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(request);
      console.table(res.data.response.body.items.item);
      const data = res.data.response.body.items.item;
      return data;
    };

    fetchData();
  });

  return <div></div>;
}

export default Axios;
