import React, { Fragment } from 'react';

const getSummaryData = data => {
  const filteredData = [];
  for (const property in data) {
    console.log(property);
    if (property === 'variant') {
      filteredData.push({ 'Index Variant ID': data[property].id });
    }
    if (property === 'beta') {
      filteredData.push({ Beta: data[property].betaCI });
    }
    if (property === 'yProbaModel') {
      filteredData.push({ '95% confidence Interval': data[property] });
    }
    if (property === 'pval') {
      filteredData.push({ PValue: data[property] });
    }
    if (property === 'study') {
      filteredData.push({ 'Study N Initial': data[property].nInitial });
      filteredData.push({ 'Study ID': data[property].studyId });
      filteredData.push({ 'Reported Trait': data[property].traitReported });
    }
    if (property === 'yProbaModel') {
      //    data['L2G Pipeline Score'] = data[property];
    }
    if (property === 'Gene Prioritisation') {
      // <a href="#">View</a>
    }
  }
  return filteredData;
};
const SummaryDetails = ({ data, show, detailsHeading }) => {
  let summaryData = getSummaryData(data);
  console.log(data);
  return (
    <Fragment>
      <div className="summary">
        <div>{detailsHeading}</div>
        <div
          className="close"
          onClick={() => {
            show = false;
          }}
        >
          X
        </div>
        <div className="node-details">
          {summaryData.map((row, i) => (
            <div key={i}>
              {Object.entries(row).map(([key, val]) => (
                <div className="row" key={key}>
                  <div className="col">{key}:</div>
                  <div className="col">{val}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default SummaryDetails;
