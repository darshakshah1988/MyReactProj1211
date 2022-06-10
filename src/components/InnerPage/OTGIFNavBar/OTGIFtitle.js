import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = () => ({
  root: {
    display: 'inline',
  },
  fat: {
    fontWeight: 1100,
    textTransform: 'capitalize',
  },
  thin: {
    fontWeight: 300,
    textTransform: 'capitalize',
  },
});

const OTGIFtitle = ({ classes, className }) => {
  const titleClasses = classNames(classes.root, className);
  return (
    <Typography className={titleClasses} variant="h6" color="inherit">
      <span className={classes.fat}>OTGIF </span>
      <span className={classes.thin}>Genetics</span>
    </Typography>
  );
};

export default withStyles(styles)(OTGIFtitle);
