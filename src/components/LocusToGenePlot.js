import React, { Component } from 'react';
import * as d3 from 'd3';
import _ from 'lodash';

import theme from './theme';
import { withContentRect } from 'react-measure';
import { Autocomplete, DownloadSVGPlot } from '../ot-ui-components';

import locusToGeneData from '../logic/locusToGeneData';
import SummaryDetails from './summaryDetails';

import AlleleFrequencyBarChart from './AlleleFrequencyBarChart';
import Grid from '@material-ui/core/Grid';
class locusToGene extends Component {
  constructor(props) {
    super(props);
    this.svgRef = React.createRef();
    this.x = d3.scaleLinear();
    this.y = d3.scaleLinear();
    this.colourScale = d3.scaleOrdinal();
  }
  state = { show: false };
  summaryData = [];

  componentDidMount() {
    //this._render();
  }

  componentDidUpdate() {
    this._render();
  }

  render() {
    const {
      measureRef,
      traitFilterOptions,
      traitFilterValue,
      traitFilterHandler,
      traitCategoryFilterValue,
      traitCategoryFilterOptions,
      traitCategoryFilterHandler,
      studySourceFilterValue,
      studySourceFilterOptions,
      studySourceFilterHandler,
    } = this.props;
    const { outerWidth, outerHeight } = this._dimensions();
    const { show } = this.state;
    const dropdown = (
      <Grid container justifyContent="space-between" spacing={2}>
        <Grid item>
          <Autocomplete
            options={studySourceFilterOptions}
            value={studySourceFilterValue}
            handleSelectOption={studySourceFilterHandler}
            placeholder="Study Source"
            multiple
            wide
          />
        </Grid>
        <Grid item>
          <Autocomplete
            options={traitCategoryFilterOptions}
            value={traitCategoryFilterValue}
            handleSelectOption={traitCategoryFilterHandler}
            placeholder="Trait Category"
            multiple
            wide
          />
        </Grid>
        <Grid item>
          <Autocomplete
            options={traitFilterOptions}
            value={traitFilterValue}
            handleSelectOption={traitFilterHandler}
            placeholder="Trait"
            multiple
            wide
          />
        </Grid>
      </Grid>
    );
    return (
      <DownloadSVGPlot
        left={dropdown}
        svgContainer={this.svgRef}
        filenameStem={`LocusToGene`}
      >
        <div className="chart-container">
          <div ref={measureRef} className="chart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={outerWidth}
              height={outerHeight}
              ref={this.svgRef}
            />
            <button
              onClick={e => {
                this._resetZoom(e, this);
              }}
            >
              Reset
            </button>
          </div>

          {show && (
            <SummaryDetails
              data={this.summaryData}
              show={show}
              detailsHeading="L2G Summary"
            />
          )}
        </div>
      </DownloadSVGPlot>
    );
  }
  _dimensions() {
    const { contentRect } = this.props;
    const { width: outerWidth } = contentRect.bounds;
    const outerHeight = 440;
    return { outerWidth, outerHeight };
  }

  _resetZoom(e, resetValues) {
    resetValues.x
      .domain(
        d3.extent(resetValues.props.data, d => {
          return d.yProbaModel;
        })
      )
      .nice();
    resetValues.y
      .domain(
        d3.extent(resetValues.props.data, d => {
          return -Math.log10(d.pval);
        })
      )
      .nice();
  }
  _render() {
    const { x, y, colourScale } = this;
    const { outerWidth, outerHeight } = this._dimensions();
    const { data } = this.props;
    if (!outerWidth || !outerHeight) {
      return;
    }

    d3.select(this.svgRef.current)
      .selectAll('*')
      .remove();

    const width = outerWidth - theme.margin.right - theme.margin.left;
    const height = outerHeight - theme.margin.top - theme.margin.bottom;
    const svg = d3.select(this.svgRef.current);

    const filters = [];
    const meta = locusToGeneData({ data, filters });

    const clip = svg
      .append('defs')
      .append('svg:clipPath')
      .attr('id', 'clip')
      .append('svg:rect')
      .attr('width', width)
      .attr('height', height);

    x.domain(
      d3.extent([Math.min(meta.minyProbaModel), Math.max(meta.maxyProbaModel)])
    )
      .range([0, width])
      .nice();

    y.domain(d3.extent([Math.min(meta.minLogPval), Math.max(meta.maxLogPval)]))
      .range([height, 0])
      .nice();

    // Customization
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);
    // Customization
    const xAxisGrid = d3.axisBottom(x);
    const yAxisGrid = d3.axisLeft(y);

    const brushended = function() {
      var s = d3.event.selection;
      if (!s) {
        if (!idleTimeout) return (idleTimeout = setTimeout(idled, idleDelay));
        x.domain(
          d3.extent(data, d => {
            return d.yProbaModel;
          })
        ).nice();
        y.domain(
          d3.extent(data, d => {
            return -Math.log10(d.pval);
          })
        ).nice();
      } else {
        x.domain([s[0][0], s[1][0]].map(x.invert, x));
        y.domain([s[1][1], s[0][1]].map(y.invert, y));
        chart.select('.brush').call(brush.move, null);
      }
      zoom();
    };

    function idled() {
      idleTimeout = null;
    }

    const zoom = function() {
      var t = chart.transition().duration(750);
      svg
        .select('#xAxis')
        .transition(t)
        .call(xAxis);
      svg
        .select('#yAxis')
        .transition(t)
        .call(yAxis);
      svg
        .select('#xAxisGrid')
        .transition(t)
        .call(xAxisGrid);
      svg
        .select('#yAxisGrid')
        .transition(t)
        .call(yAxisGrid);
      chart
        .selectAll('circle')
        .transition(t)
        .attr('cx', d => {
          return x(d.yProbaModel);
        })
        .attr('cy', d => {
          return y(-Math.log10(d.pval));
        });
    };
    var brush = d3
        .brush()
        .extent([[0, 0], [width, height]])
        .on('end', brushended),
      idleTimeout,
      idleDelay = 350;

    colourScale.domain(meta.traitCategories).range(d3.schemeCategory10);

    // Add X axis label:
    svg
      .append('text')
      .attr('text-anchor', 'end')
      .attr('x', width / 2 + theme.margin.left)
      .attr('y', height + theme.margin.top + 50)
      .text('Locus to Gene Pipeline score');

    // Y axis label:
    svg
      .append('text')
      .attr('text-anchor', 'end')
      .attr('transform', 'rotate(-90)')
      .attr('y', 20)
      .attr('x', -theme.margin.top - height / 2 + 40)
      .text('Neg.log.Pvalue');

    svg
      .append('g')
      .attr(
        'transform',
        'translate(' +
          theme.margin.left +
          ',' +
          (height + theme.margin.top + 5) +
          ')'
      )
      .attr('id', 'xAxis')
      .attr('class', 'axis-color')
      .call(xAxis)
      .style('fill', '#e5ecf6');

    svg
      .append('g')
      .attr(
        'transform',
        'translate(' +
          theme.margin.left +
          ',' +
          (height + theme.margin.top + 5) +
          ')'
      )
      .style('fill', '#e5ecf6')
      .attr('id', 'xAxisGrid')
      .attr('class', 'axis-color')
      .call(xAxisGrid.tickSize(-height).tickFormat(''));
    svg
      .append('g')
      .attr(
        'transform',
        'translate(' + theme.margin.left + ',' + (theme.margin.top + 5) + ')'
      )
      .attr('id', 'yAxis')
      .call(yAxis)
      .style('fill', '#e5ecf6')
      .attr('class', 'axis-color');
    svg
      .append('g')
      .attr(
        'transform',
        'translate(' + theme.margin.left + ',' + (theme.margin.top + 5) + ')'
      )
      .attr('id', 'yAxisGrid')
      .attr('class', 'axis-color')
      .call(yAxisGrid.tickSize(-width).tickFormat(''));
    // Define the div for the tooltip
    const tooltip = d3
      .select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)
      .style('position', 'absolute');

    const chart = svg
      .append('g')
      .attr(
        'transform',
        'translate(' + theme.margin.left + ',' + theme.margin.phewasTop + ')'
      )
      .attr('clip-path', 'url(#clip)');

    chart
      .append('g')
      .attr('class', 'brush')
      .call(brush);
    // Add dots
    chart
      .selectAll('dot')
      .data(data)
      .enter()
      .append('circle')
      .style('opacity', '0.6')
      .style('stroke', '#fff')
      .style('stroke-width', 1)
      .style('cursor', 'pointer')
      .style('fill', d => {
        return colourScale(d.study.traitCategory);
      })
      .attr('cx', d => {
        return x(d.yProbaModel);
      })
      .attr('cy', d => {
        return y(-Math.log10(d.pval));
      })
      .attr('r', d => {
        return Math.log(d.study.nInitial / meta.minNInitial) + 1;
      })
      .on('click', d => {
        this.summaryData = d;
        this.setState({ show: true });
      });
  }
}

export default withContentRect('bounds')(locusToGene);
