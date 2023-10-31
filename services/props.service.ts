import { ParsedUrlQuery } from "querystring";
import {
  IPageService,
  SERVICE_TYPES,
} from "@glidecms/deliver-core-dev/types/services";

//components
import { getArticlePageSeo, getDefaultPageSeo } from "./utilities.service";
import { resolvePageTemplate } from "@glidecms/next-tools";
import { getGlideTools, initGlideTools } from "./glide.service";
import { widgetDataLookup } from "../helpers/widget/widgets-lookup";

export const getRequestStaticProps = async (context: ParsedUrlQuery) => {
  //init glide tools - don't worry it won't initialize if already initialized and background refresh is running
  await initGlideTools();
  try {
    // TODO remove these checks when you start with development
    if (!process.env.CONNECT_API_URL || !process.env.CONNECT_API_KEY) {
      return {
        props: {
          environmentInvalid: true,
        },
      };
    }
    try {
      const settings = await fetch(process.env.CONNECT_API_URL + "settings", {
        headers: { "x-capi-key": process.env.CONNECT_API_KEY },
      });
      if (settings.status !== 200) {
        return {
          props: {
            environmentInvalid: true,
          },
        };
      }
    } catch (e) {
      return {
        props: {
          environmentInvalid: true,
        },
      };
    }
    const glideTools = getGlideTools();
    const container = glideTools.apiContainer;
    const pagesService: IPageService = container.get(
      SERVICE_TYPES.IPageService
    );
    if (!(await pagesService.getPages()).length) {
      return {
        props: {
          noPagesConfigured: true,
        },
      };
    }
    const { slug } = context;
    const urlPath = slug?.length
      ? "/" + (slug as any)?.join("/")
      : slug?.length === 1
      ? "/" + slug[0]
      : "/";
    const { route: routeResolved, article } =
      await glideTools.tools.resolveRouteDataForUrl(urlPath);
    if (routeResolved.resolvedPage?.pageType === "ERROR4XX") {
      //TODO
    }

    if (routeResolved.resolvedPage.pageType === "ARTICLE") {
      //TODO
    }
    routeResolved.resolvedRoute["url"] = urlPath;
    const { embeddedItems, resolvedTemplate } = await resolvePageTemplate(
      routeResolved,
      glideTools.apiContainer,
      widgetDataLookup,
      article
    );

    let seo;
    switch (routeResolved.resolvedPage.pageType) {
      case "ARTICLE":
        seo = await getArticlePageSeo(routeResolved);
        break;
      case "DEFAULT":
        seo = await getDefaultPageSeo(routeResolved);
    }

    return {
      props: {
        componentData: embeddedItems,
        template: resolvedTemplate,
        seoData: seo,
      },
      revalidate: 60,
    };
  } catch (e) {
    if (e instanceof Error) {
      console.log("Error: ", e);
      return {
        notFound: true,
      };
    }
    throw e;
  }
};
