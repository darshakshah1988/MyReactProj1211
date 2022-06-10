/* eslint-disable max-lines-per-function */
/* eslint-disable no-magic-numbers */
/* eslint-disable no-console */
import { filter, map } from '@laufire/utils/collection';
import { React } from 'react';
import { unique } from '@laufire/utils/predicates';
import { possibilities } from '@laufire/utils/prob';
import { index } from '@laufire/utils/crunch';
import chroma from 'chroma-js';
import { rndBetween } from '@laufire/utils/random';

const TableData = ({ data }) => {
  const table = index(data, ['row', 'column']);
  const rows = filter(data.map(Data => Data.row), unique);
  const columns = filter(data.map(Data => Data.column), unique);

  return (
    <table>
      <thead>
        <tr>
          <th />
          {columns.map(column => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map(row => (
          <tr key={row}>
            <td>{row}</td>
            {columns.map(column => {
              const values = table[row][column][0].value / 100;

              return (
                <td
                  key={column}
                  style={{
                    background: chroma.mix('#ffffff', '#0000cc', values, 'hsl'),
                  }}
                >
                  {values}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Main = context => {
  const {
    config: { data },
  } = context;

  const mockData = map(possibilities(data), value => ({
    ...value,
    value: rndBetween(0, 100),
  }));

  return TableData({ data: mockData });
};

export default Main;
