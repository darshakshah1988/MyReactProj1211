import React from 'react';
import { map, keys, values } from '@laufire/utils/collection';
import { BarChart, TableChartOutlined } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import { Menu, MenuItem } from '../MenuHelpers';

const icons = {
  plot: BarChart,
  table: TableChartOutlined,
};

const ViewMenu = ({ views, value, onChange }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = event => setAnchorEl(event.currentTarget);
  const closeMenu = () => setAnchorEl(null);
  const Icon = icons[value];

  return (
    <>
      <Button
        aria-controls="view-menu"
        aria-haspopup="true"
        variant="contained"
        onClick={openMenu}
        style={{
          width: '6em',
        }}
      >
        <Icon /> <span style={{ textTransform: 'capitalize' }}>{value}</span>
      </Button>
      <Menu
        id="view-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeMenu}
      >
        {values(
          map(views, (_, viewKey) => (
            <MenuItem
              key={viewKey}
              item={viewKey}
              icon={icons[viewKey]}
              action={() => {
                onChange(viewKey);
                closeMenu();
              }}
            />
          ))
        )}
      </Menu>
    </>
  );
};

export default ViewMenu;
