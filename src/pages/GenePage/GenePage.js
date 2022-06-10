import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { loader } from 'graphql.macro';
import queryString from 'query-string';
import _, { range } from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import { Query } from '@apollo/client/react/components';

import { SectionHeading } from '../../ot-ui-components';

import BasePage from '../BasePage';
import AssociatedStudiesTable from '../../components/AssociatedStudiesTable';
import ColocForGeneTable from '../../components/ColocForGeneTable';
import Header from './Header';

import './style.css';
import { Slider } from '@material-ui/core';
import { mount } from 'enzyme';
import RadarPlot from '../../components/RadarPlot';
import customAPI from '../../queries/CustomAPI';
const GENE_PAGE_QUERY = loader('../../queries/GenePageQuery.gql');

function hasGeneData(data) {
  return data && data.geneInfo;
}

function geneData(data) {
  return data.geneInfo;
}

function hasAssociatedStudies(data) {
  return data && data.studiesAndLeadVariantsForGeneByL2G;
}

function valuetext(value) {
  return `${value}°C`;
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

const radarPlotData = customAPI.getPlotData();
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
  handleTraitCategoryFilter = newTraitCategoryFilterValue => {
    const { traitCategoryFilter, ...rest } = this._parseQueryProps();
    const newQueryParams = {
      ...rest,
    };
    if (newTraitCategoryFilterValue && newTraitCategoryFilterValue.length > 0) {
      newQueryParams.traitCategoryFilter = newTraitCategoryFilterValue.map(
        d => d.value
      );
    }
    this._stringifyQueryProps(newQueryParams);
  };
  handleStudySourceFilter = newStudySourceFilterValue => {
    const { studySourceFilter, ...rest } = this._parseQueryProps();
    const newQueryParams = {
      ...rest,
    };
    if (newStudySourceFilterValue && newStudySourceFilterValue.length > 0) {
      newQueryParams.studySourceFilter = newStudySourceFilterValue.map(
        d => d.value
      );
    }
    this._stringifyQueryProps(newQueryParams);
  };
  handleColocSourceFilter = newColocSourceFilterValue => {
    const { colocSourceFilter, ...rest } = this._parseQueryProps();
    const newQueryParams = {
      ...rest,
    };
    if (newColocSourceFilterValue && newColocSourceFilterValue.length > 0) {
      newQueryParams.colocSourceFilter = newColocSourceFilterValue.map(
        d => d.value
      );
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
    if (queryProps.studySourceFilter) {
      queryProps.studySourceFilter = Array.isArray(queryProps.studySourceFilter)
        ? queryProps.studySourceFilter
        : [queryProps.studySourceFilter];
    }
    if (queryProps.colocSourceFilter) {
      queryProps.colocSourceFilter = Array.isArray(queryProps.colocSourceFilter)
        ? queryProps.colocSourceFilter
        : [queryProps.colocSourceFilter];
    }
    if (queryProps.traitCategoryFilter) {
      queryProps.traitCategoryFilter = Array.isArray(
        queryProps.traitCategoryFilter
      )
        ? queryProps.traitCategoryFilter
        : [queryProps.traitCategoryFilter];
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
      traitCategoryFilter: traitCategoryFilterUrl,
      studySourceFilter: studySourceFilterUrl,
      colocSourceFilter: colocSourceFilterUrl,
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

            const traitCategoryFilterOptions = _.sortBy(
              _.uniq(
                associatedStudiesFiltered.map(d => d.study.traitCategory)
              ).map(d => ({
                label: d,
                value: d,
                selected: traitCategoryFilterUrl
                  ? traitCategoryFilterUrl.indexOf(d) >= 0
                  : false,
              })),
              [d => !d.selected, 'value']
            );
            const traitCategoryFilterValue = traitCategoryFilterOptions.filter(
              d => d.selected
            );

            const studySourceFilterOptions = _.sortBy(
              _.uniq(associatedStudiesFiltered.map(d => d.study.source)).map(
                d => ({
                  label: d,
                  value: d,
                  selected: studySourceFilterUrl
                    ? studySourceFilterUrl.indexOf(d) >= 0
                    : false,
                })
              ),
              [d => !d.selected, 'value']
            );
            const studySourceFilterValue = studySourceFilterOptions.filter(
              d => d.selected
            );
            const colocSourceFilterOptions = _.sortBy(
              _.uniq(colocalisationsForGeneFiltered.map(d => d.qtlStudyId)).map(
                d => ({
                  label: d,
                  value: d,
                  selected: colocSourceFilterUrl
                    ? colocSourceFilterUrl.indexOf(d) >= 0
                    : false,
                })
              ),
              [d => !d.selected, 'value']
            );
            const colocSourceFilterValue = colocSourceFilterOptions.filter(
              d => d.selected
            );

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

            //console.log(associatedStudiesFiltered);
            let beta = [];

            associatedStudiesFiltered.forEach(e => {
              if (e.beta.betaCI != null) {
                beta.push(e.beta.betaCI);
              }
            });
            const filteredValues = _.sortBy(beta);
            let minBeta = filteredValues[0] || 0;
            let maxBeta = findHighest(filteredValues) || 0;

            const [betaSelection, setBetaSelection] = React.useState([
              minBeta,
              maxBeta,
            ]);

            const handleChange = (event, newValue) => {
              setBetaSelection(newValue);
            };

            const filteredData = associatedStudiesFiltered.filter(x => {
              if (x.beta['betaCI']) {
                if (
                  x.beta['betaCI'] >= betaSelection[0] &&
                  x.beta['betaCI'] <= betaSelection[1]
                ) {
                  return x;
                }
              }
            });
            function findLowest(data) {
              return 0;
            }
            function findHighest(data) {
              let length = data.length;
              return data[length - 1];
            }

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
                <h6>Beta:</h6>
                <span>{minBeta}</span>
                <Slider
                  className="sliderFilter"
                  value={betaSelection}
                  onChange={handleChange}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetext}
                  min={minBeta}
                  max={maxBeta}
                />
                <span>{maxBeta}</span>

                <AssociatedStudiesTable
                  loading={loading}
                  error={error}
                  data={filteredData}
                  geneId={geneId}
                  geneSymbol={symbol}
                  chromosome={chromosome}
                  position={Math.round((start + end) / 2)}
                  traitFilterValue={traitFilterValue}
                  traitFilterOptions={traitFilterOptions}
                  traitFilterHandler={this.handleTraitFilter}
                  traitCategoryFilterValue={traitCategoryFilterValue}
                  traitCategoryFilterOptions={traitCategoryFilterOptions}
                  traitCategoryFilterHandler={this.handleTraitCategoryFilter}
                  studySourceFilterValue={studySourceFilterValue}
                  studySourceFilterOptions={studySourceFilterOptions}
                  studySourceFilterHandler={this.handleStudySourceFilter}
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
                  colocSourceFilterValue={colocSourceFilterValue}
                  colocSourceFilterOptions={colocSourceFilterOptions}
                  colocSourceFilterHandler={this.handleColocSourceFilter}
                  filenameStem={`${geneId}-colocalising-studies`}
                />
                <RadarPlot
                  data={radarPlotData}
                  traitCategories={traitCategoryFilterOptions}
                />
              </React.Fragment>
            );
          }}
        </Query>
      </BasePage>
    );
  }
}

export default withStyles(styles)(GenePage);
