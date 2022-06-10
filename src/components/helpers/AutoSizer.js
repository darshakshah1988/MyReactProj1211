import React from 'react';
import { withContentRect } from 'react-measure';

const AutoSizer = withContentRect('bounds')(({ children, ...props }) => {
  const childrenWithProps = React.Children.map(
    children,
    child =>
      React.isValidElement(child) ? React.cloneElement(child, props) : child
  );

  return (
    //NOTE: Height has to be limited due to an unknown bug, which keeps on increasing the height.
    <div ref={props.measureRef} style={{ height: '90%' }}>
      {props.contentRect.bounds.width && childrenWithProps}
    </div>
  );
});

export default AutoSizer;
