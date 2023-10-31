import { getGlideTools } from "@/services/glide.service";
import {
  IArticleEmbeddedItem,
  IEmbeddedItem,
} from "@glidecms/deliver-core-dev/types/domain";
import {
  ICollectionService,
  ICollectionTypeService,
  IImageService,
  SERVICE_TYPES,
} from "@glidecms/deliver-core-dev/types/services";

export async function getHeroData(
  configurationData: IArticleEmbeddedItem | IEmbeddedItem,
  context
): Promise<any> {
  const sectionTaxo = context.routeResolved?.sections?.length
    ? context.routeResolved.sections[0]
    : null;
  const container = getGlideTools().apiContainer;
  const collectionService: ICollectionService = container.get(
    SERVICE_TYPES.ICollectionService
  );
  const imageService: IImageService = container.get(
    SERVICE_TYPES.IImageService
  );
  let collection = (configurationData as any)?.configuration?.heroId
    ? await collectionService.getCollection(
        (configurationData as any).configuration.heroId
      )
    : null;
  if (!collection && sectionTaxo) {
    const collectionTypeService: ICollectionTypeService = container.get(
      SERVICE_TYPES.ICollectionTypeService
    );
    const colType =
      collectionTypeService.lookupLoadedCollectionTypeByName(/Bundle/);
    const sectionCollections = await collectionService.getAllBy({
      query: {
        filter:
          '{"include":{"taxonomies":[' +
          sectionTaxo.id +
          '],"collection_type":[123]}}',
      },
    });

    collection = sectionCollections?.length
      ? await collectionService.getCollection(sectionCollections[0].id)
      : null;
  }
  if (!collection) {
    return {
      configurationId: configurationData.id,
      component: "Hero",
      data: {
        articles: null,
      },
    };
  }
  const articleCardsData = await Promise.all(
    collection.items.map(async (article) => {
      const image = article?.data?.promoDetails?.imageId
        ? await imageService.getImage(article.data.promoDetails?.imageId)
        : null;

      const imageUrl = image
        ? process.env.MEDIA_BASE_PATH +
          image?.renditions?.find((k) => k.type === "gm_preview")?.key
        : null;
      if (!imageUrl) {
      }
      return { ...article, imageUrl };
    })
  );
  const component: string = "Hero";
  try {
    return {
      configurationId: configurationData.id,
      component,
      data: {
        articles: articleCardsData,
      },
    };
  } catch (e) {
    return Error("Error while getting Hero data", e);
  }
}
