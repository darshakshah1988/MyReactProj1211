import React from 'react';
import { loader } from 'graphql.macro';
import routed from '../../components/helpers/routed';
import GraphQLLoader from '../../components/GraphQLLoader';
import InnerPage from '../../components/InnerPage';
import IALoci from './IALoci';
import GWASColoReco from './GWASColoReco';
import ColocAnlysisData from './ColocAnlysisData';
import './style.css';
const STUDY_PAGE_QUERY = loader('../../queries/StudyPageQuery.gql');
const STUDY_LOCUS_PAGE_QUERY = loader('../../queries/StudyLocusPageQuery.gql');
const GWAS_REGIONAL_QUERY = loader('../../queries/GWASRegionalQuery.gql');

const StudyLocusPage = ({ studyId, variantId }) => (
  <InnerPage
    {...{
      title: 'Study Locus Page',
      tabs: {
        iaLoci: {
          label: 'Independently Associated Loci',
          component: () => (
            <GraphQLLoader query={STUDY_PAGE_QUERY} variables={{ studyId }}>
              <IALoci />
            </GraphQLLoader>
          ),
        },
        gwasColoReco: {
          label: 'GWAS CR',
          component: () => (
            <GraphQLLoader
              query={STUDY_LOCUS_PAGE_QUERY}
              variables={{
                studyId,
                variantId,
                chromosome: '19',
                start: Number('44658822'),
                end: Number('45158822'),
              }}
            >
              <GWASColoReco />
            </GraphQLLoader>
          ),
        },
        credibleSetOverlap: {
          label: 'Credible Set Overlap',
          component: () => (
            <GraphQLLoader
              query={GWAS_REGIONAL_QUERY}
              variables={{
                studyId,
                variantId,
                chromosome: '19',
                start: Number('44658822'),
                end: Number('45158822'),
              }}
            >
              <pre />
            </GraphQLLoader>
          ),
        },
        locustToGene2: {
          label: 'Colocalisation Analysis(heatmap)',
          component: () => (
            <>
              <GraphQLLoader
                query={STUDY_LOCUS_PAGE_QUERY}
                variables={{
                  studyId,
                  variantId,
                  chromosome: '1',
                  start: Number('54803079'),
                  end: Number('55303079'),
                }}
              >
                <ColocAnlysisData />
              </GraphQLLoader>
            </>
          ),
        },
      },
    }}
  />
);

export default routed(StudyLocusPage);
