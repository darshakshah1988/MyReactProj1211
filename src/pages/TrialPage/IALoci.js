import React from 'react';
import StudyLogic from '../../logic/study';
import ScatterPlot from '../../components/ScatterPlot';
import AutoSizer from '../../components/helpers/AutoSizer';
import DataTable from '../../components/DataTable';
import TabContent from '../../components/TabContent';

const plotConfig = {
  padding: 2,
  x: {
    path: 'chromosome',
    type: 'discrete',
    axis: {
      label: 'Independently Associated Loci',
    },
  },
  y: {
    path: 'negLogPVal',
    type: 'continuous',
    axis: {
      label: 'Neg.log.P-Value',
    },
  },
  // #TODO: Allow for custom color scales [red, green]
  markerColor: {
    path: 'color',
  },
  // #TODO: Check whether overflowing markers could be contained.
  markerSize: {
    path: 'beta',
  },
  // #TODO: Implement marker rotation.
  markerTooltip: {
    path: 'chromosome',
  },
};

const config = {
  chromosome: {
    type: 'multiSelect',
    path: 'chromosome',
    widget: false,
  },
  negLogPVal: {
    type: 'range',
    path: 'negLogPVal',
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
        columns: {},
        sortBy: 'pVal',
        order: 'desc',
        downloadFileStem: 'L2GTable',
      }}
    />
  ),
};

const IALoci = props => {
  const data = StudyLogic.standardizeIALoci(props);

  return <TabContent {...{ data, config, views }} />;
};

export default IALoci;
