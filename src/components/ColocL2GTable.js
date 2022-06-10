import React from 'react';
import * as d3 from 'd3';
// import mixColor from '../services/mixColour';
import chroma from 'chroma-js';
import { range } from '@laufire/utils/collection';

import {
  Link,
  OtTableRF,
  DataDownloader,
  significantFigures,
  commaSeparate,
} from '../ot-ui-components';

const getMarker = (start, end, stepSize) => {
  const marker = range(start, end, stepSize);
  return marker;
};
const markers = marker => <div>-{marker.toFixed(1)}</div>;

const tableColumns = [
  {
    id: 'gene.symbol',
    label: 'Gene',
    comparator: (a, b) => d3.ascending(a.gene.symbol, b.gene.symbol),
    renderCell: d => <Link to={`/gene/${d.gene.id}`}>{d.gene.symbol}</Link>,
  },
  {
    id: 'yProbaModel',
    label: 'Overall L2G score',
    tooltip:
      'Overall evidence linking gene to this study using all features. Score range [0, 1].',
    comparator: (a, b) => d3.ascending(a.yProbaModel, b.yProbaModel),
    renderCell: d => (
      <div
        style={{
          backgroundColor: chroma.mix(
            '#FFFFCC',
            '#003366',
            d.yProbaModel,
            'lch'
          ),
          color: d.yProbaModel < 0.4 ? '#666633' : '#ffffff',
        }}
      >
        {significantFigures(d.yProbaModel)}
      </div>
    ),
  },
  {
    id: 'yProbaPathogenicity',
    label: 'Variant Pathogenicity',
    tooltip:
      'Evidence linking gene to this study including variant pathogenicity features only. Score range [0, 1].',
    comparator: (a, b) =>
      d3.ascending(a.yProbaPathogenicity, b.yProbaPathogenicity),
    renderCell: d => (
      <div
        style={{
          backgroundColor: chroma.mix(
            '#FFFFCC',
            '#003366',
            d.yProbaPathogenicity,
            'lch'
          ),
          color: d.yProbaPathogenicity < 0.4 ? '#666633' : '#ffffff',
        }}
      >
        {significantFigures(d.yProbaPathogenicity)}
      </div>
    ),
  },
  {
    id: 'yProbaDistance',
    label: 'Distance',
    tooltip:
      'Evidence linking gene to this study including distance features only. Score range [0, 1].',
    comparator: (a, b) => d3.ascending(a.yProbaDistance, b.yProbaDistance),
    renderCell: d => (
      <div
        style={{
          backgroundColor: chroma.mix(
            '#FFFFCC',
            '#003366',
            d.yProbaDistance,
            'lch'
          ),
          color: d.yProbaDistance < 0.4 ? '#666633' : '#ffffff',
        }}
      >
        {significantFigures(d.yProbaDistance)}
      </div>
    ),
  },
  {
    id: 'yProbaMolecularQTL',
    label: 'QTL Coloc',
    tooltip:
      'Evidence linking gene to this study including molecular trait colocalisation features only. Score range [0, 1].',
    comparator: (a, b) =>
      d3.ascending(a.yProbaMolecularQTL, b.yProbaMolecularQTL),
    renderCell: d => (
      <div
        style={{
          backgroundColor: chroma.mix(
            '#FFFFCC',
            '#003366',
            d.yProbaMolecularQTL,
            'lch'
          ),
          color: d.yProbaMolecularQTL < 0.4 ? '#666633' : '#ffffff',
        }}
      >
        {significantFigures(d.yProbaMolecularQTL)}
      </div>
    ),
  },
  {
    id: 'yProbaInteraction',
    label: 'Chromatin Interaction',

    tooltip:
      'Evidence linking gene to this study including chromatin interaction features only. Score range [0, 1].',
    comparator: (a, b) =>
      d3.ascending(a.yProbaInteraction, b.yProbaInteraction),
    renderCell: d => (
      <div
        style={{
          backgroundColor: chroma.mix(
            '#FFFFCC',
            '#003366',
            d.yProbaInteraction,
            'lch'
          ),
          color: d.yProbaInteraction < 0.4 ? '#666633' : '#ffffff',
        }}
      >
        {significantFigures(d.yProbaInteraction)}
      </div>
    ),
  },
];

const getDownloadColumns = () => {
  return [
    { id: 'geneSymbol', label: 'Gene' },
    { id: 'geneId', label: 'Gene ID' },
    { id: 'yProbaModel', label: 'Overall L2G score' },

    { id: 'yProbaPathogenicity', label: 'Variant Pathogenicity' },
    { id: 'yProbaDistance', label: 'Distance' },
    { id: 'yProbaMolecularQTL', label: 'QTL Coloc' },
    { id: 'yProbaInteraction', label: 'Chromatin Interaction' },
  ];
};

const getDownloadRows = data => {
  return data.map(d => ({
    geneSymbol: d.gene.symbol,
    geneId: d.gene.id,
    yProbaModel: d.yProbaModel,
    yProbaPathogenicity: d.yProbaPathogenicity,
    yProbaDistance: d.yProbaDistance,
    yProbaMolecularQTL: d.yProbaMolecularQTL,
    yProbaInteraction: d.yProbaInteraction,
  }));
};

const ColocL2GTable = ({ loading, error, fileStem, data }) => {
  return (
    <React.Fragment>
      <DataDownloader
        tableHeaders={getDownloadColumns()}
        rows={getDownloadRows(data)}
        fileStem={fileStem}
      />
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ flexGrow: 1 }}>
          <OtTableRF
            loading={loading}
            error={error}
            columns={tableColumns}
            data={data}
            sortBy="yProbaModel"
            order="desc"
            headerGroups={[
              { colspan: 2, label: '' },
              {
                colspan: 4,
                label: 'Partial L2G scores',
              },
              { colspan: 3, label: '' },
            ]}
          />
        </div>
        <div
          style={{
            width: '2rem',
            backgroundImage:
              'linear-gradient(to top, #FFFFCC, lightgreen, navy)',
            marginLeft: '1rem',
            marginBottom: '1rem',
          }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            marginBottom: '1rem',
          }}
        >
          {getMarker(0, 1.1, 0.2)
            .reverse()
            .map(markers)}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ColocL2GTable;
