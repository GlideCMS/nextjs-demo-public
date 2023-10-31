import { ITaxonomy } from "@glidecms/deliver-core-dev/types/domain";
import logo from "../../public/images/footer-logo.png";
import {
  DataTypes,
  SERVICE_TYPES,
} from "@glidecms/deliver-core-dev/types/services";

export async function getPageFooterData(
  configurationData: any,
  context
): Promise<any> {
  const year = new Date().getFullYear();
  const component: string = "PageFooter";
  try {
    return {
      configurationId: configurationData.id,
      component,
      data: {
        menuItems: await getFooterMenuItems(
          configurationData.configuration,
          context,
          false
        ),
        footerImage: logo,
        openCriticLogo: "",
        year,
      },
    };
  } catch (e) {
    return Error("Error while getting PageFooter data", e);
  }
}

async function getFooterMenuItems(configuration, context, isAmp: boolean) {
  const widgetDataService = context.container.get(
    SERVICE_TYPES.IWidgetDataService
  );
  const activeSection = context.routeResolved.params["rootSectionSlug"];
  const currentPageUrl = context.routeResolved.url;

  const topMenuId = configuration.topMenuId;
  const bottomMenuId = configuration.bottomMenuId;
  const optionalMenuId = configuration.optionalMenus;
  const socialIconsMenuId = configuration.socialIconsMenu;

  const menuItems = {
    topMenu: {},
    bottomMenu: {},
    optionalMenus: [],
    socialIconsMenu: {},
  };
  if (topMenuId && topMenuId !== "") {
    try {
      const topMenu = await widgetDataService.getWidgetData(
        DataTypes.Menus,
        topMenuId
      );
      if (topMenu && topMenu.menuItems) {
        menuItems.topMenu = await parseListMenuItemsData(
          topMenu,
          {
            itemClass: "ac-footer__top-menu-list-item",
          },
          context,
          isAmp
        );
      } else {
        throw new Error(
          "Cannot render menu component, menu with id: " +
            topMenuId +
            " does not exist!"
        );
      }
    } catch {
      throw new Error(
        "Cannot render menu component, menu with id: " +
          topMenuId +
          " does not exist!"
      );
    }
  }

  if (bottomMenuId && bottomMenuId !== "") {
    try {
      const bottomMenu = await widgetDataService.getWidgetData(
        DataTypes.Menus,
        bottomMenuId
      );

      if (bottomMenu && bottomMenu.menuItems) {
        menuItems.bottomMenu = await parseListMenuItemsData(
          bottomMenu,
          {
            activeSection,
            currentPageUrl,
            itemClass: "ac-footer__bottom-menu-list-item",
          },
          context,
          isAmp
        );
      } else {
        throw new Error(
          "Cannot render menu component, menu with id: " +
            bottomMenuId +
            "does not exist!"
        );
      }
    } catch {
      throw new Error(
        "Cannot render menu component, menu with id: " +
          bottomMenuId +
          "does not exist!"
      );
    }
  }

  if (socialIconsMenuId && socialIconsMenuId !== "") {
    const socialIconsMenu = await widgetDataService
      .getWidgetData(DataTypes.Menus, socialIconsMenuId)
      .catch((error) => {
        console.log("ERROR: Cannot get social icons menu -> " + error);
      });

    if (socialIconsMenu && socialIconsMenu.menuItems) {
      try {
        menuItems.socialIconsMenu = await parseListMenuItemsData(
          socialIconsMenu,
          {
            itemClass:
              "ac-footer__bottom-menu-list-item ac-footer__bottom-menu-list-item-no-border",
          },
          context,
          isAmp
        );
      } catch (error) {
        console.log("ERROR: Cannot get menu items -> " + error);
      }
    } else {
      throw new Error("Social icons menu does not exist");
    }
  }

  if (optionalMenuId && optionalMenuId !== "" && optionalMenuId.length !== 0) {
    const optionalMenuList = await Promise.all(
      optionalMenuId.map(async (id) => {
        try {
          const optionalMenu = await widgetDataService.getWidgetData(
            DataTypes.Menus,
            id
          );
          if (optionalMenu && optionalMenu.menuItems) {
            const menuList = await parseListMenuItemsData(
              optionalMenu,
              {
                activeSection,
                currentPageUrl,
                itemClass: "ac-footer__bottom-menu-list-item",
              },
              context,
              isAmp
            );
            return menuList;
          } else {
            throw new Error(
              "Cannot render menu component, menu with id: " +
                id +
                "does not exist!"
            );
          }
        } catch {
          throw new Error(
            "Cannot render menu component, menu with id: " +
              id +
              "does not exist!"
          );
        }
      })
    );
    menuItems.optionalMenus = optionalMenuList;
  }
  return menuItems;
}

export async function parseListMenuItemsData(
  menu,
  options: any = {},
  context,
  isAmp: boolean
) {
  const taxonomyService = context.container.get(SERVICE_TYPES.ITaxonomyService);
  const imageService = context.container.get(SERVICE_TYPES.IImageService);

  const menuItems = await Promise.all(
    menu.menuItems
      .filter((item) => item && item.published)
      .sort((a, b) => a.position - b.position)
      .map(async (item) => {
        const menuItem: any = {
          itemClass: options.itemClass || null,
          itemStyles: options.itemStyles || null,
          linkClass: options.linkClass || null,
          linkStyle: options.linkStyle || null,
          noOpener: options.noOpener || null,
          label: item.label || null,
        };
        // menu item has url specified
        if (item.url) {
          menuItem.url = item.url;
          menuItem.isActive =
            (options.currentPageUrl && options.currentPageUrl === item.url) ||
            null;
        }
        // TODO handle the case where menu item has page assigned

        // menu item has taxonomy specified
        if (item && item.taxonomy && item.taxonomy.id) {
          const section: ITaxonomy = taxonomyService.getLoadedTaxonomyById(
            item.taxonomy.id
          );
          if (!section) {
            throw new Error(
              "Cannot resolve menu item data for menu: " +
                menu.id +
                ", menu item: " +
                item.id
            );
          }
          menuItem.url = "/" + section.slug;
          menuItem.label = item.label;
          menuItem.isActive =
            (options.activeSection && section.slug === options.activeSection) ||
            null;
        }

        if (!item.url && !(item && item.taxonomy && item.taxonomy.id)) {
          menuItem.url = "javascript:void(0)";
          menuItem.label = item.label;
        }

        if (item && item.image && item.image.id) {
          const { id } = item.image;
          const image = await imageService.getImage(id);
          /*  const imgSrc = await imageService
            .getSrcForImageFormat(image, "AlexaImage")
            .catch((e) => e); */
          const alt = imageService.getImageMetaData(image, "alt");
          let imgHtml;

          menuItem.imgHtml = imgHtml || null;
        }
        return menuItem;
      })
  );
  return menuItems;
}
