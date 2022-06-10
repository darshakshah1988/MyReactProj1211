function RadarDataPrepare(data) {
  //console.log(Object.keys(data).lenght);
  let out = [];
  data.forEach(function(item, index) {
    let temp = {};
    temp.ZSTAT = data[index]['ZSTAT'];
    temp.study_id = data[index]['study_id'];
    temp.trait = data[index]['trait'];
    temp.traitCategory = data[index]['traitCategory'];
    out.push(temp);
    //console.log(item['traitCategory']);
  });
  //console.log(out);
  return out;
}
export default RadarDataPrepare;
