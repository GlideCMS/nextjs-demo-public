import { ExternalDataService } from "@/services/custom-services/external-data.service";
import { SERVICE_TYPES } from "@glidecms/deliver-core-dev/types/services";

export async function getMostPopularData(configurationData, context) {
  const externalService = context.container.get(ExternalDataService);
  const mostPopularFeed = await externalService
    .getMostPopularData()
    .catch((e) => e);

  const articleService = context.container.get(SERVICE_TYPES.IArticleService);
  const articles = await articleService.getAllBy({ query: { page_size: 10 } });
  const component = "MostPopular";
  try {
    return {
      configurationId: configurationData.id,
      component,
      data: {},
    };
  } catch (e) {
    return Error("Error while getting PageHeader data", e);
  }
}
