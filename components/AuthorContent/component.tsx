import Image from "next/image";
import styles from "./author-content.module.scss";
import classNames from "classnames";

const AuthorContent = (widgetData) => {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <div className= {classNames("row", "no-gutters", styles.acAuthor)}>
        <div className={classNames("col-sm-5",styles.acAuthorImgWrapper)}>
          <img
            className={styles.acAuthorImg} 
            src={widgetData?.data?.authorImage}
            alt=""
          />
        </div>

        <div className={classNames("col-sm-7",styles.acAuthorAbout)}>
          <h1 className={styles.acAuthorDescriptionTitle}>
            {" "}
            {widgetData?.data?.authorData?.name}{" "}
          </h1>
          <p>{widgetData?.data?.authorData.about}</p>
        </div>
      </div>
    </>
  );
};
export default AuthorContent;
