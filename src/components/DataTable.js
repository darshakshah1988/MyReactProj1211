import React from 'react';
import { map, values } from '@laufire/utils/collection';
import { ascending, onProp } from '@laufire/utils/sorters';
import { DataDownloader, OtTableRF } from '../ot-ui-components';

const getColumns = ({ columns }) => {
  console.log('columns', columns);
  return values(
    map(columns, ({ label, renderCell }, id) => ({
      id,
      label,
      comparator: onProp(id, ascending),
      renderCell: renderCell || (d => d[id]),
    }))
  );
};

const DataTable = props => (
  <OtTableRF
    {...{
      ...props,
      columns: getColumns(props),
    }}
  />
);

export default DataTable;
