import {
  Breadcrumbs as MUIBreadcrumbs,
  Link,
  Typography,
} from '@material-ui/core';

const Breadcrumbs = ({ title }) => (
  <MUIBreadcrumbs separator="›" aria-label="breadcrumb">
    <Link color="inherit" href="/">
      Home
    </Link>
    <Typography color="textPrimary">{title}</Typography>
  </MUIBreadcrumbs>
);

export default Breadcrumbs;
