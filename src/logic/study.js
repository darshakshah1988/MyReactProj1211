import { rndBetween } from '@laufire/utils/lib';
import helpers from './helpers';

const { negLog10 } = helpers;

const Study = {
  standardizeIALoci: ({
    data: {
      manhattan: { associations: data },
    },
  }) =>
    data.map(({ variant: { chromosome }, pval, beta }) => ({
      chromosome,
      negLogPVal: negLog10(pval),
      beta: Math.abs(beta) * 40,
      color: Math.sign(beta) > 0 ? 'Positive' : 'Negative',
      xJitter: rndBetween(-10, 11) * 0.01,
    })),
  standardizeGWASColo: ({ data: { gwasColocalisation: data } }) => {
    return data.map(
      ({
        indexVariant: { id: indexVariant },
        log2h4h3,
        study: { traitReported },
        beta,
      }) => ({
        indexVariant,
        log2h4h3,
        traitReported,
        beta,
        xJitter: rndBetween(-10, 11) * 0.01,
      })
    );
  },
  standardizeCSO: ({ data }) => data,
};

export default Study;
