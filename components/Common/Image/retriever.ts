import { SERVICE_TYPES } from "@glidecms/deliver-core-dev/types/services";

export const getImageData = async (
  configurationData,
  context
): Promise<any> => {
  const dataId = configurationData.dataId;
  const imageService = context.container.get(SERVICE_TYPES.IImageService);
  // if the full image data is provided use that rather than fetching image data
  const providedImageData =
    configurationData.image &&
    configurationData.image.id &&
    configurationData.image.formats &&
    configurationData.image;

  let image;
  let caption;
  let credit;
  let src;
  let alt;
  try {
    image = providedImageData || (await imageService.getImage(dataId));
    caption =
      configurationData.caption ||
      imageService.getImageMetaData(image, "caption") ||
      null;
    // credit = item.credit || imageService.getImageMetaData(image, 'credit');
    alt =
      configurationData.alt ||
      imageService.getImageMetaData(image, "alt") ||
      null;
    // TODO replace this with method invocation from image service
    // in case of multiple credits, deserialize the array and convert it to string
    try {
      credit = JSON.parse(imageService.getImageMetaData(image, "credit"));
    } catch (err) {
      credit = imageService.getImageMetaData(image, "credit");
      if (!Array.isArray(credit)) {
        credit = [credit];
      }
    }
    src = imageService.getSrcForImageFormat(image, "ArticleImage");
  } catch {
    src = imageService.getPlaceholderImageUrl();
    caption = "GPP";
    credit = ["GPP"];
  }

  const component: string = "ArticleImage";
  try {
    return {
      configurationId: configurationData.id,
      component,
      data: {
        alt: alt || null,
        src: src || null,
        caption: caption || null,
      },
    };
  } catch (e) {
    return Error("Error while getting ArticleImage data", e);
  }
};
