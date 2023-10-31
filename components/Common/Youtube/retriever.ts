export const getYoutubeData = async (configurationData): Promise<any> => {
  const isLazyLoaded = true;
  const videoId = configurationData.dataId;
  const src = `https://www.youtube-nocookie.com/embed/${videoId}`;
  const component: string = "VideoYoutube";
  try {
    return {
      configurationId: configurationData.id,
      component,
      data: {
        isLazyLoaded,
        src,
      },
    };
  } catch (e) {
    return Error("Error while getting YoutubeVideo data", e);
  }
};
