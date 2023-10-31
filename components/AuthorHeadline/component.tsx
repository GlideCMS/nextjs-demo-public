import Image from "next/image";
import styles from "./author-headline.module.scss";

const AuthorHeadline = (widgetData) => {
  return (
    <div className={styles.acAuthorHeaderTagWrapper} >
      <div
        className={styles.acAuthorHeaderTag}
      >
        Authors
      </div>
    </div>
  );
};
export default AuthorHeadline;