import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import calculateIntersection from '../../logic/calculateIntersection';
const styles = theme => {
  return {
    section: {
      height: '100%',
      padding: theme.sectionPadding,
    },
    geneSymbol: {
      display: 'inline-block',
    },
    locusLinkButton: {
      width: '248px',
      height: '60px',
    },
    locusIcon: {
      fill: 'white',
      width: '40px',
      height: '40px',
    },
    link: {
      textDecoration: 'none',
    },
    geneInfoItem: {
      width: '20%',
    },
    platformLink: {
      textAlign: 'center',
      textDecoration: 'none',
      color: '#5A5F5F',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    iconLink: {
      '&:hover': {
        fill: theme.palette.primary.dark,
      },
    },
  };
};
function Intersection({ data, loading }) {
  //console.log(data);
  if (loading) {
    return null;
  }
  //const commonItems = calculateIntersection(data);
  //const returnHeader = <h2>Common items: {commonItems.length}</h2>;
  //const returnData = commonItems.map((item, i) => <div key={i}> {item} </div>);
  //return returnHeader + returnData;

  //return commonItems.map((item, i) => <div key={i}> {item} </div>);
  //return <div>'demo'</div>;

  return calculateIntersection(data);
}

export default withStyles(styles)(Intersection);
