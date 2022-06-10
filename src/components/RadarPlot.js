import React, { useEffect, useRef, useState } from 'react';

import * as d3 from 'd3';
import _ from 'lodash';

import { Autocomplete, DownloadSVGPlot } from '../ot-ui-components';
import FilterRadarPlotData from './RadarPlotData';
import GeneSearch from '../components/GeneSearch/GeneSearch';
import customAPI from '../queries/CustomAPI';
import { Grid } from '@material-ui/core';

const RadarPlot = props => {
  const { data, traitCategories } = props;
  const plotData = FilterRadarPlotData(data);
  const d3Container = useRef(null);

  const geneDataList = [
    {
      title: 'Gene1',
      year: '2022',
    },
    {
      title: 'Gene2',
      year: '2022',
    },
  ]; //customAPI.getGenesData();

  const color = d3.scaleOrdinal().range(['#EDC951', '#CC333F', '#00A0B0']);
  const options = {
    w: 1056,
    h: 400,
    margin: { top: 20, right: 20, bottom: 20, left: 20 },
    maxValue: 0.5,
    levels: 5,
    roundStrokes: true,
    color: color,
  };

  const cfg = {
    w: 600, //Width of the circle
    h: 450, //Height of the circle
    margin: { top: 20, right: 20, bottom: 20, left: 20 }, //The margins of the SVG
    levels: 3, //How many levels or inner circles should there be drawn
    maxValue: 0, //What is the value that the biggest circle will represent
    labelFactor: 1.25, //How much farther than the radius of the outer circle should the labels be placed
    wrapWidth: 60, //The number of pixels after which a label needs to be given a new line
    opacityArea: 0.35, //The opacity of the area of the blob
    dotRadius: 4, //The size of the colored circles of each blog
    opacityCircles: 0.1, //The opacity of the circles of each blob
    strokeWidth: 2, //The width of the stroke around each blob
    roundStrokes: false, //If true the area and stroke will follow a round path (cardinal-closed)
    color: d3.schemeCategory10, //Color function
  };
  const svg = d3.select(d3Container.current);
  //Put all of the options into a variable called cfg
  if ('undefined' !== typeof options) {
    for (var i in options) {
      if ('undefined' !== typeof options[i]) {
        cfg[i] = options[i];
      }
    } //for i
  } //if

  //If the supplied maxValue is smaller than the actual one, replace by the max in the data
  const highestValue = Math.max.apply(
    Math,
    ...plotData.map(e => {
      return e.map(el => {
        return el.ZSTAT;
      });
    })
  );
  var maxValue = Math.max(cfg.maxValue, highestValue);

  const allAxis = plotData.reduce((accumulator, items, idx) => {
      const traits = items.map(item => {
        return item.trait;
      });
      return [...accumulator, ...traits];
    }, []), //Names of each axis
    total = allAxis.length, //The number of different axes
    radius = Math.min(cfg.w / 2, cfg.h / 2), //Radius of the outermost circle
    Format = d3.format('%'), //Percentage formatting
    angleSlice = (Math.PI * 2) / total; //The width in radians of each "slice"

  //Scale for the radius
  var rScale = d3
    .scaleLinear()
    .range([0, radius])
    .domain([0, maxValue]);

  /////////////////////////////////////////////////////////
  //////////// Create the container SVG and g /////////////
  /////////////////////////////////////////////////////////
  //Append a g element
  var g = svg
    .append('g')
    .attr(
      'transform',
      'translate(' +
        (cfg.w / 2 + cfg.margin.left) +
        ',' +
        (cfg.h / 2 + cfg.margin.top) +
        ')'
    );

  /////////////////////////////////////////////////////////
  ////////// Glow filter for some extra pizzazz ///////////
  /////////////////////////////////////////////////////////

  //Filter for the outside glow
  var filter = g
      .append('defs')
      .append('filter')
      .attr('id', 'glow'),
    feGaussianBlur = filter
      .append('feGaussianBlur')
      .attr('stdDeviation', '2.5')
      .attr('result', 'coloredBlur'),
    feMerge = filter.append('feMerge'),
    feMergeNode_1 = feMerge.append('feMergeNode').attr('in', 'coloredBlur'),
    feMergeNode_2 = feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

  /////////////////////////////////////////////////////////
  /////////////// Draw the Circular grid //////////////////
  /////////////////////////////////////////////////////////

  //Wrapper for the grid & axes
  var axisGrid = g.append('g').attr('class', 'axisWrapper');

  //Draw the background circles
  axisGrid
    .selectAll('.levels')
    .data(d3.range(1, cfg.levels + 1).reverse())
    .enter()
    .append('circle')
    .attr('class', 'gridCircle')
    .attr('r', (d, i) => {
      return (radius / cfg.levels) * d;
    })
    .style('fill', '#CDCDCD')
    .style('stroke', '#CDCDCD')
    .style('fill-opacity', cfg.opacityCircles)
    .style('filter', 'url(#glow)');

  //Text indicating at what % each level is
  axisGrid
    .selectAll('.axisLabel')
    .data(d3.range(1, cfg.levels + 1).reverse())
    .enter()
    .append('text')
    .attr('class', 'axisLabel')
    .attr('x', 4)
    .attr('y', d => {
      return (-d * radius) / cfg.levels;
    })
    .attr('dy', '0.4em')
    .style('font-size', '10px')
    .attr('fill', '#737373')
    .text((d, i) => {
      return Format((maxValue * d) / cfg.levels);
    });

  /////////////////////////////////////////////////////////
  //////////////////// Draw the axes //////////////////////
  /////////////////////////////////////////////////////////

  //Create the straight lines radiating outward from the center
  var axis = axisGrid
    .selectAll('.axis')
    .data(allAxis)
    .enter()
    .append('g')
    .attr('class', 'axis');
  //Append the lines
  axis
    .append('line')
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('x2', (d, i) => {
      return rScale(maxValue * 1.1) * Math.cos(angleSlice * i - Math.PI / 2);
    })
    .attr('y2', (d, i) => {
      return rScale(maxValue * 1.1) * Math.sin(angleSlice * i - Math.PI / 2);
    })
    .attr('class', 'line')
    .style('stroke', 'white')
    .style('stroke-width', '2px');

  //Append the labels at each axis
  axis
    .append('text')
    .attr('class', 'legend')
    .style('font-size', '11px')
    .style('width', '200px')
    .style('white-space', 'nowrap')
    .style('overflow', 'hidden')
    .style('text-overflow', 'ellipsis')
    .attr('text-anchor', 'middle')
    .attr('dy', '0.35em')
    .attr('x', (d, i) => {
      return (
        rScale(maxValue * cfg.labelFactor) *
        Math.cos(angleSlice * i - Math.PI / 2)
      );
    })
    .attr('y', (d, i) => {
      return (
        rScale(maxValue * cfg.labelFactor) *
        Math.sin(angleSlice * i - Math.PI / 2)
      );
    })
    .text(d => {
      return d.substring(0, 15) + '...';
    })
    .on('mouseover', d => {
      console.log(d);
    });
  //.call(wrap, cfg.wrapWidth);

  /////////////////////////////////////////////////////////
  ///////////// Draw the radar chart blobs ////////////////
  /////////////////////////////////////////////////////////

  //The radial line function
  var radarLine = d3
    .lineRadial()
    .curve(d3.curveLinearClosed)
    .radius(d => {
      return rScale(d.ZSTAT);
    })
    .angle((d, i) => {
      return i * angleSlice;
    });

  if (cfg.roundStrokes) {
    radarLine.curve(d3.curveLinearClosed);
  }

  //Create a wrapper for the blobs
  var blobWrapper = g
    .selectAll('.radarWrapper')
    .data(plotData)
    .enter()
    .append('g')
    .attr('class', 'radarWrapper');

  //Append the backgrounds
  blobWrapper
    .append('path')
    .attr('class', 'radarArea')
    .attr('d', (d, i) => {
      return radarLine(d);
    })
    .style('fill', function(d, i) {
      return cfg.color(i);
    })
    .style('fill-opacity', cfg.opacityArea)
    .on('mouseover', function(d, i) {
      //Dim all blobs
      d3.selectAll('.radarArea')
        .transition()
        .duration(200)
        .style('fill-opacity', 0.1);
      //Bring back the hovered over blob
      d3.select(this)
        .transition()
        .duration(200)
        .style('fill-opacity', 0.7);
    })
    .on('mouseout', function() {
      //Bring back all blobs
      d3.selectAll('.radarArea')
        .transition()
        .duration(200)
        .style('fill-opacity', cfg.opacityArea);
    });

  //Create the outlines
  blobWrapper
    .append('path')
    .attr('class', 'radarStroke')
    .attr('d', function(d, i) {
      return radarLine(d);
    })
    .style('stroke-width', cfg.strokeWidth + 'px')
    .style('stroke', function(d, i) {
      return cfg.color(i);
    })
    .style('fill', 'none')
    .style('filter', 'url(#glow)');

  //Append the circles
  blobWrapper
    .selectAll('.radarCircle')
    .data(function(d, i) {
      return d;
    })
    .enter()
    .append('circle')
    .attr('class', 'radarCircle')
    .attr('r', cfg.dotRadius)
    .attr('cx', function(d, i) {
      return rScale(d.ZSTAT) * Math.cos(angleSlice * i - Math.PI / 2);
    })
    .attr('cy', function(d, i) {
      return rScale(d.ZSTAT) * Math.sin(angleSlice * i - Math.PI / 2);
    })
    .style('fill', function(d, i, j) {
      return cfg.color(j);
    })
    .style('fill-opacity', 0.8);

  /////////////////////////////////////////////////////////
  //////// Append invisible circles for tooltip ///////////
  /////////////////////////////////////////////////////////

  //Wrapper for the invisible circles on top
  var blobCircleWrapper = g
    .selectAll('.radarCircleWrapper')
    .data(plotData)
    .enter()
    .append('g')
    .attr('class', 'radarCircleWrapper');

  //Append a set of invisible circles on top for the mouseover pop-up
  blobCircleWrapper
    .selectAll('.radarInvisibleCircle')
    .data(function(d, i) {
      return d;
    })
    .enter()
    .append('circle')
    .attr('class', 'radarInvisibleCircle')
    .attr('r', cfg.dotRadius * 1.5)
    .attr('cx', function(d, i) {
      return rScale(d.ZSTAT) * Math.cos(angleSlice * i - Math.PI / 2);
    })
    .attr('cy', function(d, i) {
      return rScale(d.ZSTAT) * Math.sin(angleSlice * i - Math.PI / 2);
    })
    .style('fill', 'none')
    .style('pointer-events', 'all')
    .on('mouseover', function(d, i) {
      var newX = parseFloat(d3.select(this).attr('cx')) - 10;
      var newY = parseFloat(d3.select(this).attr('cy')) - 10;

      tooltip
        .attr('x', newX)
        .attr('y', newY)
        .text(Format(d.ZSTAT))
        .transition()
        .duration(200)
        .style('opacity', 1);
    })
    .on('mouseout', function() {
      tooltip
        .transition()
        .duration(200)
        .style('opacity', 0);
    });

  //Set up the small tooltip for when you hover over a circle
  var tooltip = g
    .append('text')
    .attr('class', 'tooltip')
    .style('opacity', 0);

  /////////////////////////////////////////////////////////
  /////////////////// Helper Function /////////////////////
  /////////////////////////////////////////////////////////

  //Taken from http://bl.ocks.org/mbostock/7555321
  //Wraps SVG text
  function wrap(text, width) {
    text.each(function() {
      var text = d3.select(this),
        words = text
          .text()
          .split(/\s+/)
          .reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.4, // ems
        y = text.attr('y'),
        x = text.attr('x'),
        dy = parseFloat(text.attr('dy')),
        tspan = text
          .text(null)
          .append('tspan')
          .attr('x', x)
          .attr('y', y)
          .attr('dy', dy + 'em');

      while ((word = words.pop())) {
        line.push(word);
        tspan.text(line.join(' '));
        if (tspan.node().getComputedTextLength() > width) {
          line.pop();
          tspan.text(line.join(' '));
          line = [word];
          tspan = text
            .append('tspan')
            .attr('x', x)
            .attr('y', y)
            .attr('dy', ++lineNumber * lineHeight + dy + 'em')
            .text(word);
        }
      }
    });
  } //wrap
  useEffect(() => {});
  const geneSearch = (
    <Grid container justifyContent="space-between" spacing={2}>
      <Grid item>
        <GeneSearch data={geneDataList} />
      </Grid>
      <Grid item>
        <Autocomplete options={traitCategories} />
      </Grid>
    </Grid>
  );
  return (
    <>
      {/* <FilterBar
        {...{
          config: filterConfig,
          data: data,
          onChange: setFilters,
        }}
      /> */}
      {/* Filtered count: {filteredData.length} */}
      <DownloadSVGPlot
        left={geneSearch}
        svgContainer={d3Container}
        filenameStem={`RadarPlot`}
      >
        <div className="d3-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1056"
            height="600"
            ref={d3Container}
            className="d3Container"
          />
        </div>
      </DownloadSVGPlot>
    </>
  );
};

export default RadarPlot;
