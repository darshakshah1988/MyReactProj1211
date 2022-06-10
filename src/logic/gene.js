import { map, sort } from '@laufire/utils/collection';
import { rndBetween } from '@laufire/utils/lib';
import { compile } from '@laufire/utils/sorters';
import helpers from './helpers';

const { negLog10 } = helpers;

const Gene = {
  standardizeL2G: ({ data: { studiesAndLeadVariantsForGeneByL2G: data } }) => {
    const minNInitial = Math.min(...data.map(item => item.study.nInitial)) || 0;

    return map(data, l2g => {
      const { beta, study, variant } = l2g;

      return {
        pVal: l2g.pval,
        yProbaModel: l2g.yProbaModel,
        negLogPVal: negLog10(l2g.pval),
        studyID: study.studyId,
        traitReported: study.traitReported,
        traitCategory: study.traitCategory,
        author: study.pubAuthor,
        source: study.source,
        studyYear: Number(study.pubDate.split('-')[0]),
        studyRatio: Math.log(study.nInitial / minNInitial) + 1,
        variantID: variant.id,
        beta: beta.betaCI,
        color: study.traitCategory,
      };
    });
  },
  standardizeMagma: ({ data }) =>
    sort(
      map(data, ({ p, ZSTAT, traitCategory }) => {
        return {
          zStat: ZSTAT,
          traitCategory,
          negLogPVal: negLog10(p),
          xJitter: rndBetween(-10, 11) * 0.01,
        };
      }),
      compile({
        traitCategory: 'ascending',
        negLogPVal: 'ascending',
      })
    ),
};

export default Gene;
