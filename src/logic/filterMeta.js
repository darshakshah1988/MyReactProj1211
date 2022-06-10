import { filter, map, reduce } from '@laufire/utils/collection';
import { unique } from '@laufire/utils/predicates';
import { min, max } from '@laufire/utils/reducers';
import helpers from './helpers';

const { collect } = helpers;

const metaProcessors = {
  multiSelect: ({ data, config }) => filter(collect({ data, config }), unique),

  range: ({ data, config }) => {
    const values = filter(collect({ data, config }), value => value !== null);

    return [reduce(values, min), reduce(values, max)];
  },
};

const filterMeta = ({ config, data }) => {
  return map(config, filterConfig =>
    metaProcessors[filterConfig.type]({ data, config: filterConfig })
  );
};

export default filterMeta;
