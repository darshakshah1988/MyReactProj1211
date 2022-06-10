import { filter, map, result } from '@laufire/utils/collection';
import { onProp } from '@laufire/utils/predicates';
import { isDefined } from '@laufire/utils/reflection';
import { defined } from '@laufire/utils/fn';

const getPlotData = ({ data, config }) => {
  const transformers = map(
    filter(config, onProp('path', isDefined)),
    ({ path }) => item => result(item, path)
  );

  return {
    data: map(data, item => ({
      ...item,
      ...map(transformers, transform => transform(item)),
    })).map(data => ({
      ...data,
      markerSize: defined(data.markerSize, config.defaultMarkerSize),
    })),
    config,
  };
};

export default getPlotData;
