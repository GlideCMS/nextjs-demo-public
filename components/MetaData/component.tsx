import Head from "next/head";
import React from "react";

export const MetaData = (widgetData) => {
  return (
    <Head>
      <title>{widgetData?.seo?.title}</title>
      <meta name="description" content={widgetData?.seo?.description} />
      <meta name="author" content={widgetData?.seo?.author} />
      <meta name="keywords" content={widgetData?.seo?.keywords} />
      <meta name="og:image" content={widgetData?.seo?.image} />
      <meta name="og:title" content={widgetData?.seo?.title} />
    </Head>
  );
};
