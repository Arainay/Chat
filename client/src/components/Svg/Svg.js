import React from 'react';

const Svg = ({ content, className, ...props }) => (
  <div
    {...props}
    className={className}
    dangerouslySetInnerHTML={{ __html: content }}
  />
);

export default Svg;
