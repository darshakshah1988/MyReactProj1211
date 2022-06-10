// #FROM: https://codesandbox.io/s/6efkdw?file=/demo.js
import React from 'react';
import ArrowDropDownCircleOutlined from '@material-ui/icons/ArrowDropDownCircleOutlined';
import Button from '@material-ui/core/Button';
import { map, values } from '@laufire/utils/collection';
import { Menu, MenuItem } from '../MenuHelpers';

export default function DownloadMenu({ actions }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = event => setAnchorEl(event.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  return (
    <>
      <Button
        aria-controls="download-menu"
        aria-haspopup="true"
        variant="contained"
        onClick={openMenu}
      >
        Download
        <ArrowDropDownCircleOutlined />
      </Button>
      <Menu
        id="download-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeMenu}
      >
        {values(
          map(actions, (action, item) => (
            <MenuItem
              key={item}
              item={item}
              action={() => {
                action();
                closeMenu();
              }}
            />
          ))
        )}
      </Menu>
    </>
  );
}
