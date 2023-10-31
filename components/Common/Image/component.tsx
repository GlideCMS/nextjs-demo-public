import classNames from "classnames";
import Image from "next/image";
import { CustomNextImage } from "./image";

const ArticleImage = (widgetData) => {
  return (
    <CustomNextImage
      src={widgetData.data.src}
      sizes="100vw"
      alt={widgetData.data.alt}
      className={classNames("gd-picture__img--responsive", "lazyload")}
    ></CustomNextImage>
  );
};

export default ArticleImage;
