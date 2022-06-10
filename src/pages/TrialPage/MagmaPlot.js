import React from 'react';
import {
  filter,
  fromEntries,
  map,
  pick,
  values,
} from '@laufire/utils/collection';
import { unique } from '@laufire/utils/predicates';

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  Cell,
  Legend,
} from 'recharts';
import { rndBetween } from '@laufire/utils/lib';

const getRandomColor = () =>
  `hsl(${rndBetween(0, 360)}, ${rndBetween(50, 100)}%, ${rndBetween(20, 60)}%)`;
const MagmaPlot = ({ data }) => {
  const traitCategories = filter(pick(data, 'traitCategory'), unique);
  const colors = fromEntries(
    map(traitCategories, traitCategory => [traitCategory, getRandomColor()])
  );

  return (
    <div style={{ height: '80vh', width: '80vw', background: '#eee' }}>
      <ResponsiveContainer>
        <ScatterChart
          {...{
            width: 800,
            height: 500,
            margin: {
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            },
          }}
        >
          <CartesianGrid
            {...{
              stroke: '#ffffff',
              fill: '#e5ecf6',
            }}
          />
          <XAxis
            {...{
              type: 'category',
              dataKey: 'traitCategory',
              stroke: '#696969',
              tick: false,
              name: 'Trait Category',
              label: 'Trait Category',
            }}
          />
          <YAxis
            {...{
              type: 'number',
              dataKey: 'nLogPVal',
              name: '-Log P-Val',
              label: { value: 'nLog pValue', angle: -90, position: 'left' },
              stroke: '#696969',
            }}
          />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter data={data}>
            {data.map((entry, index) => (
              <Cell key={index} fill={colors[entry.traitCategory]} />
            ))}
          </Scatter>
          <Legend
            payload={values(
              map(colors, (color, key) => ({
                id: key,
                type: 'circle',
                value: key,
                color: color,
              }))
            )}
          />
          <ReferenceLine y={7.3} strokeDasharray="3 3" stroke="#696969" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MagmaPlot;
