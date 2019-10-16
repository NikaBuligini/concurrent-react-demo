import React from 'react';
import createResource from './createResource';

const ImageResource = createResource(
  src =>
    new Promise(resolve => {
      const img = new Image();
      img.onload = () => resolve(src);
      img.src = src;
    }),
);

const Img = ({ src, alt, ...rest }) => <img src={ImageResource.read(src)} alt={alt} {...rest} />;

export default Img;
