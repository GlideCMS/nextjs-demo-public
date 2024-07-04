import { useRouter } from "next/router";
import { GetStaticPropsContext } from "next";
import { getRequestStaticProps } from "../services/props.service";
import { renderClientTemplate } from "@glidecms/next-tools";
import BaseGppLanding from "../components/BaseGppLanding/component";
import { clientComponents } from "../components/clientComponentLookUp";
import { CustomNextImage } from "../components/Common/Image/image";
import glideLogo from "../public/glide logo white.webp";
import React from "react";
import { MetaData } from "../components/MetaData/component";
import { getLoader } from "../components/Common/Loader/loader";

const BasePage = (data) => {
  const router = useRouter();
  if (data.staticProps) {
    const contentToRender = renderClientTemplate(
      data?.staticProps?.props?.componentData,
      data?.staticProps?.props?.template,
      clientComponents
    );

    if (router.isFallback) {
      return <>{getLoader()}</>;
    }
    // remove this part when you start with development
    if (
      data?.staticProps?.props?.environmentInvalid ||
      data?.staticProps?.props?.noPagesConfigured
    ) {
      return <BaseGppLanding {...data.staticProps.props}></BaseGppLanding>;
    }
    return (
      <>
        <MetaData seo={data?.staticProps?.props?.seoData} />
        <div>{contentToRender}</div>
        <div className="gpp-main-footer">
          <CustomNextImage
            src={glideLogo}
            className="gpp-footer-logo"
          ></CustomNextImage>
          <h3 className="gpp-footer-title">
            Contact us to learn more about Glide Publishing Platform and how to
            use it.
          </h3>
          <a className="gpp-contact-us" href="https://www.gpp.io/contact-us">
            Contact Us
          </a>
          <p className="gpp-footer-paragraph">
            Explore this code repository on
            <a href="https://github.com/GlideCMS/nextjs-demo-public"> Github</a>
          </p>
        </div>
      </>
    );
  }
  return <>{getLoader()}</>;
};

export async function getStaticPaths() {
  try {
    // try to parse static paths from environment variable
    const posts = JSON.parse(process.env.PREGENERATE_PATHS)?.map((t) => ({
      slug: t,
    }));
    const paths = posts.map(({ slug }) => ({
      params: { slug: [slug] },
    }));
    return { paths, fallback: "blocking" };
  } catch (e) {
    return { paths: [], fallback: "blocking" };
  }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  try {
    const { params } = context;

    const props = await getRequestStaticProps(params);

    return {
      props: {
        staticProps: props,
      },
      revalidate: parseInt(process.env.REVALIDATE_FREQ) || 60,
    };
  } catch (e) {
    console.log("Error fetching props: ", e);
  }
};

BasePage.defaultProps = {
  componentData: [],
  template: "",
  seoData: { title: "GPP bootstrap app" },
};

export default BasePage;
