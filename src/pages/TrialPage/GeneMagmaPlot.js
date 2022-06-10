import React, { useState } from 'react';
import getData from '../../mocks/getData';
import GeneLogic from '../../logic/gene';
import FilterBar from '../../components/FilterBar';
import MagmaPlot from './MagmaPlot';

const filterConfig = {
  traitCategory: {
    type: 'multiSelect',
    path: '/traitCategory',
    label: 'Trait Category',
  },
  nLogPVal: {
    type: 'range',
    path: '/nLogPVal',
    label: '-Log P-Value',
  },
  adjustedPValue: {
    type: 'range',
    path: '/zStat',
    label: 'Z-Value',
  },
};

const resolve = async (fn, cb) => cb(await fn());

const WithData = ({ query, Component }) => {
  const [data, setData] = useState();
  resolve(() => getData(query), response => setData(response?.data));
  return data ? <Component data={data} /> : null;
};

const FilterTrial = ({ data }) => {
  const [filters, setFilters] = useState({});
  const standardizedData = GeneLogic.standardizeMagma({ data });
  const filteredData = GeneLogic.filter({
    data: standardizedData,
    config: filterConfig,
    filterValues: filters,
  });

  return (
    <>
      <FilterBar
        {...{
          config: filterConfig,
          data: standardizedData,
          onChange: setFilters,
        }}
      />
      Filtered count: {filteredData.length}
      <MagmaPlot
        {...{
          data: filteredData,
        }}
      />
    </>
  );
};

const TrialPage = () => (
  <WithData
    {...{
      query: 'gene-magma',
      Component: FilterTrial,
    }}
  />
);

export default TrialPage;
