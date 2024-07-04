import styles from "./base-gpp.module.scss";
import Image from "next/image";
import logo from "./assets/glide logo white.webp";
import Link from "next/link";
import folder from "./assets/Path 1074.svg";
import bulb from "./assets/bulb.png";
export default function BaseGppLanding(props) {
  console.log(props);
  return (
    <div className={styles.gppLandingWrapper}>
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      ></link>
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap"
        rel="stylesheet"
      ></link>
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap&displayName=RobotoRegular"
        rel="stylesheet"
      ></link>
      <div className={styles.gppLandingContainer}>
        <Image
          src={logo}
          alt="Glide Publishing Platform"
          className={styles.gppMainLogo}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }} // optional
        ></Image>
        <div className={styles.gppMainTitle}>
          Welcome to GPP's Next.js Bootstrap app
        </div>
        {props.noPagesConfigured ? (
          <div className={styles.gppLandingStandfirst}>
            <span style={{ fontSize: "40px" }}>&#127881;</span>
            <br></br>
            Your environment details are correct, you can start with application
            setup.
            <br></br> For more details check our documentation examples or
            contact us through support.
          </div>
        ) : (
          <></>
        )}
        {props.environmentInvalid ? (
          <>
            {" "}
            <div className={styles.gppLandingStandfirst}>
              Your environment hasn't been configured, please contact your{" "}
              <br></br> GPP representative for environment details.
            </div>
            <Link
              className={styles.gppContactUs}
              href={"https://gpp.io/contact-us"}
              target="_blank"
            >
              Contact Us
            </Link>
          </>
        ) : (
          <></>
        )}
        <div className={styles.gppMetaBlock}>
          <div className={styles.gppDocsBlock}>
            <div className={styles.gppBlockTitle}>Documentation</div>
            <ul className={styles.gppMetaList}>
              <li style={{ listStyleType: "none" }}>
                <span>
                  <Image src={folder} alt="Documentation"></Image>
                </span>
                <a
                  target="_blank"
                  href="https://support.gpp.io/hc/en-gb/articles/4407115975058-Getting-started-with-Glide"
                >
                  Getting Started with Glide
                </a>
              </li>

              <li style={{ listStyleType: "none" }}>
                <span>
                  <Image src={folder} alt="Documentation"></Image>
                </span>
                <a
                  target="_blank"
                  href="https://support.gpp.io/hc/en-gb/articles/360006727940-Glide-Publishing-Platform-Overview"
                >
                  GPP Overview
                </a>
              </li>
              <li style={{ listStyleType: "none" }}>
                <span>
                  <Image src={folder} alt="Documentation"></Image>
                </span>
                <a
                  target="_blank"
                  href="https://support.gpp.io/hc/en-gb/sections/360004112980-Site-Builder"
                >
                  GPP Site Builder
                </a>
              </li>
              <li style={{ listStyleType: "none" }}>
                <span>
                  <Image src={folder} alt="Documentation"></Image>
                </span>
                <a
                  target="_blank"
                  href="https://support.gpp.io/hc/en-gb/categories/360001394200-User-documentation"
                >
                  All documentation
                </a>
              </li>
            </ul>
          </div>
          <div className={styles.gppDocsBlock}>
            <div className={styles.gppBlockTitle}>Examples</div>
            <ul className={styles.gppMetaList}>
              <li style={{ listStyleType: "none" }}>
                <span>
                  <Image src={bulb} alt="Example"></Image>
                </span>
                <a target="_blank" href="/docs">
                  Example 1
                </a>
              </li>
              <li style={{ listStyleType: "none" }}>
                <span>
                  <Image src={bulb} alt="Example"></Image>
                </span>
                <a target="_blank" href="/docs">
                  Example 2
                </a>
              </li>
              <li style={{ listStyleType: "none" }}>
                <span>
                  <Image src={bulb} alt="Example"></Image>
                </span>
                <a target="_blank" href="/docs">
                  Example 3
                </a>
              </li>
              <li style={{ listStyleType: "none" }}>
                <span>
                  <Image src={bulb} alt="Example"></Image>
                </span>
                <a target="_blank" href="/docs">
                  Example 4
                </a>
              </li>
            </ul>
          </div>
          <div className={styles.gppDocsBlock}>
            <div className={styles.gppBlockTitle}>Support</div>
            <ul className={styles.gppMetaList}>
              <li style={{ listStyleType: "none" }}>
                For any additional information or assistance, contact us via our
                support portal.
              </li>

              <li style={{ listStyleType: "none" }}>
                <a
                  target="_blank"
                  className={styles.gppMainSupport}
                  href="https://glidecms.zendesk.com/agent/dashboard"
                >
                  GPP Support
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
