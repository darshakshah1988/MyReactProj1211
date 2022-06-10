import React from 'react';
import DataTable from '../../components/DataTable';
import GeckoCanvas from '../../components/GeckoCanvas';
import TabContent from '../../components/TabContent';

const config = {};

const views = {
  plot: ({ data }) => {
    const geckoPlot = React.createRef();
    const start = 54026242;
    const end = 56026242;
    const selectedGenes = [];
    const selectedIndexVariants = ['1_55026242_C_T'];
    const selectedTagVariants = ['1_55026242_C_T'];
    const selectedStudies = [];

    return (
      <div style={{ overflow: 'auto', height: '600px' }}>
        <GeckoCanvas
          ref={geckoPlot}
          data={data}
          start={start}
          end={end}
          showGeneVerticals={true}
          selectedGenes={selectedGenes}
          selectedTagVariants={selectedTagVariants}
          selectedIndexVariants={selectedIndexVariants}
          selectedStudies={selectedStudies}
          handleMousemove={() => {}}
          handleClick={() => {}}
        />
      </div>
    );
  },
  table: ({ data }) => (
    <DataTable
      {...{
        data: data,
        columns: {
          pval: {
            label: 'P-Val',
          },
          nLogPVal: {
            label: '-Log P-Val',
          },
        },
        sortBy: 'pval',
        order: 'desc',
        downloadFileStem: 'L2GTable',
      }}
    />
  ),
};

const LocusPage = ({ data }) => <TabContent {...{ data, config, views }} />;

export default LocusPage;
