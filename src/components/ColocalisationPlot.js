import React, { Component } from 'react';

import * as d3 from 'd3';
import _ from 'lodash';

import theme from './theme';
import { withContentRect } from 'react-measure';
import { Autocomplete, DownloadSVGPlot } from '../ot-ui-components';
import SummaryDetails from './summaryDetails';
class colocalisationPlot extends Component {
  constructor(props) {
    super(props);
    this.svgRef = React.createRef();
    this.x = d3.scaleBand();
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
      colocSourceFilterValue,
      colocSourceFilterOptions,
      colocSourceFilterHandler,
      loading,
      error,
      data,
    } = this.props;
    const { show } = this.state;
    const { outerWidth, outerHeight } = this._dimensions();
    const dropdown = (
      <Autocomplete
        options={colocSourceFilterOptions}
        value={colocSourceFilterValue}
        handleSelectOption={colocSourceFilterHandler}
        placeholder="Source"
        multiple
        wide
      />
    );
    return (
      <DownloadSVGPlot
        left={dropdown}
        svgContainer={this.svgRef}
        filenameStem={`ColocalisationPlot`}
      >
        <div className="chart-container">
          <div ref={measureRef} className="chart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1000"
              height={outerHeight}
              ref={this.svgRef}
            />
          </div>
          {show && (
            <SummaryDetails
              data={this.summaryData}
              show={show}
              detailsHeading="Colocolisation node details"
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
  _render() {
    const { x, y, colourScale } = this;
    const { outerWidth, outerHeight } = this._dimensions();
    const { data, colocSourceFilterOptions } = this.props;
    if (!outerWidth || !outerHeight) {
      return;
    }
    d3.select(this.svgRef.current)
      .selectAll('*')
      .remove();

    const width = outerWidth - theme.margin.right - theme.margin.left;
    const height = outerHeight - theme.margin.top - theme.margin.bottom;
    const svg = d3.select(this.svgRef.current);
    if (data.length > 0) {
      const tissues = [
        ...new Set(data.map(dataPoint => dataPoint.tissue.name)),
      ];

      const [minh4, maxh4] = d3.extent(data, dataPoint => dataPoint.log2h4h3);

      const traitCategories = [
        ...new Set(data.map(dataObject => dataObject.study.traitCategory)),
      ];

      colourScale.domain(traitCategories).range(d3.schemeCategory10);

      x.domain(tissues).range([0, width]);
      const xOffset = width / tissues.length / 2;
      y.domain(d3.extent([Math.min(minh4), Math.max(maxh4)])).range([
        height,
        0,
      ]);
      // Customization
      const xAxis = d3.axisBottom(x);
      const yAxis = d3.axisLeft(y);
      const xAxisGrid = d3.axisBottom(x);
      const yAxisGrid = d3.axisLeft(y);

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

      // Add X axis label:
      svg
        .append('text')
        .attr('text-anchor', 'end')
        .attr('x', width / 2 + theme.margin.left)
        .attr('y', height + theme.margin.top + 50)
        .text('Tissue');

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

      // Y axis label:
      svg
        .append('text')
        .attr('text-anchor', 'end')
        .attr('transform', 'rotate(-90)')
        .attr('y', 20)
        .attr('x', -theme.margin.top - height / 2 + 40)
        .text('log2(H4/H3)');

      svg
        .append('g')
        .attr(
          'transform',
          'translate(' + theme.margin.left + ',' + (theme.margin.top + 5) + ')'
        )
        .attr('id', 'yAxisGrid')
        .attr('class', 'axis-color')
        .call(yAxisGrid.tickSize(-width).tickFormat(''));

      const chart = svg
        .append('g')
        .attr(
          'transform',
          'translate(' + theme.margin.left + ',' + (theme.margin.top + 5) + ')'
        );

      let jitter = () => Math.random() * 50;
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
          return x(d.tissue.name) + jitter() + xOffset / 2;
        })
        .attr('cy', d => {
          return y(d.log2h4h3);
        })
        .attr('r', d => {
          return 5;
        })
        .on('click', d => {
          this.summaryData = d;
          this.setState({ show: true });
        });
    }
  }
}

export default withContentRect('bounds')(colocalisationPlot);
