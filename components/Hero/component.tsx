import Image from "next/image";
import styles from "./hero.module.scss";

const Hero = (widgetData) => {
  try {
    const mainArticle =
      widgetData?.data?.articles && widgetData.data.articles[0];
    const stories = widgetData?.data?.articles?.slice(1);
    return (
      <div className={styles.acHeroContainer}>
        <a href={mainArticle.data.path} className={styles.acHeroMain}>
          {mainArticle?.imageUrl && (
            <Image
              src={mainArticle.imageUrl}
              alt={mainArticle.data.headline}
              width={100}
              height={100}
              layout="responsive"
            ></Image>
          )}
          <div className={styles.acCardWrapper}>
            <div className={styles.acHeroMainHeadline}>
              {mainArticle.data.headline}
            </div>
            <div className={styles.acHeroMainStandfirst}>
              {mainArticle.data.standfirst}
            </div>
          </div>
        </a>
        <div className={styles.acHeroStories}>
          {stories.map((k) => {
            return (
              // eslint-disable-next-line react/jsx-key
              <a href={k.data.path} className={styles.acHeroItem}>
                {k.imageUrl && (
                  <Image
                    src={k.imageUrl}
                    alt={k.data.headline}
                    width={100}
                    height={100}
                    layout="responsive"
                    style={{ aspectRatio: 16 / 9 }}
                  ></Image>
                )}
                <div className={styles.acCardWrapper}>
                  <div className={styles.acHeroItemHeadline}>
                    {k.data.headline}
                  </div>
                  <div className={styles.acHeroItemStandfirst}>
                    {k.data.standfirst}
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    );
  } catch (e) {
    console.log("Failed to render Hero widget.", e);
  }
};

export default Hero;
