import styles from "./article-header.module.scss";
import { CustomNextImage } from "../Common/Image/image";
import React from "react";

const ArticleHeader = (widgetData) => {
  const {
    headline,
    articleTaxonomyName,
    articleTaxonomyColor,
    authorList,
    publishedAt,
    updatedAt,
    showUpdateAt,
    url,
    promoImage,
    imageUrl,
    caption,
    credit,
    alt,
    imageHeightPercentage,
  } = widgetData.data;

  try {
    return (
      <>
        <div>
          <div
            className={styles.acArticleHeaderTagWrapper}
            style={{ borderBottomColor: `${articleTaxonomyColor}` }}
          >
            <div
              className={styles.acArticleHeaderTag}
              style={{ backgroundColor: `${articleTaxonomyColor}` }}
            >
              {widgetData.data.articleTaxonomyName}
            </div>
          </div>

          <div className={styles.acArticleHeaderInner}>
            <h1 className={styles.acArticleHeaderTitle}>{headline}</h1>
            <div
              className={`${styles.acArticleHeaderMoreInfo} row justify-content-between no-gutters`}
            >
              {authorList?.length > 0 && (
                <div
                  className={`col-12 ${styles.acArticleHeaderBylineWrapper}`}
                >
                  <span className="glyphicon glyphicon-pencil"></span>
                  {authorList?.map((author) => {
                    return (
                      <a
                        className={styles.acArticleHeaderByline}
                        href={`/author/${author.url}/articles/1`}
                        data-author-name={author.name}
                      >
                        {author.name}
                      </a>
                    );
                  })}
                </div>
              )}
              {showUpdateAt && (
                <div
                  className={`col-12 ${styles.acArticleHeaderPublishDateWrapper}`}
                >
                  <span>
                    {" "}
                    Updated:
                    <span className={styles.acArticleHeaderPublishDate}>
                      {updatedAt}
                    </span>
                  </span>
                </div>
              )}
              <div
                className={`col-12 ${styles.acArticleHeaderPublishDateWrapper}`}
              >
                <span>
                  {" "}
                  Published:
                  <span className={styles.acArticleHeaderPublishDate}>
                    {publishedAt}
                  </span>
                </span>

                <div
                  className={`${styles.acShareArticleInner} js-share-article ${styles.acShareArticleInnerDesktop} share-widget js-share-widget`}
                >
                  <div
                    id="reddit"
                    className={`${styles.acArticleShareIcon} share-icon share-widget-icons`}
                    data-url={url}
                    data-text={headline}
                  >
                    <span className={styles.acShareArticleRedditIcon}></span>
                  </div>
                  <div
                    id="twitter"
                    className={`${styles.acArticleShareIcon} share-icon share-widget-icons`}
                    data-url={url}
                    data-text={headline}
                  >
                    <span className={styles.acShareArticleTwitterIcon}></span>
                  </div>
                  <div
                    id="pocket"
                    className={`${styles.acArticleShareIcon} share-icon share-widget-icons`}
                    data-url={url}
                    data-text={headline}
                  >
                    <span className={styles.acShareArticlePocketIcon}></span>
                  </div>
                </div>
              </div>

              {imageUrl && (
                <div className={styles.acArticleHeaderImage}>
                  {credit &&
                    credit.map((credit) => {
                      return (
                        <div className={styles.cArticleHeaderCredit}>
                          {credit}
                        </div>
                      );
                    })}
                  <div className={styles.acArticleHeaderImgWrapper}>
                    <CustomNextImage
                      src={imageUrl}
                      alt={alt ? alt : "GPP"}
                      className={`${styles.acArticleHeaderImg} lazyload`}
                    ></CustomNextImage>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          className={`${styles.acShareArticleInner} js-share-article ${styles.acShareArticleInnerMobile} share-widget js-share-widget`}
        >
          <div
            id="reddit-mobile"
            className={`${styles.acArticleShareIcon} ${styles.shareWidgetIcons}`}
            data-url={url}
            data-text={headline}
          >
            <span className={styles.acShareArticleRedditIcon}></span>
          </div>
          <div
            id="twitter-mobile"
            className={`${styles.acArticleShareIcon} ${styles.shareWidgetIcons}`}
            data-url={url}
            data-text={headline}
          >
            <span className={styles.acShareArticleTwitterIcon}></span>
          </div>
          <div
            id="facebook-mobile"
            className={`${styles.acArticleShareIcon} ${styles.shareWidgetIcons}`}
            data-url={url}
            data-text={headline}
          >
            <span className={styles.acShareArticleFbIcon}></span>
          </div>
          <a
            id="pocket-mobile"
            className={`${styles.acArticleShareIcon} ${styles.shareWidgetIcons}`}
            data-url={url}
            data-text={headline}
          >
            <span className={styles.acShareArticlePocketIcon}></span>
          </a>
        </div>
      </>
    );
  } catch (e) {
    console.log("Failed to render Article Header widget.", e);
  }
};

export default ArticleHeader;
