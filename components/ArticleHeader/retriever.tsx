import { getGlideTools } from "@/services/glide.service";
import {
  IArticleService,
  ITaxonomyService,
  IImageService,
  SERVICE_TYPES,
  IAuthorService,
} from "@glidecms/deliver-core-dev/types/services";

export async function getArticleHeaderData(
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
  const authorService: IAuthorService = container.get(
    SERVICE_TYPES.IAuthorService
  );

  const article = context?.article;

  let authorsIDs = null;
  let authorList = null;
  let authors = null;
  let imageHeightPercentage;
  if (article.authors.length !== 0) {
    authorsIDs = article.authors.map((el) => {
      return el.id;
    });

    try {
      authors = await authorService.getAllAuthors();
      authorList = authors
        .filter((author) => authorsIDs.includes(author.id))
        .map((el) => {
          return {
            name: el.name,
            url: el.name.replace(/\s/g, "-").toLowerCase(),
          };
        });
    } catch (error) {
      console.log("ERROR: Cannot get article author -> " + error);
      return "";
    }
  }

  const headline = article.headline ? article.headline : "";

  let promoImage;
  let imageUrl;
  let caption;
  let credit;
  let alt;

  try {
    promoImage = article?.promoDetails?.imageId
      ? await imageService.getImage(article?.promoDetails?.imageId)
      : null;

    if (promoImage) {
      imageUrl = promoImage
        ? process.env.MEDIA_BASE_PATH +
          promoImage?.renditions?.find(
            (k) => k.type === "gm_article_promo_image"
          )?.key
        : null;
      const rendition = promoImage.renditions.find(
        (e) => e.type === "gm_article_promo_image"
      );
      imageHeightPercentage =
        (parseInt(rendition.height, 10) / parseInt(rendition.width, 10)) * 100;

      caption = promoImage?.metaData?.caption
        ? promoImage?.metaData?.caption
        : null;
      alt = promoImage?.metaData?.alt ? promoImage?.metaData?.alt : null;
    }
  } catch (e) {
    console.log("Couldn't get article promo image");
  }

  const articleTaxonomyId =
    article.primaryTaxonomyId || (article as any).primaryTaxonomy.id;
  let articleTaxonomy;
  let articleTaxonomyColor;
  let articleTaxonomyName;
  try {
    articleTaxonomy = taxonomyService.getLoadedTaxonomyById(articleTaxonomyId);
    articleTaxonomyColor = articleTaxonomy.additionalItems.color;
    articleTaxonomyName = articleTaxonomy.name;
  } catch (err) {
    articleTaxonomyColor = "";
    articleTaxonomyName = "";
  }

  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  //const publishedDate = new Date(article.publishedAt);
  let publishedDate = null;

  /*if (context?.inPreviewMode()) {
    publishedDate = new Date();
  } else {
    publishedDate = new Date(article.publishedAt);
  }*/

  publishedDate = new Date(article.publishedAt);

  const publishedAt =
    addZero(publishedDate.getHours()) +
    ":" +
    addZero(publishedDate.getMinutes()) +
    ", " +
    addZero(publishedDate.getDate()) +
    " " +
    monthNames[publishedDate.getMonth()] +
    " " +
    publishedDate.getFullYear();

  let updatedAtDate = null;
  /*if (context?.inPreviewMode()) {
    updatedAtDate = new Date();
  } else {
    updatedAtDate = new Date(article.updatedAt);
  }*/

  updatedAtDate = new Date(article.updatedAt);

  const updatedAt =
    addZero(updatedAtDate.getHours()) +
    ":" +
    addZero(updatedAtDate.getMinutes()) +
    ", " +
    addZero(updatedAtDate.getDate()) +
    " " +
    monthNames[updatedAtDate.getMonth()] +
    " " +
    updatedAtDate.getFullYear();

  let showUpdateAt = false;
  if (publishedAt !== updatedAt) {
    showUpdateAt = true;
  }

  const component: string = "ArticleHeader";
  try {
    return {
      configurationId: configurationData.id,
      component,
      data: {
        headline,
        articleTaxonomyName,
        articleTaxonomyColor,
        authorList,
        publishedAt,
        updatedAt,
        showUpdateAt,
        url: article.url,
        promoImage: null,
        imageUrl,
        caption,
        credit: null,
        alt,
        imageHeightPercentage,
      },
    };
  } catch (e) {
    return Error("Error while getting ArticleHeader data", e);
  }
}
