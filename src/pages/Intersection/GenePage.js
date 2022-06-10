import React from 'react';
import { Helmet } from 'react-helmet';
import { loader } from 'graphql.macro';
import queryString from 'query-string';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import { Query } from '@apollo/client/react/components';

import { SectionHeading } from '../../ot-ui-components';

import BasePage from '../BasePage';
import AssociatedStudiesTable from '../../components/AssociatedStudiesTable';
import ColocForGeneTable from '../../components/ColocForGeneTable';
import Header from './Header';
import Intersection from './Intersection';
import IntersectionTable from '../../components/IntersectionTable';
const GENE_PAGE_QUERY = loader('../../queries/GenePageQuery.gql');
const NEW_GEN_DATA_QUERY = loader('./NewGenDataQuery.gql');
function hasGeneData(data) {
  return data && data.geneInfo;
}

function geneData(data) {
  return data.geneInfo;
}

function hasAssociatedStudies(data) {
  return data && data.studiesAndLeadVariantsForGeneByL2G;
}

const styles = theme => {
  return {
    section: {
      height: '100%',
      padding: theme.sectionPadding,
    },
    geneSymbol: {
      display: 'inline-block',
    },
    locusLinkButton: {
      width: '248px',
      height: '60px',
    },
    locusIcon: {
      fill: 'white',
      width: '40px',
      height: '40px',
    },
    link: {
      textDecoration: 'none',
    },
    geneInfoItem: {
      width: '20%',
    },
    platformLink: {
      textAlign: 'center',
      textDecoration: 'none',
      color: '#5A5F5F',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    iconLink: {
      '&:hover': {
        fill: theme.palette.primary.dark,
      },
    },
  };
};

class GenePage extends React.Component {
  handleColocTraitFilter = newColocTraitFilterValue => {
    const { colocTraitFilter, ...rest } = this._parseQueryProps();
    const newQueryParams = {
      ...rest,
    };
    if (newColocTraitFilterValue && newColocTraitFilterValue.length > 0) {
      newQueryParams.colocTraitFilter = newColocTraitFilterValue.map(
        d => d.value
      );
    }
    this._stringifyQueryProps(newQueryParams);
  };
  handleTraitFilter = newTraitFilterValue => {
    const { traitFilter, ...rest } = this._parseQueryProps();
    const newQueryParams = {
      ...rest,
    };
    if (newTraitFilterValue && newTraitFilterValue.length > 0) {
      newQueryParams.traitFilter = newTraitFilterValue.map(d => d.value);
    }
    this._stringifyQueryProps(newQueryParams);
  };
  handleAuthorFilter = newFilterValue => {
    const { authorFilter, ...rest } = this._parseQueryProps();
    const newQueryParams = {
      ...rest,
    };
    if (newFilterValue && newFilterValue.length > 0) {
      newQueryParams.authorFilter = newFilterValue.map(d => d.value);
    }
    this._stringifyQueryProps(newQueryParams);
  };
  _parseQueryProps() {
    const { history } = this.props;
    const queryProps = queryString.parse(history.location.search);

    // single values need to be put in lists
    if (queryProps.colocTraitFilter) {
      queryProps.colocTraitFilter = Array.isArray(queryProps.colocTraitFilter)
        ? queryProps.colocTraitFilter
        : [queryProps.colocTraitFilter];
    }
    if (queryProps.traitFilter) {
      queryProps.traitFilter = Array.isArray(queryProps.traitFilter)
        ? queryProps.traitFilter
        : [queryProps.traitFilter];
    }
    if (queryProps.authorFilter) {
      queryProps.authorFilter = Array.isArray(queryProps.authorFilter)
        ? queryProps.authorFilter
        : [queryProps.authorFilter];
    }
    return queryProps;
  }
  _stringifyQueryProps(newQueryParams) {
    const { history } = this.props;
    history.replace({
      ...history.location,
      search: queryString.stringify(newQueryParams),
    });
  }
  render() {
    const { match } = this.props;
    const { geneId } = match.params;
    const {
      colocTraitFilter: colocTraitFilterUrl,
      traitFilter: traitFilterUrl,
      authorFilter: authorFilterUrl,
    } = this._parseQueryProps();
    return (
      <BasePage>
        <Header geneId={geneId} />
        <Query query={GENE_PAGE_QUERY} variables={{ geneId }}>
          {({ loading, error, data }) => {
            const isValidGene = hasGeneData(data, geneId);
            const gene = isValidGene ? geneData(data) : {};

            const colocalisationsForGene = data
              ? data.colocalisationsForGene
              : null;

            const colocalisationsForGeneFiltered = (
              colocalisationsForGene || []
            ).filter(
              d =>
                colocTraitFilterUrl
                  ? colocTraitFilterUrl.indexOf(d.study.traitReported) >= 0
                  : true
            );

            // all
            const associatedStudies =
              isValidGene && hasAssociatedStudies(data)
                ? data.studiesAndLeadVariantsForGeneByL2G
                : [];

            // filtered
            const associatedStudiesFiltered = associatedStudies.filter(d => {
              return (
                (traitFilterUrl
                  ? traitFilterUrl.indexOf(d.study.traitReported) >= 0
                  : true) &&
                (authorFilterUrl
                  ? authorFilterUrl.indexOf(d.study.pubAuthor) >= 0
                  : true)
              );
            });

            // filters
            const colocTraitFilterOptions = _.sortBy(
              _.uniq(
                colocalisationsForGeneFiltered.map(d => d.study.traitReported)
              ).map(d => ({
                label: d,
                value: d,
                selected: colocTraitFilterUrl
                  ? colocTraitFilterUrl.indexOf(d) >= 0
                  : false,
              })),
              [d => !d.selected, 'value']
            );
            const colocTraitFilterValue = colocTraitFilterOptions.filter(
              d => d.selected
            );
            const traitFilterOptions = _.sortBy(
              _.uniq(
                associatedStudiesFiltered.map(d => d.study.traitReported)
              ).map(d => ({
                label: d,
                value: d,
                selected: traitFilterUrl
                  ? traitFilterUrl.indexOf(d) >= 0
                  : false,
              })),
              [d => !d.selected, 'value']
            );
            const traitFilterValue = traitFilterOptions.filter(d => d.selected);
            const authorFilterOptions = _.sortBy(
              _.uniq(associatedStudiesFiltered.map(d => d.study.pubAuthor)).map(
                d => ({
                  label: d,
                  value: d,
                  selected: authorFilterUrl
                    ? authorFilterUrl.indexOf(d) >= 0
                    : false,
                })
              ),
              [d => !d.selected, 'value']
            );
            const authorFilterValue = authorFilterOptions.filter(
              d => d.selected
            );

            //DS
            let matchc = [];
            let finalData = [];
            let unsortedEntries = [];
            let i = 1;
            associatedStudiesFiltered.forEach(element => {
              colocalisationsForGeneFiltered.forEach(ele => {
                if (ele.study.studyId == element.study.studyId) {
                  let a = matchc.indexOf(ele.study.studyId);
                  if (a < 0) {
                    matchc.push(ele.study.studyId);
                    finalData.push({
                      studyId: ele.study.studyId,
                      traitReported: element.study.traitReported,
                      pubAuthor: ele.study.pubAuthor,
                      pubDate: element.study.pubDate,
                      pmid: ele.study.pmid,
                    });
                  }
                }
              });
              i = i + 1;
            });
            // console.log('total ' + i + ' values checked');
            // console.log(unsortedEntries);
            // console.log({
            //   associatedStudiesFiltered,
            //   colocalisationsForGeneFiltered,
            // });
            // console.log(finalData);

            //DS

            const { chromosome, start, end, symbol } = gene;
            return (
              <React.Fragment>
                <Helmet>
                  <title>{symbol}</title>
                </Helmet>
                <SectionHeading
                  heading="Associated studies: locus-to-gene pipeline"
                  subheading={`Which studies are associated with ${symbol}?`}
                  entities={[
                    {
                      type: 'study',
                      fixed: false,
                    },
                    {
                      type: 'gene',
                      fixed: true,
                    },
                  ]}
                />
                <AssociatedStudiesTable
                  loading={loading}
                  error={error}
                  data={associatedStudiesFiltered}
                  geneId={geneId}
                  geneSymbol={symbol}
                  chromosome={chromosome}
                  position={Math.round((start + end) / 2)}
                  traitFilterValue={traitFilterValue}
                  traitFilterOptions={traitFilterOptions}
                  traitFilterHandler={this.handleTraitFilter}
                  authorFilterValue={authorFilterValue}
                  authorFilterOptions={authorFilterOptions}
                  authorFilterHandler={this.handleAuthorFilter}
                  filenameStem={`${geneId}-associated-studies`}
                />
                <SectionHeading
                  heading="Associated studies: Colocalisation analysis"
                  subheading={`Which studies have evidence of colocalisation with molecular QTLs for ${symbol}?`}
                />
                <ColocForGeneTable
                  loading={loading}
                  error={error}
                  data={colocalisationsForGeneFiltered}
                  colocTraitFilterValue={colocTraitFilterValue}
                  colocTraitFilterOptions={colocTraitFilterOptions}
                  colocTraitFilterHandler={this.handleColocTraitFilter}
                  filenameStem={`${geneId}-colocalising-studies`}
                />
                <SectionHeading
                  heading="Intersection Venn Diagram"
                  subheading={`Shows common studies between above 2 tables.`}
                />
                <Intersection
                  loading={loading}
                  error={error}
                  data={{
                    colocalisationsForGeneFiltered,
                    associatedStudiesFiltered,
                    finalData,
                  }}
                />
                <SectionHeading
                  heading="Intersection Venn Diagram data table"
                  subheading={`Shows common studies between above 2 tables.`}
                />
                <IntersectionTable
                  loading={loading}
                  error={error}
                  data={finalData}
                />
              </React.Fragment>
            );
          }}
        </Query>
        {/* <Query query={NEW_GEN_DATA_QUERY} variables={{ geneId }}>
          {({ loading, error, data }) => {
            //console.log(data);
            const isValidGene = hasGeneData(data, geneId);
            const gene = isValidGene ? geneData(data) : {};
            const AllData = data
              ? data.studiesAndLeadVariantsForGeneByL2G
              : null;
            //console.log(AllData);
            const associatedStudies =
              isValidGene && hasAssociatedStudies(data)
                ? data.studiesAndLeadVariantsForGeneByL2G
                : [];
            const associatedStudiesFiltered = associatedStudies.filter(d => {
              return (
                (traitFilterUrl
                  ? traitFilterUrl.indexOf(d.study.traitReported) >= 0
                  : true) &&
                (authorFilterUrl
                  ? authorFilterUrl.indexOf(d.study.pubAuthor) >= 0
                  : true)
              );
            });
            return (
              <React.Fragment>
                <SectionHeading
                  heading="Common Studies between the Above 2 tables."
                  subheading={`Nothing to show here. Its a simple demo text.`}
                />
                <IntersectionTable
                  loading={loading}
                  data={associatedStudiesFiltered}
                />
              </React.Fragment>
            );
          }}
        </Query> */}
      </BasePage>
    );
  }
}

export default withStyles(styles)(GenePage);
