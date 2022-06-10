import React from 'react';
import GeneLogic from '../../logic/gene';
import ScatterPlot from '../../components/ScatterPlot';
import AutoSizer from '../../components/helpers/AutoSizer';
import TabContent from '../../components/TabContent';

const plotConfig = {
  x: {
    path: 'traitCategory',
    type: 'discrete',
    axis: {
      label: 'Colocalization',
    },
  },
  xJitter: {
    path: 'xJitter',
  },
  y: {
    path: 'negLogPVal',
    type: 'continuous',
    axis: {
      label: 'Neg.log.P-Value',
    },
  },
  markerColor: {
    path: 'traitCategory',
    type: 'discrete',
  },
  referenceLine: {
    y: 7.3,
  },
};

const config = {
  traitCategory: {
    type: 'multiSelect',
    path: 'traitCategory',
    label: 'Trait Category',
  },
  negLogPVal: {
    type: 'range',
    path: 'negLogPVal',
    label: '-Log P-Value',
  },
  adjustedPValue: {
    type: 'range',
    path: 'zStat',
    label: 'Z-Value',
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
  table: () => <div>Table</div>,
};

const GeneMagmaPage = props => {
  const data = GeneLogic.standardizeMagma(props);

  return <TabContent {...{ data, config, views }} />;
};

export default GeneMagmaPage;
