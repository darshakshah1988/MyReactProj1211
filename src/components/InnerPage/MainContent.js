import React from 'react';
import { useState } from 'react';
import { Box, Paper } from '@material-ui/core';
import { keys } from '@laufire/utils/collection';
import ContentWithHeader from '../ContentWithHeader';
import Toolbar from '../Toolbar';
import Breadcrumbs from './Breadcrumbs';
import DownloadMenu from './DownloadMenu';
import HelpButton from './HelpButton';
import ViewMenu from './ViewMenu';

const marginSize = 1.5;

const MainContent = ({ children, ...props }) => {
  const { views } = props;
  const [view, setView] = useState(keys(views)[0]);
  const View = views[view];

  return (
    <Box
      style={{
        width: `calc(100% - ${marginSize * 2}em)`,
        paddingBottom: '4em',
      }}
    >
      <ContentWithHeader>
        <>
          <Box>
            <Breadcrumbs {...props} />
          </Box>
          <Box>
            <Toolbar>
              <ViewMenu {...{ views, value: view, onChange: setView }} />
              <DownloadMenu
                {...{
                  ...props,
                  actions: {
                    CSV: () => console.log('CSV'),
                    JSON: () => console.log('JSON'),
                    PNG: () => console.log('PNG'),
                  },
                }}
              />
              <HelpButton />
            </Toolbar>
          </Box>
        </>
        <Paper
          style={{
            width: `100%`,
            height: '100%',
          }}
        >
          <ContentWithHeader>
            <>{children}</>
            <View {...props} />
          </ContentWithHeader>
        </Paper>
      </ContentWithHeader>
    </Box>
  );
};

export default MainContent;
