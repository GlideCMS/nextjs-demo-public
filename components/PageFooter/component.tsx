import Image from "next/image";
import styles from "./page-footer.module.scss";
import classNames from "classnames";
import { CustomNextImage } from "../Common/Image/image";
import React from "react";

const PageFooter = (widgetData) => {
  try {
    return (
      <footer className={styles.acFooter}>
        <div className={classNames("row", "no-gutters", styles.acFooterInner)}>
          <div className={styles.acFooterFirstCol}>
            <div className={styles.acFooterCopyrightText}>
              ©{widgetData.data.year} GPP
              <span style={{ display: "none" }} className={styles.acAppVersion}>
                v {widgetData.data.appVersion}{" "}
                {widgetData.data.gitCommit ? widgetData.data.gitCommit : "-"}
              </span>
            </div>

            <div className={styles.acFooterTopMenu}>
              <ul
                className={classNames("gd-menu", styles.acFooterTopMenuList)}
                aria-label=""
                role="list"
              >
                {widgetData?.data?.menuItems?.topMenu?.map((topMenu) => {
                  return (
                    <li
                      role="menuItem"
                      //style={topMenu.itemStyles ? topMenu.itemStyles : ""}
                      className={classNames(
                        "gd-menu-item",
                        topMenu.itemClass,
                        topMenu.isActive ? "gd-menu-item--active" : ""
                      )}
                    >
                      <a
                        className={classNames(
                          "gd-menu__link",
                          topMenu.linkClass
                        )}
                        //style={topMenu.linkStyle ? topMenu.linkStyle : ""}
                        rel={topMenu.noOpener ? "noopener" : ""}
                        href={topMenu.url}
                      >
                        {topMenu.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className={styles.acFooterBottomMenu}>
              <ul
                className={classNames("gd-menu", styles.acFooterBottomMenuList)}
                aria-label=""
                role="list"
              >
                {widgetData?.menuItems?.bottomMenu?.map((bottomMenu, index) => {
                  return (
                    <li
                      key={"footeritem-" + index}
                      role="menuItem"
                      //style={bottomMenu.itemStyles ? bottomMenu.itemStyles : ""}
                      className={classNames(
                        "gd-menu-item",
                        bottomMenu.itemClass,
                        bottomMenu.isActive ? "gd-menu-item--active" : ""
                      )}
                    >
                      <a
                        className={classNames(
                          "gd-menu__link",
                          bottomMenu.linkClass
                        )}
                        //style={bottomMenu.linkStyle ? bottomMenu.linkStyle : ""}
                        rel={bottomMenu.noOpener ? "noopener" : ""}
                        href={bottomMenu.url}
                      >
                        {bottomMenu.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className={styles.acFooterBottomMenu}>
              {widgetData?.data?.menuItems?.optionalMenus?.map(
                (optionalMenus) => {
                  return (
                    <ul
                      className={classNames(
                        "gd-menu",
                        styles.acFooterBottomMenuList
                      )}
                      aria-label=""
                      role="list"
                    >
                      <li
                        role="menuItem"
                        /* style={
                          optionalMenus.itemStyles
                            ? optionalMenus.itemStyles
                            : ""
                        } */
                        className={classNames(
                          "gd-menu-item",
                          optionalMenus.itemClass,
                          optionalMenus.isActive ? "gd-menu-item--active" : ""
                        )}
                      >
                        <a
                          className={classNames(
                            "gd-menu__link",
                            optionalMenus.linkClass
                          )}
                          /* style={
                            optionalMenus.linkStyle
                              ? optionalMenus.linkStyle
                              : ""
                          } */
                          rel={optionalMenus.noOpener ? "noopener" : ""}
                          href={optionalMenus.url}
                        >
                          {optionalMenus.label}
                        </a>
                      </li>
                    </ul>
                  );
                }
              )}
            </div>
            <div className={styles.acFooterBottomMenu}>
              <ul
                className={classNames("gd-menu", styles.acFooterBottomMenuList)}
                aria-label=""
                role="list"
              >
                {widgetData?.data?.menuItems?.socialIconsMenu?.map(
                  (socialIconsMenu) => {
                    return (
                      <li
                        role="menuItem"
                        /* style={
                          socialIconsMenu.itemStyles
                            ? socialIconsMenu.itemStyles
                            : ""
                        } */
                        className={classNames(
                          "gd-menu-item",
                          socialIconsMenu.itemClass,
                          socialIconsMenu.isActive ? "gd-menu-item--active" : ""
                        )}
                      >
                        <a
                          className={classNames(
                            "gd-menu__link",
                            socialIconsMenu.linkClass
                          )}
                          /* style={
                            socialIconsMenu.linkStyle
                              ? socialIconsMenu.linkStyle
                              : ""
                          } */
                          rel={socialIconsMenu.noOpener ? "noopener" : ""}
                          href={socialIconsMenu.url}
                        >
                          {socialIconsMenu.label}
                        </a>
                      </li>
                    );
                  }
                )}
              </ul>
            </div>
          </div>

          <div className={styles.acFooterOpenCriticCol}>
            <p className={styles.acFooterOpenCriticColTop}>
              Find us on Open Critic
            </p>
            <a
              href="https://opencritic.com/outlet/820/altchar"
              className={styles.acFooterOpenCriticLink}
            >
              <CustomNextImage
                {...widgetData.data.openCriticLogo}
                alt="OpenCritic"
              ></CustomNextImage>
            </a>
            <p className={styles.acFooterOpenCriticBottom}>
              Our reviews are published on OpenCritic platform.
            </p>
          </div>
          <div className={classNames("col-sm-4", styles.acFooterSecondCol)}>
            <CustomNextImage
              {...widgetData.data.footerImage}
              alt="GPP"
            ></CustomNextImage>
          </div>
        </div>
      </footer>
    );
  } catch (e) {
    console.log("Failed to render HtmlSnippet widget.", e);
  }
};

export default PageFooter;
