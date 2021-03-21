import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { personBox } from '../../const';

function PersonTypeList() {
  const [data, setData] = useState(personBox);

  const useFetch = () => {
    async function fetchData() {
      const request = `/domestic-init.json`;
      const response = await axios.get(request);
      const data = response.data.stats;
      const {
        cases: [caseNumber, caseChange],
        deaths: [deathsNumber, deathsChange],
        recovered: [recoveredNumber, recoveredChange],
        tests: [testsNumber, testsChange],
      } = data;

      setData([
        {
          name: '확진자',
          number: caseNumber,
          change: caseChange,
          color: 'rgb(235, 83, 116)',
          background: 'rgba(235, 83, 116, 0.082)',
        },
        {
          name: '사망자',
          number: deathsNumber,
          change: deathsChange,
          color: 'rgb(136, 136, 136)',
          background: 'rgb(39, 43, 56)',
        },
        {
          name: '완치자',
          number: recoveredNumber,
          change: recoveredChange,
          color: 'rgb(23, 138, 23)',
          background: 'rgba(22, 171, 22, 0.16)',
        },
        {
          name: '검사자',
          number: testsNumber,
          change: testsChange,
          color: 'rgb(86, 115, 235)',
          background: 'rgba(86, 115, 235, 0.082)',
        },
      ]);
    }

    useEffect(() => {
      fetchData();
    }, []);
  };

  useFetch();

  return (
    <div className="Person__Type__List flex-row center">
      {data.map(({ name, number, change, color, background }, idx) => (
        <PersonTypeBox //
          type={name}
          number={number}
          change={change}
          color={color}
          background={background}
          key={idx}
        />
      ))}
    </div>
  );
}

function PersonTypeBox({ type, number, change, color, background }) {
  const style = { color, background };
  return (
    <div className="Person__Type__Box flex-column flex center">
      <div className="Person__Type flex-row flex">{type}</div>
      <div className="Person__Number flex-row flex" style={style}>
        {number}
      </div>
      <div className="Person__Change flex-row flex" style={style}>
        {change}
      </div>
    </div>
  );
}

export default PersonTypeList;
