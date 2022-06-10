import React from 'react';
import { Query } from '@apollo/client/react/components';
import { isArray } from '@laufire/utils/reflection';

const toArray = input => (isArray(input) ? input : [input]);

const GraphQLLoader = ({ children, query, variables }) => (
  <Query query={query} variables={variables}>
    {props => {
      const { loading, error } = props;
      const index = loading ? 2 : error ? 1 : 0;
      const Component = toArray(children).filter(React.isValidElement)[index];

      return Component ? React.cloneElement(Component, props) : null;
    }}
  </Query>
);

export default GraphQLLoader;
