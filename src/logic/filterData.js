import { filter, find, map, result } from '@laufire/utils/collection';
import { isDefined } from '@laufire/utils/reflection';

const failFinderGenerators = {
  multiSelect: values => item =>
    !isDefined(find(values, value => value === item)),
  range: ([min, max]) => item => !(item >= min && item <= max),
};

const filterData = ({ data, config, filters }) => {
  const failFinders = map(filters, (filterKeyValues, key) =>
    failFinderGenerators[config[key].type](filterKeyValues)
  );

  return filter(
    data,
    item =>
      !find(failFinders, (failFinder, field) =>
        failFinder(result(item, config[field].path))
      )
  );
};

export default filterData;
