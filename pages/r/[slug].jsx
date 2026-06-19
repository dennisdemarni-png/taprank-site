import HostedTapRankPage from "../../components/HostedTapRankPage";
import { getTapRankPage, taprankPageSlugs } from "../../lib/taprankPages";

export default function TapRankHostedPage({ page }) {
  return (
    <HostedTapRankPage
      theme={page.theme}
      businessName={page.businessName}
      monogram={page.monogram}
      eyebrow={page.category}
      copy={page.introText}
      actions={page.links}
    />
  );
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
