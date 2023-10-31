export async function getArticleStandfirstData(
    configurationData: any,
    context
  ): Promise<any> {

    const article = context?.article;
    const standfirst = article.standfirst ? article.standfirst : '';

    const component: string = "ArticleStandfirst";

    try {
        return {
          configurationId: configurationData.id,
          component,
          data: {
            standfirst,
          },
        };
      } catch (e) {
        return Error("Error while getting ArticleStandfirst data", e);
      }
  };