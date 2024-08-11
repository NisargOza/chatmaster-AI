import YoutubeChat from "../../components/YoutubeChat";
import NextBreadcrumbs from "../../components/NextBreadcrumb";

export default function YoutubeBot() {
  return (
    <div className="flex h-screen flex-col">
      <NextBreadcrumbs />
      <YoutubeChat />
    </div>
  );
}
