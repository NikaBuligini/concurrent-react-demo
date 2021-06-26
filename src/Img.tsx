import { DetailedHTMLProps, ImgHTMLAttributes, VFC } from 'react';
import createResource from './createResource';

const ImageResource = createResource<string, string>(
  src =>
    new Promise(resolve => {
      const img = new Image();
      img.onload = () => resolve(src);
      img.src = src;
    }),
);

type Props = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {
  src: string;
};

export const Img: VFC<Props> = ({ src, alt, ...rest }) => <img src={ImageResource.read(src)} alt={alt} {...rest} />;
