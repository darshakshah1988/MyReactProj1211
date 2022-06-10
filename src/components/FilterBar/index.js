import React from 'react';
import { filter, map, values } from '@laufire/utils/collection';
import { Box, Grid, Input, MenuItem, Select, Slider } from '@material-ui/core';
import { defined } from '@laufire/utils/fn';
import helpers from '../../logic/helpers';

const controls = {
  // TODO: Incorporate free-solo auto complete from: https://v4.mui.com/components/autocomplete/
  multiSelect: ({ data, meta, onChange }) => (
    <Select
      {...{
        multiple: true,
        style: { width: '10em' },
        value: data,
        input: <Input />,
        onChange: event => onChange(event.target.value),
      }}
    >
      {map(meta, value => (
        <MenuItem
          {...{
            key: value,
            value: value,
          }}
        >
          {value}
        </MenuItem>
      ))}
    </Select>
  ),

  range: ({
    data: value,
    meta: [min, max],
    onChange,
    config: { marks: configMarks },
  }) => {
    const marks =
      configMarks ||
      [min, max].map(item => ({
        value: item,
        label: helpers.limitDecimals(item),
      }));

    return min !== max ? (
      <Slider
        {...{
          min,
          max,
          marks,
          value,
          xs: 2,
          style: { width: '10em' },
          onChange: (dummy, value) => onChange(value),
        }}
      />
    ) : null;
  },
};

const FilterBar = ({ config, data, meta, filters, onChange }) => (
  <Grid
    {...{
      direction: 'row',
      container: true,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    }}
  >
    {values(
      map(
        filter(config, ({ widget }) => widget !== false),
        (childConfig, key) => (
          <Grid {...{ key: key, item: true }}>
            <Box style={{ padding: '0 2em' }}>
              <Box>{defined(childConfig.label, '')}</Box>
              <Box>
                {controls[childConfig.type]({
                  config: childConfig,
                  data: filters[key],
                  meta: meta[key],
                  onChange: value => onChange({ [key]: value }),
                })}
              </Box>
            </Box>
          </Grid>
        )
      )
    )}
  </Grid>
);

export default FilterBar;
