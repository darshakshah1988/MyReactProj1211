import { map, reduce, result } from '@laufire/utils/collection';
import { id, sum } from '@laufire/utils/reducers';

const converters = {};

const helpers = {
  onPath: ({ path }) => item => result(item, path),
  collect: ({ data, config }) => map(data, helpers.onPath(config)),
  convert: (value, conversion) => (converters[conversion] || id)(value),
  minMax: values => [Math.min(...values), Math.max(...values)],
  limitDecimals: (number, precision = 2) => {
    const multiplier = Math.pow(10, precision);

    return Math.round((number + Number.EPSILON) * multiplier) / multiplier;
  },
  split: (number, ...ratios) => {
    const total = reduce(ratios, sum, 0) || 1;

    return ratios.map(ratio => (number * ratio) / total);
  },
  negLog10: value => -Math.log10(value),
};

export default helpers;
