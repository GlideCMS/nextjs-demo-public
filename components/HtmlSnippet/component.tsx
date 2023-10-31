import React from "react";

const HtmlSnippet = (widgetData) => {
  try {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: widgetData.data.snippetCode,
        }}
      ></div>
    );
  } catch (e) {
    console.log("Failed to render HtmlSnippet widget.", e);
  }
};

export default HtmlSnippet;
