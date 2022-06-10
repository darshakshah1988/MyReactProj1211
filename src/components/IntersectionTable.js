import React, { Fragment } from 'react';
import calculateIntersection from '../logic/calculateIntersection';
import {
  DataDownloader,
  OtTableRF,
  commaSeparate,
  significantFigures,
  Autocomplete,
  Link,
} from '../ot-ui-components';
import { generateComparator } from '../utils';
import { pvalThreshold } from '../constants';
import StudyLocusLink from './StudyLocusLink';
const getDownloadColumns = () => {
  return [
    { id: 'studyId', label: 'Study ID' },
    { id: 'traitReported', label: 'TraitReported' },
    { id: 'pubAuthor', label: 'Author' },
    { id: 'pubDate', label: 'Publish Date' },
    // { id: 'nInitial', label: 'Study N Initial' },
    // { id: 'nReplication', label: 'Study N Replication' },
    // { id: 'nCases', label: 'Study N Cases' },
    // { id: 'indexVariantId', label: 'Index Variant ID' },
    // { id: 'indexVariantRsId', label: 'Index Variant RSID' },
    // { id: 'pval', label: 'P-Value' },
    // { id: 'beta', label: 'Beta' },
    // { id: 'betaCILower', label: 'Beta CI Lower' },
    // { id: 'betaCIUpper', label: 'Beta CI Upper' },
    // { id: 'oddsRatio', label: 'Odds Ratio' },
    // { id: 'oddsRatioCILower', label: 'Odds Ratio CI Lower' },
    // { id: 'oddsRatioCIUpper', label: 'Odds Ratio CI Upper' },
    // { id: 'yProbaModel', label: 'L2G Pipeline Score' },
  ];
};

const getDownloadRows = rows => {
  return rows.map(row => ({
    studyId: row.studyId,
    traitReported: row.traitReported,
    pubAuthor: row.pubAuthor,
    pubDate: row.pubDate,
    // nInitial: row.study.nInitial,
    // nReplication: row.study.nReplication,
    // nCases: row.study.nCases,
    // indexVariantId: row.variant.id,
    // indexVariantRsId: row.variant.rsId,
    // pval: row.pval,
    // beta: row.beta.betaCI,
    // betaCILower: row.beta.betaCILower,
    // betaCIUpper: row.beta.betaCIUpper,
    // oddsRatio: row.odds.oddsCI,
    // oddsRatioCILower: row.odds.oddsCILower,
    // oddsRatioCIUpper: row.odds.oddsCIUpper,
    // yProbaModel: row.yProbaModel,
  }));
};
const tableColumns = () => [
  {
    id: 'study.studyId',
    label: 'Study ID',
    comparator: generateComparator(d => d.studyId),
    renderCell: rowData => (
      <Link to={`/study/${rowData.studyId}`}>{rowData.studyId}</Link>
    ),
  },

  {
    id: 'study.traitReported',
    label: 'Trait',
    comparator: generateComparator(d => d.traitReported),
    renderCell: rowData => {
      // truncate long trait names for display
      return rowData.traitReported && rowData.traitReported.length > 100 ? (
        <span title={rowData.traitReported}>
          {rowData.traitReported.substring(0, 100)}
          &hellip;
        </span>
      ) : (
        rowData.traitReported
      );
    },
  },
  {
    id: 'study.pubDate',
    label: 'Date of Publication',
    renderCell: rowData => {
      return rowData.pubDate;
    },
  },
  {
    id: 'study.pubAuthor',
    label: 'Publication',
    comparator: generateComparator(d => d.pubAuthor),
    renderCell: rowData => {
      // Some studies don't have a pmid so need to avoid dead links
      const url = rowData.pmid
        ? `http://europepmc.org/article/MED/${rowData.pmid.split(':')[1]}`
        : null;
      //console.log(rowData.study.pubAuthor);
      const pub = `${rowData.pubAuthor}`;
      return url ? (
        <Link to={url} external>
          {pub}
        </Link>
      ) : (
        pub
      );
    },
  },
];
const IntersectionTable = ({
  loading,
  error,
  filenameStem,
  data,
  geneId,
  geneSymbol,
  chromosome,
  position,
  traitFilterValue,
  traitFilterOptions,
  traitFilterHandler,
  authorFilterValue,
  authorFilterOptions,
  authorFilterHandler,
}) => (
  <Fragment>
    <OtTableRF
      loading={loading}
      error={error}
      filters
      columns={tableColumns()}
      data={data}
    />
  </Fragment>
);

export default IntersectionTable;
