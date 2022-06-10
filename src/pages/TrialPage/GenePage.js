import React from 'react';
import { loader } from 'graphql.macro';
import routed from '../../components/helpers/routed';
import GraphQLLoader from '../../components/GraphQLLoader';
import InnerPage from '../../components/InnerPage';
import L2GPage from './L2GPage';
import GeneMagmaPage from './GeneMagmaPage';
import LocusPage from './LocusPage';

const GENE_PAGE_QUERY = loader('../../queries/GenePageQuery.gql');

const Pre = ({ data, loading, error, style = {} }) => (
  <pre style={style}>
    {JSON.stringify({ data, loading, error }, null, '\t')}
  </pre>
);

const GenePage = ({ geneId }) => (
  <InnerPage
    {...{
      title: 'Gene Centric Page',
      tabs: {
        locustToGene: {
          label: 'Locus to Gene',
          component: () => (
            <GraphQLLoader query={GENE_PAGE_QUERY} variables={{ geneId }}>
              <L2GPage />
            </GraphQLLoader>
          ),
        },
        colocalization: {
          label: 'Gene Magma',
          component: () => (
            <GraphQLLoader query={GENE_PAGE_QUERY} variables={{ geneId }}>
              <GeneMagmaPage />
            </GraphQLLoader>
          ),
        },
        locus: {
          label: 'Locus',
          component: Pre,
        },
      },
    }}
  />
);

export default routed(GenePage);
