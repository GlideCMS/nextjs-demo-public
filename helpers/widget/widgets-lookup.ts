import {
  IArticleEmbeddedItem,
  IEmbeddedItem,
  IRouteData,
} from "@glidecms/deliver-core-dev/types/domain";

import { getArticleBodyData } from "../../components/ArticleBody/retriever";
import { getArticleHeaderData } from "../../components/ArticleHeader/retriever";
import { getArticleStandfirstData } from "../../components/ArticleStandfirst/retriever";
import { getAuthorArticlesData } from "../../components/AuthorArticles/retriever";
import { getAuthorContentData } from "../../components/AuthorContent/retriever";
import { getAuthorHeadlineData } from "../../components/AuthorHeadline/retriever";
import { getArticleLinkData } from "../../components/Common/ArticleLink/retriever";
import { getImageData } from "../../components/Common/Image/retriever";
import { getYoutubeData } from "../../components/Common/Youtube/retriever";
import { getEditorsPicksData } from "../../components/EditorsPicks/retriever";
import { getHeroData } from "../../components/Hero/retriever";
import { getHtmlSnippetData } from "../../components/HtmlSnippet/retriever";
import { getLatestArticlesData } from "../../components/LatestArticles/retriever";
import { getLatestVideos } from "../../components/LatestVideos/retriever";
import { getMostPopularData } from "../../components/MostPopular/retriever";
import { getPageFooterData } from "../../components/PageFooter/retriever";
import { getPageHeaderData } from "../../components/PageHeader/retriever";

export const widgetDataLookup = (
  className: String,
  widgetMetadata: any,
  routeResolved: IRouteData,
  container: any,
  article?: any,
  articleStats?: any,
  seoData?: any
): Promise<any> => {
  const context = {
    routeResolved,
    container,
    seoData,
    article,
    articleStats,
  };
  switch (className) {
    case "Hero":
      return getHeroData(widgetMetadata, context);
    case "LatestArticles":
      return getLatestArticlesData(widgetMetadata, context);
    case "AuthorHeadline":
      return getAuthorHeadlineData(widgetMetadata, context);
    case "AuthorContent":
      return getAuthorContentData(widgetMetadata, context);
    case "AuthorArticles":
      return getAuthorArticlesData(widgetMetadata, context);
    case "Article":
      return getArticleBodyData(widgetMetadata, context);
    case "LatestVideos":
      return getLatestVideos(widgetMetadata, context);
    case "EditorPicks":
      return getEditorsPicksData(widgetMetadata, context);
    case "HtmlSnippet":
      return getHtmlSnippetData(widgetMetadata);
    case "PageHeader":
      return getPageHeaderData(widgetMetadata, context);
    case "PageFooter":
      return getPageFooterData(widgetMetadata, context);
    case "MostPopular":
      return getMostPopularData(widgetMetadata, context);
    case "media/image":
      return getImageData(widgetMetadata, context);
    case "ArticleHeader":
      return getArticleHeaderData(widgetMetadata, context);
    case "ArticleStandfirst":
      return getArticleStandfirstData(widgetMetadata, context);
    case "video/youtube":
      return getYoutubeData(widgetMetadata);
    case "content/link":
      return getArticleLinkData(widgetMetadata);
    default:
      return getNotFoundData(widgetMetadata);
  }
};

export async function getNotFoundData(
  configurationData: IEmbeddedItem | IArticleEmbeddedItem
): Promise<any> {
  return {
    configurationId: configurationData.id,
    component: "NotFound",
    data: {
      label: configurationData["label"] || null,
      type: configurationData["type"] || null,
    },
  };
}
