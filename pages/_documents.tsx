import Document, { Html, Head, Main, NextScript } from "next/document";
import React from "react";

class BaseDocument extends Document {
  static async getInitialProps(context) {
    const originalRenderPage = context.renderPage;
    // Run the React rendering logic synchronously
    context.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => App,
        enhanceComponent: (Component) => Component,
      });

    const initialProps = await Document.getInitialProps(context);

    return initialProps;
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default BaseDocument;
