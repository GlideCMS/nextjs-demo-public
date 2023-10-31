import { getGlideTools } from "@/services/glide.service";
import {
  IImageService,
  SERVICE_TYPES,
  IAuthorService,
  IArticleService,
  ITaxonomyService,
} from "@glidecms/deliver-core-dev/types/services";

export async function getAuthorArticlesData(
  configurationData: any,
  context
): Promise<any> {
  const container = getGlideTools().apiContainer;
  const imageService: IImageService = container.get(
    SERVICE_TYPES.IImageService
  );
  const taxonomyService: ITaxonomyService = container.get(
    SERVICE_TYPES.ITaxonomyService
  );
  const articleService: IArticleService = container.get(
    SERVICE_TYPES.IArticleService
  );
  const authorService: IAuthorService = context.container.get(
    SERVICE_TYPES.IAuthorService
  );

  const allLoadedAuthors = authorService.getAllLoadedAuthors();
  let authorName = context.routeResolved.params.authorName
    .replace(/\-+/g, " ")
    .replace(/\s\s+/g, " ");

  const author = allLoadedAuthors.find(
    (author) => author.name.toLowerCase() === authorName.toLowerCase()
  );

  if (author) {
    authorName = author.name ? author.name : "";
    const authorId = author.id;
    const pageSize = parseInt(configurationData.configuration.pageSize, 10);
    const numberOfCards =
      parseInt(configurationData.configuration.numberOfCards, 10) || 10;
    const totalNumberOfArticles = parseInt(
      configurationData.configuration.totalNumberOfArticles,
      10
    );
    const nextAndPreviousButtons =
      configurationData.configuration.nextAndPreviousButtons;

    const articles = await articleService
      .getAllBy({
        query: {
          page_size: pageSize,
          search: `{ "authors.id": "${authorId}" }`,
          content: `{"fields": {"include":["id","headline","standfirst","primary_taxonomy","url", "path","promo_details"]}}`,
          sort: `{"updated_at":"desc"}`,
        },
      })
      .catch((err) => {
        return "";
      });
    const latestArticles = await Promise.all(
      (articles as any).map(async (article) => {
        let imageUrl;
        try {
          const promoImage = await articleService.getPromoImageForArticle(
            article
          );
          if (promoImage) {
            const key = promoImage.renditions.find(
              (t) => t.type === "gm_small_thumbnail"
            )?.key;
            imageUrl = key ? process.env.MEDIA_BASE_PATH + key : "";
          }
        } catch (e) {
          imageUrl = imageService.getPlaceholderImageUrl();
        }
        return {
          ...article,
          imageUrl,
        };
      })
    ).catch((err) => {
      return "";
    });

    const component: string = "AuthorArticles";
    try {
      return {
        configurationId: configurationData.id,
        component,
        data: {
          authorName,
          articles: latestArticles,
          // pager: configuration.pager,
          //  currentPageNumber: pager.getCurrentPageNumber(),
          //  pagerItemContainerId: configuration.pagerItemContainerId,
        },
      };
    } catch (e) {
      return Error("Error while getting Author Articles", e);
    }
  }
}
