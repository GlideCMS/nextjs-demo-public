export const getArticleBodyData = async (configurationData: any, context) => {
  try {
    return {
      configurationId: configurationData.id,
      component: "Article",
      data: {},
    };
  } catch (e) {
    return Error("Error while getting ArticleBody data", e);
  }
};
