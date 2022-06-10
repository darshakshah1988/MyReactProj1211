import React from 'react';
import { Box } from '@material-ui/core';
import ContentWithHeader from '../ContentWithHeader';
import Fullscreen from '../Fullscreen';
import Logo from './Logo';
import SearchBox from '../../../src/components/InnerPage/SearchBox2.js/SearchBox';
import Tabs from '../Tabs';

const InnerPage = ({ children, ...props }) => {
  const { tabs } = props;

  return (
    <Fullscreen>
      <ContentWithHeader>
        <>
          <Box padding="2px">
            <Logo />
          </Box>
          <Box padding="2px">
            <SearchBox />
          </Box>
        </>
        <Tabs {...{ tabs }} />
      </ContentWithHeader>
    </Fullscreen>
  );
};

export default InnerPage;
