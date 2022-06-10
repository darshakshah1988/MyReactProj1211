import React from 'react';
import GeneLogic from '../../logic/gene';
import ScatterPlot from '../../components/ScatterPlot';
import AutoSizer from '../../components/helpers/AutoSizer';
import DataTable from '../../components/DataTable';
import TabContent from '../../components/TabContent';
import { DataDownloader } from '../../ot-ui-components';

const plotConfig = {
  padding: 2,
  x: {
    path: 'yProbaModel',
    type: 'continuous',
    axis: {
      label: 'Locus to Gene Pipeline score',
    },
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
    legendSize: 0.2,
  },
  markerShape: 'square',
  markerSize: {
    path: 'studyRatio',
  },
  markerTooltip: {
    path: 'traitCategory',
  },
  referenceLine: {
    y: 7.3,
  },
};

const config = {
  source: {
    type: 'multiSelect',
    path: 'source',
    label: 'Source',
  },
  traitCategory: {
    type: 'multiSelect',
    path: 'traitCategory',
    label: 'Trait Category',
  },
  traitReported: {
    type: 'multiSelect',
    path: 'traitReported',
    label: 'Trait',
  },
  yProbaModel: {
    type: 'range',
    path: 'yProbaModel',
    widget: false,
  },
  negLogPVal: {
    type: 'range',
    path: 'negLogPVal',
    widget: false,
  },
  studyYear: {
    type: 'range',
    path: 'studyYear',
    label: 'Year',
  },
  beta: {
    type: 'range',
    path: 'beta',
    label: 'Beta',
  },
};
const getDownloadColumns = () => {
  return [
    {
      id: 'pVal',
      label: 'P-Val',
    },
    {
      id: 'negLogPVal',
      label: '-Log P-Val',
    },
    {
      id: 'yProbaModel',
      label: 'L2G pipeline score',
    },
    {
      id: 'studyID',
      label: 'Study ID',
    },
    {
      id: 'traitReported',
      label: 'Trait Reported',
    },
    {
      id: 'author',
      label: 'Author',
    },
    {
      id: 'variantID',
      label: 'Lead Variant',
    },
    {
      id: 'source',
      label: 'Source',
    },
  ];
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
    <>
      <DataDownloader
        tableHeaders={getDownloadColumns()}
        rows={data}
        fileStem={'L2GTable'}
      />
      <DataTable
        {...{
          data: data,
          columns: {
            pVal: {
              label: 'P-Val',
            },
            negLogPVal: {
              label: '-Log P-Val',
              renderCell: d => d.negLogPVal.toFixed(2),
            },
            yProbaModel: {
              label: 'L2G pipeline score',
              renderCell: d => d.yProbaModel.toFixed(2),
            },
            studyID: {
              label: 'Study ID',
            },
            traitReported: {
              label: 'Trait Reported',
            },
            author: {
              label: 'Author',
            },
            variantID: {
              label: 'Lead Variant',
            },
            source: {
              label: 'Source',
              renderCell: d => <b>{d.source}</b>,
            },
          },
          sortBy: 'pVal',
          order: 'desc',
          downloadFileStem: 'L2GTable',
        }}
      />
    </>
  ),
};

const L2GPage = props => {
  const data = GeneLogic.standardizeL2G(props);

  return <TabContent {...{ data, config, views }} />;
};

export default L2GPage;
