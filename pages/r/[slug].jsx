import HostedTapRankPage from "../../components/HostedTapRankPage";
import { getTapRankPage, taprankPageSlugs } from "../../lib/taprankPages";

export default function TapRankHostedPage({ page }) {
  return <HostedTapRankPage page={page} />;
}

export function getStaticPaths() {
  return {
    paths: taprankPageSlugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const page = getTapRankPage(params.slug);

  return {
    props: { page },
  };
}
