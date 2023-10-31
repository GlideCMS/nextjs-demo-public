import {
  IAuthorService,
  SERVICE_TYPES,
} from "@glidecms/deliver-core-dev/types/services";
import { getGlideTools } from "../services/glide.service";
import { IArticle, ITaxonomy } from "@glidecms/deliver-core-dev/types/domain";

export const getArticlePageSeo = async (routeData) => {
  const container = getGlideTools().apiContainer;
  const articleService = container.get(SERVICE_TYPES.IArticleService);
  const article: IArticle = await articleService.getArticleByGlideId(
    routeData.resolvedRoute.params.articleGlideId
  );

  return {
    ...article.seo,
    image: article.promoImageUrl.replace(
      "gm_medium_list_thumbnail",
      "gm_preview"
    ),
  };
};

export const getDefaultPageSeo = async (routeData) => {
  const container = getGlideTools().apiContainer;
  const authorService: IAuthorService = container.get(
    SERVICE_TYPES.IAuthorService
  );
  if (routeData?.resolvedRoute?.params?.authorName) {
    const author = authorService
      .getAllLoadedAuthors()
      .find(
        (author: any) =>
          author.slug === routeData.resolvedRoute.params.authorName
      );
    return {
      keywords: [],
      author: "",
      description: author?.about,
      title: author?.name + " - GPP",
    };
  } else if (routeData?.resolvedRoute?.sections?.length) {
    const taxonomy: ITaxonomy = routeData?.resolvedRoute?.sections[0];
    return {
      keywords: [],
      author: "",
      description: taxonomy.shortDescription,
      title: taxonomy.name + " - GPP",
    };
  } else if (routeData.resolvedPage) {
    let image = null;
    if (routeData.resolvedPage.seo.imagePath) {
      image =
        process.env.MEDIA_BASE_PATH + routeData.resolvedPage.seo.imagePath;
    }
    return {
      keywords: routeData.resolvedPage.seo.keywords,
      author: routeData.resolvedPage.seo.author,
      description: routeData.resolvedPage.seo.description,
      title: routeData.resolvedPage.seo.title,
      image,
    };
  }
  return routeData.resolvedPage.seo;
};
