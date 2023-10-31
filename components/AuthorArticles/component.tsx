import Image from "next/image";
import styles from "./author-articles.module.scss";
import classNames from "classnames";

const AuthorArticles = (widgetData) => {
  return (
    <>
      <div className={classNames("row", "no-gutters", styles.acEntityArticles)}>
        <div className={styles.acEntityArticlesTagWrapper}>
          <div
            className={classNames(
              styles.acEntityArticlesTag,
              styles.acBackgroundColor
            )}
          >
            {widgetData?.data?.authorName}'s articles
          </div>
        </div>
        {widgetData.data.articles.map((article) => {
          return (
            <div className={styles.acEntityArticlesTile}>
              <a
                href={article.path}
                className={
                  (styles.acEntityArticlesLink, styles.acPromoTextColor)
                }
              >
                <h2 className={styles.acEntityArticlesTitle}>
                  {article.headline}
                </h2>
                <div>
                  <div className={styles.imageWrapper}>
                    <img src={article.imageUrl} alt="" />
                  </div>
                  <div className={styles.acEntityArticlesTextWrapper}>
                    {article.standfirst}
                  </div>
                </div>
              </a>
            </div>
          );
        })}
      </div>
      <div className={styles.paginator}>
        <span className={styles.paginatorItem}>{"<< Previous"}</span>
        <span className={styles.paginatorItem}>1</span>
        <span className={styles.paginatorItem}>2</span>
        <span className={styles.paginatorItem}>3</span>
        <span className={styles.paginatorItem}>4</span>
        <span className={styles.paginatorItem}>6</span>
        <span className={styles.paginatorItem}>7</span>
        <span className={styles.paginatorItem}>8</span>
        <span className={styles.paginatorItem}>10</span>
        <span className={styles.paginatorItem}>11</span>
        <span className={styles.paginatorItem}>12</span>
        <span className={styles.paginatorItem}>{"Next>>"}</span>
      </div>
    </>
  );
};
export default AuthorArticles;
