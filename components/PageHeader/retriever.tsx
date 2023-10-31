import { getGlideTools } from "@/services/glide.service";
import { ITaxonomy } from "@glidecms/deliver-core-dev/types/domain";

import {
  DataTypes,
  IWidgetDataService,
  SERVICE_TYPES,
} from "@glidecms/deliver-core-dev/types/services";
const DEFAULT_ACCENT_COLOR = "#43474D";
// note, this could be passed in from elsewhere
const BODY_BACKGROUND_COLOR = "#f0f0f0";
export async function getPageHeaderData(
  configurationData: any,
  context
): Promise<any> {
  const container = getGlideTools().apiContainer;
  const widgetDataService: IWidgetDataService = container.get(
    SERVICE_TYPES.IWidgetDataService
  );

  const mainMenu = await widgetDataService
    .getWidgetData(DataTypes.Menus, configurationData.configuration.menuId)
    .catch((err) => {
      console.log("ERROR: Cannot get main menu -> " + err);
      return "";
    });
  const trackingId = "";
  let logoImage;
  if (mainMenu.icon && mainMenu.icon.url) {
    logoImage = mainMenu.icon.url;
  }
  const taxonomyService = container.get(SERVICE_TYPES.ITaxonomyService);
  const currentPageUrl = context.routeResolved.url;
  const parsedNavItems = mainMenu.menuItems
    .filter((item) => item && item.published)
    .map((item) => {
      if (item.url) {
        return {
          url: item.url,
          label: item.label,
          isActive: currentPageUrl === item.url,
          color: DEFAULT_ACCENT_COLOR,
          position: item.position,
        };
      }
      try {
        const section: ITaxonomy = taxonomyService.getLoadedTaxonomyById(
          item.taxonomy.id
        );
        if (!section) {
          console.warn(
            "Cannot resolve menu item data for menu: " +
              mainMenu.id +
              ", menu item: " +
              item.id
          );
          return null;
        }

        return {
          url: "/" + section.slug,
          label: item.label,
          isActive: section.slug === currentPageUrl.split("/")[1],
          color:
            (section.additionalItems && section.additionalItems.color) ||
            DEFAULT_ACCENT_COLOR,
          position: item.position,
        };
      } catch (err) {
        return "";
      }
    });
  const compareCriteria = (el1, el2) => {
    const position1 = el1.position;
    const position2 = el2.position;
    let ressult = 0;

    if (position1 >= position2) {
      ressult = 1;
    } else if (position1 < position2) {
      ressult = -1;
    }
    return ressult;
  };
  if (!mainMenu || !mainMenu.menuItems) {
    throw new Error("Cannot render page header, main menu not defined!");
  }
  const component: string = "PageHeader";
  try {
    return {
      configurationId: configurationData.id,
      component,
      data: {
        bodyBackgroundColor: BODY_BACKGROUND_COLOR,
        navItems: parsedNavItems.sort(compareCriteria),
        logoImage,
        trackingId,
      },
    };
  } catch (e) {
    return Error("Error while getting PageHeader data", e);
  }
}
