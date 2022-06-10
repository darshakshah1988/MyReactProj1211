import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MUIMenu from '@material-ui/core/Menu';
import MUIMenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

const Menu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <MUIMenu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MUIMenuItem);

const MenuItem = React.forwardRef(({ action, item, icon: Icon }, ref) => (
  <StyledMenuItem ref={ref} onClick={() => action()}>
    {Icon && (
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
    )}
    <ListItemText primary={item} style={{ textTransform: 'capitalize' }} />
  </StyledMenuItem>
));

export { Menu, MenuItem };
