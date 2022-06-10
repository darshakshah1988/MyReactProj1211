import React, { useEffect, useState } from 'react';
import GeneSearch from '../components/GeneSearch';
import { loader } from 'graphql.macro';
import GraphQLLoader from '../components/GraphQLLoader';
const GENE_QUERY = loader('../queries/SearchQuery.gql');

function GeneSearchPage() {
  const variables = {
    queryString: ' ',
  };
  const getQueryString = data => {
    variables.queryString = data;
  };

  return (
    <GraphQLLoader query={GENE_QUERY} variables={variables}>
      <GeneSearch que={getQueryString} />
    </GraphQLLoader>
  );
}

export default GeneSearchPage;
