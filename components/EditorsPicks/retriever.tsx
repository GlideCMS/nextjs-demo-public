import { getGlideTools } from "@/services/glide.service";
import { ICollection } from "@glidecms/deliver-core-dev/types/domain";
import {
  IArticleService,
  ICollectionService,
  IImageService,
  ITaxonomyService,
  SERVICE_TYPES,
} from "@glidecms/deliver-core-dev/types/services";
const DEFAULT_ACCENT_COLOR = "#43474D";

export async function getEditorsPicksData(
  configurationData: any,
  context
): Promise<any> {
  const container = getGlideTools().apiContainer;
  const taxonomyService: ITaxonomyService = container.get(
    SERVICE_TYPES.ITaxonomyService
  );
  const collectionService: ICollectionService = container.get(
    SERVICE_TYPES.ICollectionService
  );
  const articleService: IArticleService = container.get(
    SERVICE_TYPES.IArticleService
  );
  const imageService: IImageService = container.get(
    SERVICE_TYPES.IImageService
  );

  const itemListId = configurationData.configuration.itemListId;

  let editorsPicksData: ICollection;
  try {
    editorsPicksData = await collectionService.getCollection(itemListId);
  } catch (error) {
    try {
      const section = context.routeResolved.sections[0];
      const collextions = await collectionService.getAllBy({
        query: {
          filter:
            '{"include":{"taxonomies":[' +
            section.id +
            '],"collection_type":[128]}}',
        },
      });
      editorsPicksData = collextions.length ? collextions[0] : null;
    } catch (e) {
      console.log("ERROR: Cannot get editors picks data -> " + error);
      return "";
    }
  }
  const label = editorsPicksData.name ? editorsPicksData.name : "";

  let articleIdAndPositions = [];
  const articleIds = [];
  articleIdAndPositions = (editorsPicksData.items as any).map((el) => {
    articleIds.push(el.data.id);
    return [el.data.id, el.position];
  });
  const query = {
    filter: JSON.stringify({ include: { id: articleIds } }),
    content: `{"fields": {"include":["headline", "url", "path", "promo_details", "standfirst", "primary_taxonomy", "primary_taxonomy_id", "id"]}}`,
  };

  const articles: any[] = await articleService.getAllBy({ query });
  //const rootSectionSlug = CoreService.getInstance().getServerContext()..getAllRoutingParams().params.rootSectionSlug;
  let section;
  let rootSectionSlug;
  let activeTaxonomyColor = DEFAULT_ACCENT_COLOR;
  // find activeTaxonomyColor
  if (rootSectionSlug === undefined) {
    // on basic pages /games-news, /reviews, /guides, and /
    const url = context.routeResolved.url;

    if (url !== "/") {
      try {
        section = taxonomyService.getTaxonomyBySlug(url.split("/")[1]); // this will generate error on authors page
        activeTaxonomyColor = section.additionalItems.color;
      } catch {
        activeTaxonomyColor = DEFAULT_ACCENT_COLOR;
      }
    }
  } else {
    // on article pages /taxonomy/id/headline
    try {
      section = taxonomyService.getTaxonomyBySlug(rootSectionSlug);
    } catch (error) {
      console.log("ERROR: Cannot get taxonomy -> " + error);
      return "";
    }
    activeTaxonomyColor = section.additionalItems.color
      ? section.additionalItems.color
      : "";
  }
  const articleList = articleIds.map(async (el, index) => {
    const findArticle = articles.find((article) => {
      if (article.id === el) {
        return article;
      }
    });

    let promoImage;
    let imageUrl;
    let alt;

    try {
      promoImage = await articleService.getPromoImageForArticle(findArticle);
      if (promoImage) {
        const key = promoImage.renditions.find(
          (t) => t.type === "gm_small_thumbnail"
        )?.key;
        imageUrl = key ? process.env.MEDIA_BASE_PATH + key : "";
        alt = imageService.getImageMetaData(promoImage, "alt") || "";
      }
    } catch (e) {
      imageUrl = imageService.getPlaceholderImageUrl();
      alt = "Placeholder image!";
    }

    let taxonomyId;
    let headline;
    let standfirst;
    let url;

    if (
      findArticle &&
      findArticle.primaryTaxonomy &&
      findArticle.primaryTaxonomy.id
    ) {
      taxonomyId = findArticle.primaryTaxonomy.id;
      section = taxonomyService.getLoadedTaxonomyById(taxonomyId);
    }

    if (findArticle && findArticle.headline) {
      headline = findArticle.headline;
    }

    if (findArticle && findArticle.standfirst) {
      standfirst = findArticle.standfirst;
    }

    if (findArticle && findArticle.path) {
      url = findArticle.path;
    }
    if (!headline) {
      return null;
    }
    return {
      headline,
      standfirst,
      position: index + 1,
      taxonomyColor: section ? section.additionalItems.color : "",
      imageUrl,
      url,
      alt,
    };
  });
  const myData: any = await Promise.all(articleList).catch((err) => {
    console.log("ERROR -> " + err);
    return [];
  });
  const component: string = "EditorPicks";
  try {
    return {
      configurationId: configurationData.id,
      component,
      data: {
        articleList: myData.filter(Boolean),
        label,
        activeTaxonomyColor,
      },
    };
  } catch (e) {
    return Error("Error while getting EditorsPicks data", e);
  }
}
