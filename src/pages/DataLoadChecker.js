import React from 'react';
import data from '../mocks/data/MagmaSampleAPIOut.json';
import data2 from '../mocks/data/MagmaSampleAPIOut2.json';
import RadarDataPrepare from '../logic/RadarDataPrepare';
function DataLoad() {
  const out = RadarDataPrepare(data);
  const out2 = RadarDataPrepare(data2);
  const plotdata = [out, out2];
  const d = JSON.stringify(plotdata, undefined, 2);
  const style = {
    width: '100%',
  };
  const style2 = {
    height: '100%',
  };
  console.log(plotdata);
  return <pre>{d}</pre>;
}
export default DataLoad;
