import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import {
  filter,
  fromEntries,
  keys,
  map,
  merge,
  pick,
  sort,
} from '@laufire/utils/collection';
import getPlotData from '../logic/getPlotData';
import helpers from '../logic/helpers';
import { isEqual, not, unique } from '@laufire/utils/predicates';
import { identity } from '@laufire/utils/fn';
import { ascending } from '@laufire/utils/sorters';

const typeConfig = {
  continuous: {
    buildDomain: ({ axis, values, width }) =>
      axis
        .domain(d3.extent(values))
        .range([0, width])
        .nice(),
    scale: 'scaleLinear',
    select: ({ axis, bounds, scales }) =>
      sort(bounds.map(value => scales[axis].invert(value)), ascending),
  },
  discrete: {
    buildDomain: ({ axis, values, width }) =>
      axis.domain(values).range([0, width]),
    scale: 'scaleBand',
    select: ({ axis, bandWidth, bounds: [lBound, uBound], uniques }) =>
      uniques[axis].slice(
        (lBound / bandWidth) | 0,
        ((uBound / bandWidth) | 0) + 1
      ),
  },
};

const addMarkerTooltip = markers =>
  markers
    .append('text')
    .style('text-anchor', 'left')
    .attr('x', '0.3em')
    .attr('y', d => `${-d.markerSize - 5}`)
    .text(d => d.markerTooltip);

const markerShapes = {
  circle: ({ markers }) =>
    markers.append('circle').attr('r', ({ markerSize }) => markerSize),

  square: ({ markers }) => {
    const multiplier = 2;

    return markers
      .append('rect')
      .attr('width', ({ markerSize }) => markerSize * multiplier)
      .attr('height', ({ markerSize }) => markerSize * multiplier)
      .attr(
        'transform',
        ({ markerSize }) => `translate(${-markerSize}, ${-markerSize})`
      );
  },

  rounded: ({ markers }) =>
    markerShapes
      .square({ markers })
      .attr('rx', ({ markerSize }) => markerSize * 0.66)
      .attr('r', ({ markerSize }) => markerSize),

  triangle: ({ markers }) => {
    const multiplier = 0.1;

    return markers
      .append('polygon')
      .attr('points', ({ markerSize }) =>
        [[25, 12], [10, 40], [40, 40]]
          .map(point => point.map(i => [i * markerSize * multiplier]).join(','))
          .join(' ')
      )
      .attr(
        'transform',
        ({ markerSize }) =>
          `translate(${-markerSize * 2.4}, ${-markerSize * 2.7})`
      );
  },
};

const addMarkerShape = ({ config: { markerShape }, ...context }) =>
  markerShapes[markerShape](context)
    .style('opacity', '0.6')
    .style('stroke', '#fff')
    .style('stroke-width', 1);

const addLegend = context => {
  const {
    data: partialData,
    svg,
    config: { defaultMarkerSize, margin, padding, fontSize },
    plotWidth,
  } = context;
  const markerSize = defaultMarkerSize * 2;
  const left = plotWidth + margin.left + padding * 20;
  const top = margin.top + padding * 5 + markerSize;
  const data = map(partialData, item => ({ ...item, markerSize }));
  const markers = svg
    .append('g')
    .attr('transform', `translate(${left}, ${top})`)
    .selectAll()
    .data(data)
    .enter()
    .append('g')
    .attr('transform', d => `translate(0, ${d.position * markerSize * 3})`);

  markers
    .append('text')
    .style('text-anchor', 'left')
    .attr('x', `${padding}em`)
    .attr('y', `${fontSize / 7}em`)
    .text(d => d.text);

  addMarkerShape({ ...context, markers }).style('fill', d => d.color);
};

const addReferenceLine = ({
  svg,
  config: { margin },
  plotWidth,
  scales,
  referenceLine,
}) => {
  const y = scales.y(referenceLine.y);
  svg
    .append('line')
    .attr('class', 'referenceLine')
    .attr('x1', margin.left)
    .attr('x2', margin.left + plotWidth)
    .attr('y1', y)
    .attr('y2', y)
    .attr('stroke', '#999')
    .attr('stroke-dasharray', '3 3')
    .attr('stroke-width', '1');
};
const wrapText = ({ node, width, padding }) => {
  const self = d3.select(node);
  let textLength = self.node().getComputedTextLength();
  let text = self.text();

  while (textLength > width - padding * 2 && text.length > 0) {
    text = text.slice(0, -1);
    self.text(text + '...');
    textLength = self.node().getComputedTextLength();
  }
};

const configDefaults = {
  defaultMarkerSize: 5,
  padding: 2,
  fontSize: 2,
  markerShape: 'circle',
  margin: {
    bottom: 80,
    left: 80,
    right: 50,
    top: 50,
  },
  markerColor: {
    legendSize: 0.2,
  },
};

export const ScatterPlot = props => {
  const { width, height } = { width: 1300, height: 400 };
  const d3Container = useRef(null);
  const { onChange = identity } = props;
  const rawConfig = merge({}, configDefaults, props.config);
  const { data, config } = getPlotData({ ...props, config: rawConfig });
  const { fontSize, padding, margin, markerColor, referenceLine } = config;
  const axises = { x: {}, y: {} };
  const d3AxisPosition = map(axises, (_, axis) => keys(axises).indexOf(axis));
  const types = map(axises, (_, axis) => typeConfig[config[axis].type]);
  const values = map(axises, (_, axis) => pick(data, axis));
  const uniques = map(axises, (_, axis) => filter(values[axis], unique));
  const scales = map(axises, (_, axis) => d3[types[axis].scale]());
  const drawWidth = width - margin.right - margin.left;
  const [plotWidth, legendWidth] = helpers.split(
    drawWidth,
    1 - markerColor.legendSize,
    markerColor.legendSize
  );
  const plotHeight = height - margin.top - margin.bottom;
  // #TODO: Allow for discrete values in y axis.
  const bandWidth = plotWidth / uniques.x.length;
  const context = {
    config,
    data,
    scales,
    bandWidth,
    uniques,
    plotWidth,
    legendWidth,
  };
  const axisFontSize = `${fontSize / 1.4}em`;
  const tickFontSize = `${fontSize / 1.4}em`;
  const [selected, setSelected] = useState([]);

  const isSelected = d => selected.filter(isEqual(d)).length > 0;
  const toggleSelection = d =>
    setSelected(
      isSelected(d) ? selected.filter(not(isEqual(d))) : selected.concat(d)
    );

  useEffect(
    () => {
      const { x, y } = scales;
      const legendKeys = filter(pick(data, 'markerColor'), unique);
      // #TODO: Allow for continuous and discrete scales.
      const colorScale = d3
        .scaleOrdinal()
        .domain(legendKeys)
        .range(d3.schemeCategory10);
      const legend = map(legendKeys, (legendKey, index) => ({
        text: legendKey,
        color: colorScale(legendKey),
        position: index,
      }));
      const xAxis = d3.axisBottom(x);
      const yAxis = d3.axisLeft(y);
      const xAxisGrid = d3.axisBottom(x);
      const yAxisGrid = d3.axisLeft(y);
      // #TODO: Contain the jitter logic within the plot. Use {[Symbol.for(d)]: jitter} to cache computed jitters.
      const jitter =
        config.x.type !== 'discrete'
          ? () => 0
          : ({ xJitter = 0 }) => bandWidth * (0.5 + xJitter);
      const brushEnded = function() {
        const { selection } = d3.event;
        if (selection) {
          onChange(
            fromEntries(
              map(axises, (_, axis) => [
                [config[axis].path],
                types[axis].select({
                  ...context,
                  axis,
                  bounds: pick(selection, d3AxisPosition[axis]),
                }),
              ])
            )
          );
          chart.select('.brush').call(brush.move, null);
        }
      };

      const brush = d3
        .brush()
        .extent([[0, 0], [plotWidth, plotHeight]])
        .on('end', brushEnded);

      const svg = d3.select(d3Container.current);
      svg.selectAll('*').remove();

      types.x.buildDomain({ axis: x, values: uniques.x, width: plotWidth });

      y.domain(d3.extent(helpers.minMax(values.y)))
        .range([plotHeight, 0])
        .nice();

      svg.append('style').text(`
        .marker text {
          display: none;
          font-size: ${tickFontSize}
        }

        .marker.selected text {
          display: unset;
        };
      `);

      // X axis label:
      svg
        .append('text')
        .attr('text-anchor', 'end')
        .attr('x', plotWidth / 2 + margin.left)
        .attr('text-anchor', 'middle')
        .attr('y', height - margin.bottom / 3)
        .style('font-size', axisFontSize)
        .text(config.x.axis.label);

      // Y axis label:
      svg
        .append('text')
        .attr('text-anchor', 'end')
        .attr('transform', 'rotate(-90)')
        .attr('y', axisFontSize)
        .attr('text-anchor', 'middle')
        .attr('x', -margin.top - plotHeight / 2)
        .style('font-size', axisFontSize)
        .text(config.y.axis.label);

      // X-axis and ticks:
      svg
        .append('g')
        .attr(
          'transform',
          `translate(${margin.left}, ${plotHeight + margin.top + 5})`
        )
        .attr('id', 'xAxis')
        .attr('class', 'axis-color')
        .call(xAxis)
        .style('fill', '#e5ecf6')
        .selectAll('.tick text')
        .attr('y', tickFontSize)
        .html('')
        .append('tspan')
        .style('font-size', tickFontSize)
        .text(identity)
        .each(
          config.x.type === 'discrete'
            ? function() {
                wrapText({ node: this, width: bandWidth, padding });
              }
            : identity
        );

      // Grid Boxes:
      svg
        .append('g')
        .attr(
          'transform',
          `translate(${margin.left}, ${plotHeight + margin.top + 5})`
        )
        .style('fill', '#e5ecf6')
        .attr('class', 'axis-color')
        .call(xAxisGrid.tickSize(-plotHeight).tickFormat(''));

      // Y-axis and ticks:
      svg
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top + 5})`)
        .call(yAxis)
        .style('fill', '#e5ecf6')
        .attr('class', 'axis-color')
        .selectAll('.tick text')
        .style('font-size', tickFontSize);

      // Y-axis Grid:
      svg
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top + 5})`)
        .attr('id', 'yAxisGrid')
        .attr('class', 'axis-color')
        .call(yAxisGrid.tickSize(-plotWidth).tickFormat(''));

      svg
        .append('defs')
        .append('svg:clipPath')
        .attr('id', 'clip')
        .append('svg:rect')
        .attr('width', plotWidth)
        .attr('height', plotHeight);

      const chart = svg
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .attr('clip-path', 'url(#clip)');

      // Brush:
      chart
        .append('g')
        .attr('class', 'brush')
        .call(brush);

      // Markers:
      const markers = chart
        .selectAll()
        .data(data)
        .enter()
        .append('g')
        .attr('class', d => (isSelected(d) ? 'selected marker' : 'marker'))
        .attr('transform', d => `translate(${x(d.x) + jitter(d)}, ${y(d.y)})`);

      config.markerTooltip && addMarkerTooltip(markers);

      addMarkerShape({ ...context, markers })
        .style('fill', d => colorScale(d.markerColor))
        .style('cursor', 'pointer')
        .on('click', toggleSelection);

      legendWidth && addLegend({ ...context, data: legend, svg, legendWidth });

      referenceLine && addReferenceLine({ ...context, svg, referenceLine });
    },
    [data, d3Container.current]
  );

  return (
    <svg
      {...{
        ref: d3Container,
        className: 'd3-component',
        width: width,
        height: height,
      }}
    />
  );
};

export default ScatterPlot;
