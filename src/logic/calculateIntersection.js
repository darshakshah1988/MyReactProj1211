import * as d3 from 'd3';
import { Venn } from 'react-venn-selectable';
import 'react-venn-selectable/src/index.css';
//var venn = require("venn")
function extractStudyId(dataArray) {
  let studyIdArray = [];
  //console.log(dataArray);
  for (let i = 0; i < dataArray.length; i++) {
    studyIdArray.push(dataArray[i].study.studyId);
  }
  return studyIdArray;
}

function createvenn(L2D, ColD, common) {
  //const commonNum = common.length;
  const sets2 = [
    { sets: [0], label: 'L2D (' + L2D.length + ')', size: L2D.length },
    {
      sets: [1],
      label: 'Colocalization (' + ColD.length + ')',
      size: ColD.length,
    },
    {
      sets: [0, 1],
      size: common.length,
      label: 'Common (' + common.length + ')',
    },
  ];
  return (
    <div>
      <Venn sets={sets2} />
    </div>
  );
}

function calculateIntersection(data) {
  //const demoarray = [1, 3, 5, 7, 9];
  //const common =
  //  associatedStudiesFiltered.length + colocalisationsForGeneFiltered.length;
  //console.log(data);
  const L2D = extractStudyId(data.associatedStudiesFiltered);
  const ColD = extractStudyId(data.colocalisationsForGeneFiltered);
  let common = data.finalData;
  //console.log(common.length);
  const venn = createvenn(L2D, ColD, common);
  console.log(venn);
  //return [mystring, 'a', 'b'];
  return venn;
}

export default calculateIntersection;
