import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStylesContainer = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  bar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  content: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
}));

const ContentWithHeader = ({ children: [Header, Content] }) => {
  const classesContainer = useStylesContainer();

  return (
    <div {...{ className: classesContainer.root }}>
      <div {...{ className: classesContainer.bar }}>{Header}</div>
      <div {...{ className: classesContainer.content }}>{Content}</div>
    </div>
  );
};

export default ContentWithHeader;
