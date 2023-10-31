import {
  IArticleService,
  IImageService,
  ITaxonomyService,
  SERVICE_TYPES,
} from "@glidecms/deliver-core-dev/types/services";
import { getGlideTools } from "@/services/glide.service";

const DEFAULT_ACCENT_COLOR = "#43474D";

export async function getLatestVideos(
  configurationData: any,
  context
): Promise<any> {
  const container = getGlideTools().apiContainer;
  const taxonomyService: ITaxonomyService = container.get(
    SERVICE_TYPES.ITaxonomyService
  );
  const articleService: IArticleService = container.get(
    SERVICE_TYPES.IArticleService
  );
  const imageService: IImageService = container.get(
    SERVICE_TYPES.IImageService
  );

  const numberOfArticles = configurationData.configuration.numberOfArticles;
  const articleTaxonomy = configurationData.configuration.articleTaxonomy;

  function getQuery(taxonomyIds, numberOfArticles) {
    try {
      const query = {
        filter: JSON.stringify({
          include: { taxonomies: taxonomyIds },
        }),
        sort: `{"updated_at":"desc"}`,
        content: `{"fields": {"include":["id","headline","promo_details","url", "path","primary_taxonomy"]}}`,
        page_size: numberOfArticles,
      };
      return query;
    } catch (err) {
      return "";
    }
  }

  //const rootSectionSlug = CoreService.getInstance().getServerContext()..getAllRoutingParams().params.rootSectionSlug;
  let activeTaxonomyColor = DEFAULT_ACCENT_COLOR;
  let section;
  let taxonomyIds;
  let query = getQuery([articleTaxonomy], numberOfArticles);
  let rootSectionSlug;

  // find activeTaxonomyColor and related videos
  if (rootSectionSlug === undefined) {
    // on basic pages /games-news, /reviews, /guides, and /
    const url = context.routeResolved.url;

    if (url !== "/") {
      try {
        section = taxonomyService.getTaxonomyBySlug(url.split("/")[1]); // this will generate error on authors page
        activeTaxonomyColor = section.additionalItems.color;
        taxonomyIds = [
          articleTaxonomy,
          taxonomyService.getLoadedTaxonomyById(section.id).id,
        ];
        query = getQuery(taxonomyIds, numberOfArticles);
      } catch {
        activeTaxonomyColor = DEFAULT_ACCENT_COLOR;
      }
    }
  } else {
    // on article pages /taxonomy/id/headline and/or on basic pages with added parameters in URL (e.g. /games-news?abc)
    try {
      section = taxonomyService.getLoadedTaxonomyById(
        taxonomyService.getTaxonomyBySlug(rootSectionSlug).id
      );
      activeTaxonomyColor = section.additionalItems.color;
      taxonomyIds = [articleTaxonomy, section.id];
      query = getQuery(taxonomyIds, numberOfArticles);
    } catch (err) {
      console.log(err);
      activeTaxonomyColor = "";
      taxonomyIds = "";
    }
  }
  try {
    const articles = await articleService.getAllBy({ query });

    let latestVideosArticles;
    if (articles.length > 0) {
      latestVideosArticles = await Promise.all(
        articles.map(async (article) => {
          let imageUrlVideoThumbnail;
          let imageUrlVideoThumbnailLarge;
          let promoImage;
          let alt;
          try {
            promoImage = await articleService.getPromoImageForArticleId(
              article.id
            );

            if (promoImage) {
              imageUrlVideoThumbnail = imageService.getSrcForImageFormat(
                promoImage,
                "gm_medium_list_thumbnail"
              );
              imageUrlVideoThumbnailLarge = imageService.getSrcForImageFormat(
                promoImage,
                "gm_medium_thumbnail"
              );
              alt = imageService.getImageMetaData(promoImage, "alt");
            } else {
              imageUrlVideoThumbnail = imageService.getPlaceholderImageUrl();
              imageUrlVideoThumbnailLarge =
                imageService.getPlaceholderImageUrl();
              alt = "Placeholder image!";
            }
          } catch {
            imageUrlVideoThumbnail = imageService.getPlaceholderImageUrl();
            imageUrlVideoThumbnailLarge = imageService.getPlaceholderImageUrl();
            alt = "Placeholder image!";
          }
          return {
            ...article,
            imageUrlVideoThumbnail,
            imageUrlVideoThumbnailLarge,
          };
        })
      );

      const component: string = "LatestVideos";
      try {
        return {
          configurationId: configurationData.id,
          component,
          data: {
            latestVideosArticles,
            activeTaxonomyColor,
            mediaPath: process.env.MEDIA_BASE_PATH,
          },
        };
      } catch (e) {
        return Error("Error while getting LatestVideos data", e);
      }
    }
  } catch (e) {
    return Error("err");
  }
}
