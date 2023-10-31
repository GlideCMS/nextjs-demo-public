import {
  IArticleEmbeddedItem,
  IEmbeddedItem,
} from "@glidecms/deliver-core-dev/types/domain";

export async function getAuthorHeadlineData(
  configurationData: IArticleEmbeddedItem | IEmbeddedItem,
  context
): Promise<any> {
  //console.log("========", context.routeResolved);
  const component: string = "AuthorHeadline";
  try {
    return {
      configurationId: configurationData.id,
      component,
      data: {},
    };
  } catch (e) {
    return Error("Error while getting Author headline", e);
  }
}
