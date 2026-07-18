export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/r/barber-demo",
      permanent: false,
    },
  };
}

export default function DemoRedirect() {
  return null;
}
