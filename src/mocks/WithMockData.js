import React, { useState } from 'react';
import getData from './getData';

const resolve = async (fn, cb) => cb(await fn());

const WithMockData = ({ query, Component }) => {
  const [data, setData] = useState();
  resolve(() => getData(query), response => setData(response?.data));

  return data ? <Component data={data} /> : null;
};

export default WithMockData;
