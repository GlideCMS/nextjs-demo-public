import { getGlideTools } from "@/services/glide.service";
import {
  IArticleEmbeddedItem,
  IEmbeddedItem,
} from "@glidecms/deliver-core-dev/types/domain";
import {
  IImageService,
  SERVICE_TYPES,
  IAuthorService,
} from "@glidecms/deliver-core-dev/types/services";
export async function getAuthorContentData(
  configurationData: IArticleEmbeddedItem | IEmbeddedItem,
  context
): Promise<any> {
  //console.log("========", context.routeResolved);
  const container = getGlideTools().apiContainer;
  const imageService: IImageService = container.get(
    SERVICE_TYPES.IImageService
  );
  const authorService: IAuthorService = context.container.get(
    SERVICE_TYPES.IAuthorService
  );
  const allLoadedAuthors = authorService.getAllLoadedAuthors();
  let authorName = context.routeResolved.params.authorName.replace(
    /\s\s+/g,
    " "
  );

  const author = allLoadedAuthors.find(
    (author) => author.name.toLowerCase() === authorName.toLowerCase()
  );

  if (author) {
    authorName = author.name ? author.name : "";
    const about = author.about ? author.about : "";
    const jobTitle = author.jobTitle ? author.jobTitle : "";
    const twitter =
      author.socialNetworks && author.socialNetworks.twitter
        ? author.socialNetworks.twitter
        : null;
    const instagram =
      author.socialNetworks && author.socialNetworks.instagram
        ? author.socialNetworks.instagram
        : null;
    const facebook =
      author.socialNetworks && author.socialNetworks.facebook
        ? author.socialNetworks.facebook
        : null;
    const youtube =
      author.socialNetworks && author.socialNetworks.youtube
        ? author.socialNetworks.youtube
        : null;
    const organisation = author.organisation
      ? "(" + author.organisation + ")"
      : "";
    const name = jobTitle + " " + authorName + organisation;
    const authorData = {
      name,
      about,
      socialSharing: { twitter, instagram, facebook, youtube },
    };

    let promoImage;
    let authorImage = imageService.getPlaceholderImageUrl();
    let alt;

    try {
      promoImage = await authorService.getImageForAuthor(author);
      if (promoImage) {
        authorImage = await imageService.getSrcForImageFormat(
          promoImage,
          "MediumThumbnail"
        );
        alt = "Placeholder image!";
      }
    } catch {
      authorImage = imageService.getPlaceholderImageUrl();
      alt = "Placeholder image!";
    }

    const component: string = "AuthorContent";
    try {
      return {
        configurationId: configurationData.id,
        component,
        data: {
          authorData,
          authorImage,
          alt,
        },
      };
    } catch (e) {
      return Error("Error while getting Author Content", e);
    }
  }
}
