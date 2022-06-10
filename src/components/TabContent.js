import React, { useState } from 'react';
import MainContent from './InnerPage/MainContent';
import FilterBar from './FilterBar';
import filterData from '../logic/filterData';
import filterMeta from '../logic/filterMeta';

const TabContent = props => {
  const meta = filterMeta(props);
  const [filters, setFilters] = useState(meta);
  const patchFilters = patch => setFilters({ ...filters, ...patch });
  const filteredData = filterData({ ...props, filters });

  return (
    <MainContent {...{ ...props, data: filteredData, onChange: patchFilters }}>
      <FilterBar
        {...{
          ...props,
          meta,
          filters,
          onChange: patchFilters,
        }}
      />
      <>{`Filtered\xa0count:\xa0${filteredData.length}\xa0/\xa0${
        props.data.length
      }`}</>
    </MainContent>
  );
};

export default TabContent;
