import styles from "./article-standfirst.module.scss";

const ArticleStandfirst = (widgetData) => {

    const { standfirst } = widgetData.data;
    return (
        <h2 className={styles.acArticleBodySubtitle}>{standfirst}</h2>
    );
};

export default ArticleStandfirst;