export const getArticleLinkData = async (configurationData) => {
  return {
    configurationId: configurationData.id,
    component: "Link",
    data: {
      ...configurationData,
    },
  };
};
