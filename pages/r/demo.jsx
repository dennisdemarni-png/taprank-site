export async function getServerSideProps() {
  return {
    redirect: {
      destination: "https://www.google.com/search?q=google+review",
      permanent: false,
    },
  };
}

export default function DemoRedirect() {
  return null;
}
