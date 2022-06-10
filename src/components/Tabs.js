import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MuiTabs from '@material-ui/core/Tabs';
import MuiTab from '@material-ui/core/Tab';
import { values, map, keys } from '@laufire/utils/collection';

const spacing = '2rem';

const TabPanel = ({ children, value, ...other }) => (
  <Grid
    role="tabpanel"
    id={`scrollable-auto-tabpanel-${value}`}
    aria-labelledby={`scrollable-auto-tab-${value}`}
    {...{
      container: true,
      item: true,
      justifyContent: 'center',
      style: {
        height: '100%',
      },
    }}
    {...other}
  >
    {children}
  </Grid>
);

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    // HOTFIX: Overflow is set to hidden, so to accommodate a width bug with MUI Tabs.
    overflow: 'hidden',
  },
  tab: {
    height: spacing,
    minHeight: spacing,
  },
  tabPanel: {
    borderColor: theme.palette.divider,
    margin: `0 calc(${spacing} * 0.6)`,
  },
}));

const Tabs = ({ tabs }) => {
  const classes = useStyles();
  const tabKeys = keys(tabs);
  const [value, setValue] = React.useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <MuiTabs
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        className={[classes.tab, classes.tabPanel].join(' ')}
      >
        {values(
          map(tabs, ({ label }, key) => (
            <MuiTab
              {...{
                key: key,
                label: label,
                id: `scrollable-auto-tab-${key}`,
                'aria-controls': `scrollable-auto-tabpanel-${key}`,
                className: classes.tab,
              }}
            />
          ))
        )}
      </MuiTabs>
      {values(
        map(
          tabs,
          ({ component: Component }, key) =>
            tabKeys.indexOf(key) === value && (
              <TabPanel key={key} value={value}>
                <Component />
              </TabPanel>
            )
        )
      )}
    </div>
  );
};

export default Tabs;
