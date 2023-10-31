import dynamic from "next/dynamic";
import YoutubeVideo from "./Common/Youtube/component";
import ArticleImage from "./Common/Image/component";
import Article from "./ArticleBody/component";
import { ArticleLink } from "./Common/ArticleLink/component";

const Hero = dynamic(() => import("./Hero/component"));
const EditorsPicks = dynamic(() => import("./EditorsPicks/component"));
const HtmlSnippet = dynamic(() => import("./HtmlSnippet/component"));
const PageHeader = dynamic(() => import("./PageHeader/component"));

const LatestVideos = dynamic(() => import("./LatestVideos/component"));
const ArticleHeader = dynamic(() => import("./ArticleHeader/component"));
const ArticleStandfirst = dynamic(
  () => import("./ArticleStandfirst/component")
);
const LatestArticles = dynamic(() => import("./LatestArticles/component"));
const AuthorHeadline = dynamic(() => import("./AuthorHeadline/component"));
const AuthorContent = dynamic(() => import("./AuthorContent/component"));
const AuthorArticles = dynamic(() => import("./AuthorArticles/component"));

const PageFooter = dynamic(() => import("./PageFooter/component"));
export const clientComponents = {
  Hero: {
    render: (props) => <Hero {...props} />,
  },
  NotFound: {
    render: (props) => <div></div>,
  },
  EditorPicks: {
    render: (props) => <EditorsPicks {...props} />,
  },
  HtmlSnippet: {
    render: (props) => <HtmlSnippet {...props} />,
  },
  PageHeader: {
    render: (props) => <PageHeader {...props} />,
  },
  LatestArticles: {
    render: (props) => <LatestArticles {...props} />,
  },
  LatestVideos: {
    render: (props) => <LatestVideos {...props} />,
  },
  Article: {
    render: (props) => <Article {...props} />,
  },
  ArticleImage: {
    render: (props) => <ArticleImage {...props} />,
  },
  ArticleHeader: {
    render: (props) => <ArticleHeader {...props} />,
  },
  ArticleStandfirst: {
    render: (props) => <ArticleStandfirst {...props} />,
  },
  VideoYoutube: {
    render: (props) => <YoutubeVideo {...props} />,
  },
  AuthorHeadline: {
    render: (props) => <AuthorHeadline {...props} />,
  },
  AuthorContent: {
    render: (props) => <AuthorContent {...props} />,
  },
  AuthorArticles: {
    render: (props) => <AuthorArticles {...props} />,
  },
  PageFooter: {
    render: (props) => <PageFooter {...props} />,
  },
  Link: {
    render: (props) => {
      return <ArticleLink {...props}></ArticleLink>;
    },
  },
};
