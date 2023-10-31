export default function YoutubeVideo(widgetData) {
  return (
    <iframe
      src={widgetData.data.src}
      style={{ width: "100%", aspectRatio: "16/9" }}
      loading={"lazy"}
    ></iframe>
  );
}
