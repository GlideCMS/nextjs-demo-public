import {
  IArticleService,
  IImageService,
  ITaxonomyService,
  SERVICE_TYPES,
} from "@glidecms/deliver-core-dev/types/services";
import { getGlideTools } from "@/services/glide.service";

const DEFAULT_ACCENT_COLOR = "#43474D";

export async function getLatestArticlesData(
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

  const widgetConfiguration = configurationData.configuration
    ? configurationData.configuration
    : "";
  let taxonomyId;

  const pageSize = widgetConfiguration.numberOfArticles || 10;
  let articles;
  let activeTaxonomyColor = DEFAULT_ACCENT_COLOR;

  let section;

  // get taxonomy id
  const resolveWidgetTaxonomy = (widgetTaxonomy, rootSectionSlug) => {
    try {
      // go back if there's provided taxonomy
      if (widgetConfiguration.taxonomy) {
        return widgetTaxonomy;
      }
      // if there's no provided tax, return according to root section slug
      else if (!widgetConfiguration.taxonomy && rootSectionSlug) {
        const taxonomy = taxonomyService.getTaxonomyBySlug(rootSectionSlug);
        return taxonomy.id;
      }
      // if there's no provided tax and root section slug return empty string
      else if (!widgetConfiguration.taxonomy && !rootSectionSlug) {
        return "";
      }
    } catch (err) {
      console.log("ERROR: Cannot resolve widget taxonomy -> " + err);
      return "";
    }
  };

  let rootSectionSlug;

  if (widgetConfiguration.taxonomy === "") {
    articles = await articleService
      .getArticleList({
        query: {
          page_size: pageSize,
          sort: `{"updated_at":"desc"}`,
        },
      })
      .catch((err) => {
        console.log("ERROR: Cannot get articles -> " + err);
        return "";
      });
  } else if (
    widgetConfiguration.taxonomy !== undefined ||
    widgetConfiguration.taxonomy !== null ||
    widgetConfiguration.taxonomy !== ""
  ) {
    rootSectionSlug = context?.routeResolved?.sections?.length
      ? context.routeResolved.sections[0].slug
      : null;
    taxonomyId = resolveWidgetTaxonomy(
      widgetConfiguration.taxonomy,
      rootSectionSlug
    );
    articles = await articleService
      .getAllBy({
        query: {
          ...(taxonomyId && { search: `{"taxonomies.id":"${taxonomyId}"}` }),
          sort: `{"updated_at":"desc"}`,
          page_size: pageSize,
          content: `{"fields": {"include":["headline", "url", "path", "promo_details", "standfirst", "primary_taxonomy", "primary_taxonomy_id", "id"]}}`,
        },
      })
      .catch((err) => {
        console.log("ERROR: Cannot get articles -> " + err);
        return "";
      });
  }
  const latestArticles = await Promise.all(
    articles.map(async (article) => {
      let imageUrl;
      let imageSmallUrl;
      let alt;
      let taxonomyColor;
      try {
        const taxonomy = taxonomyService.getLoadedTaxonomyById(
          article.primaryTaxonomy.id
        );
        taxonomyColor = taxonomy.additionalItems.color;
      } catch {
        taxonomyColor = DEFAULT_ACCENT_COLOR;
      }

      try {
        const promoLargeImage = await articleService.getPromoImageForArticle(
          article
        );

        if (promoLargeImage) {
          imageUrl = imageService.getSrcForImageFormat(
            promoLargeImage,
            "gm_medium_preview"
          );
          imageSmallUrl = imageService.getSrcForImageFormat(
            promoLargeImage,
            "gm_small_thumbnail"
          );
          alt = imageService.getImageMetaData(promoLargeImage, "alt");
        } else {
          imageUrl = imageService.getPlaceholderImageUrl();
          imageSmallUrl = imageService.getPlaceholderImageUrl();
        }
      } catch {
        imageUrl = imageService.getPlaceholderImageUrl();
        imageSmallUrl = imageService.getPlaceholderImageUrl();
        alt = "Placeholder image!";
      }
      return {
        ...article,
        imageUrl,
        imageSmallUrl,
        taxonomyColor,
        alt: alt || null,
      };
    })
  ).catch((err) => {
    console.log("ERROR: Cannot get articles -> " + err);
    return "";
  });

  const component: string = "LatestArticles";
  try {
    return {
      configurationId: configurationData.id,
      component,
      data: {
        widgetConfiguration,
        latestArticles,
        activeTaxonomyColor,
        mediaPath: process.env.MEDIA_BASE_PATH,
      },
    };
  } catch (e) {
    return Error("Error while getting LatestArticles data", e);
  }
}
