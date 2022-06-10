import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import OTGIFtitle from './OTGIFNavBar/OTGIFtitle';
import Button from '@material-ui/core/Button';
import favIcon from '../../assets/favicon.png';

const Logo = () => {
  return (
    <div>
      <Button
        component={ReactRouterLink}
        to="/"
        position="static"
        color="primary"
      >
        <img src={favIcon} alt="favIcon" />
        <OTGIFtitle />
      </Button>
    </div>
  );
};

export default Logo;
