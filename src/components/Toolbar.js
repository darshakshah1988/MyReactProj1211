import { Grid } from '@material-ui/core';

const Toolbar = ({ children }) => (
  <Grid
    {...{
      container: true,
      direction: 'row',
      spacing: 2,
    }}
  >
    {children.map((child, i) => (
      <Grid key={i} item={true}>
        {child}
      </Grid>
    ))}
  </Grid>
);

export default Toolbar;
