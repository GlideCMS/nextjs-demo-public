import { getGlideTools } from "@/services/glide.service";
import {
  DataTypes,
  IWidgetDataService,
  SERVICE_TYPES,
} from "@glidecms/deliver-core-dev/types/services";

export async function getHtmlSnippetData(configurationData: {
  id;
  configuration: { htmlSnippetId };
}): Promise<any> {
  const container = getGlideTools().apiContainer;
  const widgetDataService: IWidgetDataService = container.get(
    SERVICE_TYPES.IWidgetDataService
  );
  const htmlSnippet = await widgetDataService.getWidgetData(
    DataTypes.HtmlSnippets,
    configurationData.configuration.htmlSnippetId
  );

  const component: string = "HtmlSnippet";
  try {
    return {
      configurationId: configurationData.id,
      component,
      data: {
        snippetCode: htmlSnippet.body,
      },
    };
  } catch (e) {
    return Error("Error while getting Hero data", e);
  }
}
