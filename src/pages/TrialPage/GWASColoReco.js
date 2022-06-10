import React from 'react';
import StudyLogic from '../../logic/study';
import ScatterPlot from '../../components/ScatterPlot';
import AutoSizer from '../../components/helpers/AutoSizer';
import DataTable from '../../components/DataTable';
import TabContent from '../../components/TabContent';

const plotConfig = {
  padding: 2,
  defaultMarkerSize: 10,
  x: {
    path: 'indexVariant',
    type: 'discrete',
    axis: {
      label: 'Lead Variant',
    },
  },
  y: {
    path: 'log2h4h3',
    type: 'continuous',
    axis: {
      label: 'log2(H4/H3)',
    },
  },
  markerColor: {
    path: 'traitReported',
    type: 'discrete',
    legendSize: 0.2,
  },
  markerTooltip: {
    path: 'indexVariant',
  },
};

const config = {
  beta: {
    type: 'range',
    path: 'beta',
    label: 'Beta',
  },
  indexVariant: {
    type: 'multiSelect',
    path: 'indexVariant',
    widget: false,
  },
  log2h4h3: {
    type: 'range',
    path: 'log2h4h3',
    widget: false,
  },
};

const views = {
  plot: ({ data, onChange }) => (
    <AutoSizer>
      <ScatterPlot
        {...{
          data: data,
          config: plotConfig,
          onChange: onChange,
        }}
      />
    </AutoSizer>
  ),
  table: ({ data }) => (
    <DataTable
      {...{
        data: data,
        columns: {},
        sortBy: 'pVal',
        order: 'desc',
        downloadFileStem: 'L2GTable',
      }}
    />
  ),
};

const GWASColoReco = props => {
  const data = StudyLogic.standardizeGWASColo(props);

  return <TabContent {...{ data, config, views }} />;
};

export default GWASColoReco;
