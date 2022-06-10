function locusToGeneData({ data, filters }) {
  return data
    ? {
        traitCategories: [
          ...new Set(data.map(item => item.study.traitCategory)),
        ],

        minLogPval: Math.min(...data.map(item => -Math.log10(item.pval))),

        minNInitial: Math.min(...data.map(item => item.study.nInitial)),

        maxLogPval: Math.max(...data.map(item => -Math.log10(item.pval))),

        minyProbaModel: Math.min(...data.map(item => item.yProbaModel)),

        maxyProbaModel: Math.max(...data.map(item => item.yProbaModel)),
      }
    : null;
}

export default locusToGeneData;
