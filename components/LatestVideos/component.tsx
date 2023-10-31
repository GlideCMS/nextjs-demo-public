import Image from "next/image";
import styles from "./latest-videos.module.scss";
import classNames from "classnames";
import { useEffect } from "react";
import { LatestVideoScroller } from "./scroller";

const LatestVideos = (widgetData) => {
  useEffect(() => {
    new LatestVideoScroller();
  });
  try {
    return (
      <div className={classNames("row", "no-gutters", styles.acTopArticles)}>
        <div className={classNames("col")}>
          <div className={styles.acLatestVideosTagWrapper} style={{borderBottomColor: widgetData.data.activeTaxonomyColor}}>
            <div
              className={styles.acLatestVideosTag}
              style={{backgroundColor: widgetData.data.activeTaxonomyColor }}
            >
              Latest Videos
            </div>
          </div>

          <div
            className={classNames(
              styles.acLatestVideosLeftArrow,
              "js-ac-left-scroll"
            )}
          >
            <div className={styles.acLatestVideosLeftArrowContainer}></div>
          </div>
          <div
            className={classNames(
              styles.acLatestVideosScroller,
              "js-ac-scroller"
            )}
          >
            <div className={styles.acLatestVideosItemsWrapper}>
              {widgetData.data.latestVideosArticles ? (
                <div
                  className={classNames(
                    styles.acLatestVideosItems,
                    "js-ac-carousel"
                  )}
                >
                  {widgetData.data.latestVideosArticles.map(
                    (latestVideosArticles) => {
                      return (
                        <div className={styles.acLatestVideosItem}>
                          <a
                            href={latestVideosArticles.path}
                            className={styles.acPromoTextColor}
                          >
                            <picture>
                              <Image
                                className={classNames(
                                  styles.acLatestVideosItem,
                                  "lazyload"
                                )}
                                src={
                                  widgetData.data.mediaPath +
                                  latestVideosArticles.imageUrlVideoThumbnail
                                }
                                alt={latestVideosArticles.alt}
                                style={{
                                  borderTopColor:
                                    latestVideosArticles.taxonomyColor,
                                }}
                                width="240"
                                height="135"
                                sizes="100vw"
                                layout="responsive"
                                //style={{ width: "100%", height: "auto" }}
                              ></Image>
                              <source
                                media="min-width: 1025px"
                                srcSet={
                                  latestVideosArticles.imageUrlVideoThumbnail
                                }
                              ></source>
                              <source
                                media="min-width: 663px"
                                srcSet={
                                  latestVideosArticles.imageUrlVideoThumbnailLarge
                                }
                              ></source>
                              <source
                                media="max-width: 662px"
                                srcSet={
                                  latestVideosArticles.imageUrlVideoThumbnail
                                }
                              ></source>
                            </picture>
                            <div className={styles.acLatestVideosTextWrapper}>
                              <p className={styles.acLatestVideosTitle}>
                                {latestVideosArticles.headline}
                              </p>
                            </div>
                            <span
                              className={styles.acLatestVideosPlayIcon}
                            ></span>
                          </a>
                        </div>
                      );
                    }
                  )}
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div
            className={classNames(
              styles.acLatestVideosRightArrow,
              "js-ac-right-scroll"
            )}
          >
            <div className={styles.acLatestVideosRightArrowContainer}></div>
          </div>
        </div>
      </div>
    );
  } catch (e) {
    console.log("Failed to render HtmlSnippet widget.", e);
  }
};

export default LatestVideos;
