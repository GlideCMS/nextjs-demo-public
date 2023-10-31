import Image from "next/image";
import styles from "./page-header.module.scss";
import { useEffect } from "react";
import { CustomNextImage } from "../Common/Image/image";
const classNames = require("classnames");

const PageHeader = (widgetData) => {
  useEffect(() => {
    class MainNavigation {
      private href = window.location.href;

      constructor() {
        this.bindMobileNavigationEvent();
        // this.addActiveClass();
      }

      private bindMobileNavigationEvent = () => {
        document
          .getElementById("hamburger-icon")
          .addEventListener("click", () => {
            const isMenuDisplayed = document
              .querySelector(".ac-top-level-menu__list")
              .classList.contains("show");
            if (isMenuDisplayed) {
              // remove show clas
              document
                .querySelector(".ac-top-level-menu__list")
                .classList.remove("show");
            } else {
              // add show class
              document.querySelector(".ac-top-level-menu__list").className +=
                " show";
            }
          });
      };
      /*
      private addActiveClass = () => {
        const navigation = document.querySelectorAll('.ac-top-level-menu__list-item a');
    
        navigation.forEach(nav => {
          if (nav.getAttribute('href') === location.pathname) {
            nav.className += ' js-active';
          }
        });
      };*/
    }

    const mn = new MainNavigation();

    // =============== Google analytics tracker BEGIN ===============
    //@ts-ignore
    declare const window: any;
    window.dataLayer = window.dataLayer || [];

    const googleAnalyticsCustomDimensionTracking = () => {
      let tracker;
      if (document.querySelector(".js-share-widget")) {
        tracker = document.querySelector(".js-share-widget");
      } else {
        tracker = document.querySelector(".js-main-tracking");
      }
      const author = document.querySelector(".ac-article-header__byline");
      let trackingId;

      if (tracker) {
        trackingId = (tracker as HTMLElement).dataset.trackingid;
      }

      let authorName;

      if (author) {
        authorName = (author as HTMLElement).dataset.authorName;
      }

      let games = window.dataLayer.find((i) => i.articleTaxonomies);

      if (
        games &&
        games.articleTaxonomies &&
        !games.articleTaxonomies
          .split("")
          .every((char) => char === games.articleTaxonomies[0])
      ) {
        games = games.articleTaxonomies
          .split(",")
          .map((i) => {
            if (i.includes("-")) {
              return i
                .split("-")
                .map((i2) => i2[0].toUpperCase() + i2.slice(1))
                .join(" ");
            } else {
              return i.charAt(0).toUpperCase() + i.slice(1);
            }
          })
          .join(",");
      } else if (games && games.primaryTaxonomy) {
        if (games.primaryTaxonomy.includes("-")) {
          games = games.primaryTaxonomy
            .split("-")
            .map((i2) => i2.charAt(0).toUpperCase() + i2.slice(1))
            .join(" ");
        } else {
          games =
            games.primaryTaxonomy.charAt(0).toUpperCase() +
            games.primaryTaxonomy.slice(1);
        }
      }
      const audioWrapper = document.querySelector(".article-audio");
      const audio = document.querySelector(
        "#article-audio__item"
      ) as HTMLAudioElement;

      let section;
      let pageViewObj = {};
      if (authorName && games) {
        pageViewObj["dimension1"] = authorName;
        pageViewObj["dimension2"] = games;
      } else if (authorName && !games) {
        pageViewObj["dimension1"] = authorName;
      } else if (!authorName && games) {
        section =
          window.dataLayer.find((i) => i.primaryTaxonomy)?.primaryTaxonomy ||
          "";
        section = section && section[0]?.toUpperCase() + section.slice(1);
        pageViewObj["dimension1"] = section;
        pageViewObj["dimension2"] = games;
      } else if (!authorName && !games) {
        section = window.dataLayer[0]?.primaryTaxonomy || "";
        section = section === "" ? "home" : section;
        section = section && section[0].toUpperCase() + section.slice(1);
        pageViewObj["dimension1"] = section;
      }

      // send pageview only if audio exists
      if (tracker && audioWrapper) {
        pageViewObj["dimension7"] = audioWrapper.classList.contains("visible")
          ? "yes"
          : "no";
      }
      if (
        tracker &&
        audioWrapper &&
        audioWrapper.classList.contains("visible")
      ) {
        pageViewObj["dimension7"] = audioWrapper.classList.contains("visible")
          ? "yes"
          : "no";
        pageViewObj["dimension5"] = audio?.dataset?.voiceVariant || "";
      }
      //@ts-ignore
      //ga("set", pageViewObj);
      //@ts-ignore
      //ga("send", "pageview");
    };

    const handleGoogleAnalyticsEvents = () => {
      const selectors = {
        fb: document.querySelector("#facebook"),
        fbMobile: document.querySelector("#facebook-mobile"),
        tw: document.querySelector("#twitter"),
        twMobile: document.querySelector("#twitter-mobile"),
        pocket: document.querySelector("#pocket"),
        pocketMobile: document.querySelector("#pocket-mobile"),
        reddit: document.querySelector("#reddit"),
        redditMobile: document.querySelector("#reddit-mobile"),
      };

      ["click"].forEach((event) => {
        if (selectors.fb) {
          selectors.fb.addEventListener(event, () => {
            /* FB.ui({
              method: 'share',
              href: window.location.href,
            }); */
            const headline = document.querySelector(
              ".ac-article-header__title"
            );
            const params = {
              category: "Facebook article",
              action: "share",
              label: (headline as HTMLElement).innerText,
            };
          });
        }

        if (selectors.fbMobile) {
          selectors.fbMobile.addEventListener(event, () => {
            const headline = document.querySelector(
              ".ac-article-header__title"
            );
            const params = {
              category: "Facebook article",
              action: "share",
              label: (headline as HTMLElement).innerText,
            };
          });
        }

        if (selectors.tw) {
          selectors.tw.addEventListener(event, () => {
            const dataUrl = (selectors.tw as HTMLElement).dataset.url;
            const dataText = (selectors.tw as HTMLElement).dataset.text;
            let twitterHref = "https://twitter.com/intent/tweet?url=" + dataUrl;

            if (typeof dataText !== "undefined" && dataText !== null) {
              twitterHref =
                "https://twitter.com/intent/tweet?url=" +
                dataUrl +
                "&text=" +
                dataText;
            }
            window.open(
              twitterHref,
              "",
              "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600"
            );
            const headline = document.querySelector(
              ".ac-article-header__title"
            );

            const params = {
              category: "Twitter article",
              action: "share",
              label: (headline as HTMLElement).innerText,
            };
          });
        }

        if (selectors.twMobile) {
          selectors.twMobile.addEventListener(event, () => {
            const dataUrl = (selectors.twMobile as HTMLElement).dataset.url;
            const dataText = (selectors.twMobile as HTMLElement).dataset.text;
            let twitterHref = "https://twitter.com/intent/tweet?url=" + dataUrl;

            if (typeof dataText !== "undefined" && dataText !== null) {
              twitterHref =
                "https://twitter.com/intent/tweet?url=" +
                dataUrl +
                "&text=" +
                dataText;
            }
            window.open(
              twitterHref,
              "",
              "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600"
            );
            const headline = document.querySelector(
              ".ac-article-header__title"
            );

            const params = {
              category: "Twitter article",
              action: "share",
              label: (headline as HTMLElement).innerText,
            };
          });
        }

        if (selectors.pocket) {
          selectors.pocket.addEventListener(event, () => {
            const pocketUrl = window.location.href;
            const href =
              "https://getpocket.com/edit?url=" + encodeURIComponent(pocketUrl);
            (selectors.pocket as any).href = href;

            const headline = document.querySelector(
              ".ac-article-header__title"
            );
            const params = {
              category: "Pocket article",
              action: "share",
              label: (headline as HTMLElement).innerText,
            };
          });
        }

        if (selectors.pocketMobile) {
          selectors.pocketMobile.addEventListener(event, () => {
            const pocketUrl = window.location.href;
            const href =
              "https://getpocket.com/edit?url=" + encodeURIComponent(pocketUrl);
            (selectors.pocketMobile as any).href = href;

            const headline = document.querySelector(
              ".ac-article-header__title"
            );
            const params = {
              category: "Pocket article",
              action: "share",
              label: (headline as HTMLElement).innerText,
            };
          });
        }

        if (selectors.reddit) {
          selectors.reddit.addEventListener(event, () => {
            const redditText = (selectors.reddit as HTMLElement).dataset.text;
            let mainUrl = (selectors.reddit as HTMLElement).dataset.url;
            if (typeof mainUrl === "undefined" || mainUrl === null) {
              mainUrl = window.location.href;
            }
            const redditUrl =
              "//www.reddit.com/submit?title=" +
              redditText +
              "&url=" +
              encodeURIComponent(mainUrl);
            const href = redditUrl;
            window.open(
              href,
              "",
              "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=900"
            );
            const headline = document.querySelector(
              ".ac-article-header__title"
            );
            const params = {
              category: "Reddit article",
              action: "share",
              label: (headline as HTMLElement).innerText,
            };
          });
        }

        if (selectors.redditMobile) {
          selectors.redditMobile.addEventListener(event, () => {
            const redditText = (selectors.redditMobile as HTMLElement).dataset
              .text;
            let mainUrl = (selectors.redditMobile as HTMLElement).dataset.url;
            if (typeof mainUrl === "undefined" || mainUrl === null) {
              mainUrl = window.location.href;
            }
            const redditUrl =
              "//www.reddit.com/submit?title=" +
              redditText +
              "&url=" +
              encodeURIComponent(mainUrl);
            const href = redditUrl;
            window.open(
              href,
              "",
              "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=900"
            );
            const headline = document.querySelector(
              ".ac-article-header__title"
            );
            const params = {
              category: "Reddit article",
              action: "share",
              label: (headline as HTMLElement).innerText,
            };
          });
        }
      });
    };
    googleAnalyticsCustomDimensionTracking();
  });

  try {
    return (
      <>
        <div className={styles.acBlankHeader}></div>
        <nav className={styles.acGlobalNavigation}>
          <div
            className={classNames(styles.acTopLevelMenu, styles.jsMainTracking)}
          >
            <div className={styles.acTopLevelMenuSectionWidth}>
              {widgetData.data.logoImage ? (
                <a href="/">
                  <CustomNextImage
                    className={styles.acHeaderLogo}
                    src={widgetData.data.logoImage}
                    alt="GPP"
                  ></CustomNextImage>
                </a>
              ) : (
                <></>
              )}
              <input
                className={styles.acTopLevelMenuBtn}
                type="checkbox"
                id="menu-btn"
              />
              <label
                className={styles.acTopLevelMenuIcon}
                htmlFor="menu-btn"
                id="hamburger-icon"
              >
                <span className={styles.acTopLevelMenuNavicon}></span>
              </label>
              <ul
                className={classNames(
                  styles.acTopLevelMenuList,
                  "ac-top-level-menu__list"
                )}
              >
                {widgetData.data.navItems.map((k, i) => {
                  return (
                    <li
                      key={"headeritem-" + i}
                      className={styles.acTopLevelMenuListItem}
                      style={{
                        borderTopColor: k.color,
                        borderTopWidth: "3px",
                        borderTopStyle: "solid",
                      }}
                    >
                      <a
                        href={k.url}
                        className={classNames(
                          styles.acTopLevelMenuLink,
                          styles.acTopLevelMenuLinkActive,
                          k.isActive ? styles.jsActive : ""
                        )}
                      >
                        {k.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </nav>
      </>
    );
  } catch (e) {
    console.log("Failed to render PageHeader widget.", e);
  }
};

export default PageHeader;

// ============== Google analytics tracker END ==============
