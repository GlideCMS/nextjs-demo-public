import Image from "next/image";
import styles from "./latest-game-news.module.scss";
import classNames from "classnames";
import { CustomNextImage } from "../Common/Image/image";
import React from "react";

const LatestArticles = (widgetData) => {
  const devices = [
    styles.acLatestArticlesMobile,
    styles.acLatestArticlesTablet,
    styles.acLatestArticlesDesktop,
  ];
  try {
    return (
      <div className={classNames("row", "no-gutters", styles.acLatestArticles)}>
        <div
          className={styles.acLatestArticlesTagWrapper}
          style={{ borderBottomColor: widgetData.data.activeTaxonomyColor }}
        >
          <div
            className={styles.acLatestArticlesTag}
            style={{ backgroundColor: widgetData.data.activeTaxonomyColor }}
          >
            {widgetData.data.widgetConfiguration.title ||
              "Latest in this section"}
          </div>
        </div>

        <div className={styles.acLatestArticlesScroller}>
          <div className={styles.acLatestArticlesItemsWrapper}>
            <div className={styles.acLatestArticlesItems}>
              <div className={styles.acLatestArticlesItemsBlock}>
                {devices.map((k) => (
                  <div className={k}>
                    {widgetData.data.latestArticles.map(
                      (latestArticles, index) => {
                        return (
                          <>
                            {latestArticles &&
                            index <
                              widgetData.data.widgetConfiguration
                                .numberOfArticlesShownAsCards &&
                            k === styles.acLatestArticlesDesktop ? (
                              <div
                                className={classNames(
                                  "gc-col-sm-6",
                                  styles.acLatestArticlesItem
                                )}
                              >
                                <div className={styles.acLatestArticlesTile}>
                                  <a
                                    href={latestArticles.path}
                                    className={classNames(
                                      styles.acLatestArticlesLink,
                                      styles.acPromoTextColor
                                    )}
                                  >
                                    {/*  <picture className={styles.acLatestArticlesTile}> */}
                                    <CustomNextImage
                                      className={classNames(
                                        styles.acLatestArticlesImg,
                                        "lazyload"
                                      )}
                                      src={
                                        widgetData.data.mediaPath +
                                        latestArticles.imageUrl
                                      }
                                      alt={
                                        latestArticles.alt
                                          ? latestArticles.alt
                                          : "article-image"
                                      }
                                      style={{
                                        borderTopColor:
                                          latestArticles.taxonomyColor,
                                      }}
                                      sizes="100vw"
                                    ></CustomNextImage>
                                    {/*  </picture> */}
                                    <div
                                      className={
                                        styles.acLatestArticlesTextWrapper
                                      }
                                    >
                                      <h2
                                        className={styles.acLatestArticlesTitle}
                                      >
                                        {latestArticles.headline}
                                      </h2>
                                      <h3
                                        className={
                                          styles.acLatestArticlesSubtitle
                                        }
                                      >
                                        {latestArticles.standfirst}
                                      </h3>
                                    </div>
                                  </a>
                                </div>
                              </div>
                            ) : (
                              <></>
                            )}

                            {(latestArticles &&
                              index >=
                                widgetData.data.widgetConfiguration
                                  .numberOfArticlesShownAsCards &&
                              k === styles.acLatestArticlesDesktop) ||
                            (latestArticles &&
                              k === styles.acLatestArticlesTablet) ? (
                              <div
                                className={classNames(
                                  "col-12",
                                  styles.acLatestArticlesBottomColItem,
                                  styles.acLatestArticlesBottomColItemAbove1025
                                )}
                              >
                                <div
                                  className={
                                    styles.acLatestArticlesBottomColTile
                                  }
                                  style={{
                                    borderColor: latestArticles.taxonomyColor,
                                  }}
                                >
                                  <a
                                    href={latestArticles.path}
                                    className={classNames(
                                      styles.acLatestArticlesLink,
                                      styles.acPromoTextColor,
                                      styles.acLatestArticlesLinkWrapper
                                    )}
                                  >
                                    <h2
                                      className={
                                        styles.acLatestArticlesTitleNew
                                      }
                                    >
                                      {latestArticles.headline}
                                    </h2>
                                    <div
                                      className={
                                        styles.acLatestArticlesSubtitleWrapper
                                      }
                                    >
                                      <picture
                                        className={
                                          styles.acLatestArticlesPicture
                                        }
                                      >
                                        <CustomNextImage
                                          className={classNames(
                                            styles.acLatestArticlesBottomColImg,
                                            "lazyload"
                                          )}
                                          src={
                                            widgetData.data.mediaPath +
                                            latestArticles.imageUrl
                                          }
                                          alt={
                                            latestArticles.alt
                                              ? latestArticles.alt
                                              : "article-image"
                                          }
                                          style={{
                                            borderTopColor:
                                              latestArticles.taxonomyColor,
                                            maxWidth: "216px !important",
                                          }}
                                          sizes="100vw"
                                          //style={{ width: "100%", height: "auto" }}
                                        ></CustomNextImage>
                                      </picture>
                                      <div
                                        className={
                                          styles.acLatestArticlesBottomColTextWrapper
                                        }
                                      >
                                        <h2
                                          className={
                                            styles.acLatestArticlesBottomColTitle
                                          }
                                        >
                                          {latestArticles.headline}
                                        </h2>
                                        <h3
                                          className={
                                            styles.acLatestArticlesBottomColSubtitle
                                          }
                                          dangerouslySetInnerHTML={{
                                            __html: latestArticles.standfirst,
                                          }}
                                        ></h3>
                                      </div>
                                    </div>
                                  </a>
                                </div>
                              </div>
                            ) : (
                              <></>
                            )}

                            {latestArticles &&
                            k === styles.acLatestArticlesMobile ? (
                              <div
                                className={classNames(
                                  styles.acTopArticlesTile,
                                  styles.acLatestArticlesBottomCollItemBellow1025
                                )}
                                style={{
                                  borderLeft:
                                    "5px solid " + latestArticles.taxonomyColor,
                                }}
                              >
                                <a
                                  href={latestArticles.path}
                                  className={classNames(
                                    styles.acTopArticlesLink,
                                    styles.acPromoTextColor
                                  )}
                                >
                                  <h2 className={styles.acTopArticlesTitleNew}>
                                    {latestArticles.headline}
                                  </h2>
                                  <div
                                    className={
                                      styles.acTopArticlesSubtitleWrapper
                                    }
                                  >
                                    <CustomNextImage
                                      className={classNames(
                                        styles.acTopArticlesImg,
                                        "lazyload"
                                      )}
                                      src={
                                        widgetData.data.mediaPath +
                                        latestArticles.imageUrl
                                      }
                                      alt={
                                        latestArticles.alt
                                          ? latestArticles.alt
                                          : "article-image"
                                      }
                                      style={{
                                        borderTopColor:
                                          latestArticles.taxonomyColor,

                                        maxWidth: "216px !important",
                                      }}
                                    ></CustomNextImage>
                                    <div
                                      className={
                                        styles.acTopArticlesTextWrapper
                                      }
                                    >
                                      <h2 className={styles.acTopArticlesTitle}>
                                        {latestArticles.headline}
                                      </h2>
                                      <h3
                                        className={
                                          styles.acMostReadArticlesBottomColSubtitleEditorPicks
                                        }
                                      >
                                        {latestArticles.standfirst}
                                      </h3>
                                    </div>
                                  </div>
                                </a>
                              </div>
                            ) : (
                              <></>
                            )}
                          </>
                        );
                      }
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (e) {
    console.log("Failed to render HtmlSnippet widget.", e);
  }
};

export default LatestArticles;
