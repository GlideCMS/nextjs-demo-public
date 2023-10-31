import Link from "next/link";
import styles from "./link.module.scss";
export function ArticleLink(props) {
  return (
    <Link
      href={props.data.dataUrl}
      className={styles.acLink}
      target={props.data.target || "_self"}
    >
      {props.data.innerText}
    </Link>
  );
}
