import Image from "next/image";
import styles from "./editors-picks.module.scss";
import classNames from "classnames";

const EditorsPicks = (widgetData) => {
  //console.log(":::::", widgetData);
  const resolvePositionClassName = (article) => {
    const index = widgetData.data.articleList.indexOf(article);
    if (index === 0) {
      return styles.acTopArticlesPositionFirst;
    } else if (index === widgetData.data.articleList.length - 1) {
      return styles.acTopArticlesPositionLast;
    }
    return styles.acTopArticlesPositionMiddle;
  };
  return (
    <div className={classNames("row", "no-gutters", styles.acTopArticles)}>
      <div
        className={styles.acTopArticlesTagWrapper}
        style={{ borderBottomColor: widgetData.data.activeTaxonomyColor }}
      >
        <div
          className={styles.acTopArticlesTag}
          style={{ backgroundColor: widgetData.data.activeTaxonomyColor }}
        >
          {widgetData.data.label}
        </div>
      </div>
      {widgetData.data.articleList.map((article) => {
        return (
          <div
            key={article.glideId}
            className={styles.acTopArticlesEpTile}
            style={{ borderLeft: "5px solid " + article.taxonomyColor }}
          >
            <a
              href={article.url}
              className={classNames(
                styles.acTopArticlesEpLink,
                styles.acPromoTextColor
              )}
            >
              <h2 className={styles.acTopArticlesEpTitleNew}>
                {article?.headline}
              </h2>
              <div className={styles.acTopArticlesEpSubtitleWrapper}>
                <div
                  className={
                    (styles.acTopArticlesEpPositionWrapper,
                    styles.acTopArticlesEpPositionWrapper,
                    resolvePositionClassName(article))
                  }
                >
                  <div className={styles.acTopArticlesPosition}>
                    {article.position}
                  </div>
                </div>
                {article.imageUrl ? (
                  <Image
                    className={classNames(
                      styles.acTopArticlesEpImg,
                      "lazyload"
                    )}
                    src={article.imageUrl}
                    alt={article.alt}
                    style={{ borderTopColor: article.taxonomyColor }}
                    width="0"
                    height="0"
                    sizes="100vw"
                  ></Image>
                ) : (
                  <></>
                )}
                <div className={styles.acTopArticlesTextWrapper}>
                  <h2 className={styles.acTopArticlesTitle}>
                    {article?.headline}
                  </h2>
                  <h3
                    className={
                      styles.acMostReadArticlesBottomColSubtitleEditorPicks
                    }
                  >
                    {article.standfirst}
                  </h3>
                </div>
              </div>
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default EditorsPicks;
