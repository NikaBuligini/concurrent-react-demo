import { DetailedHTMLProps, ImgHTMLAttributes, VFC } from "react";
import { createAsset } from "./createAsset";

const imageAsset = createAsset<string, [string]>(
  (src) =>
    new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve(src)
      };
      img.src = src;
    })
);

type Props = DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
> & {
  src: string;
};

export const Img: VFC<Props> = ({ src, alt, ...rest }) => {
  return (
    <img src={imageAsset.read(src)} alt={alt} {...rest} />
  )
};
