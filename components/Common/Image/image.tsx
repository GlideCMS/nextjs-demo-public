import Image from "next/image";
import { useState } from "react";

export const CustomNextImage = (props) => {
  const [src, setSrc] = useState(props.src);
  return (
    <Image
      src={src}
      alt={props.alt || "GPP"}
      onError={(e) => {
        setSrc("/images/image-not-found.svg");
      }}
      width={1}
      height={1}
      sizes="100vw"
      //fill
      style={{ width: "100%", height: "auto" }}
      {...props}
    ></Image>
  );
};
