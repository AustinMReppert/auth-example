import Layout from "../components/Layout";
import { FC } from "react";
import styled from "styled-components";
import { GetServerSidePropsContext } from "next";
import nc from "next-connect";
import session from "../middleware/session";
import isAuthenticated, { Authenticated } from "../utils/authenticate";

interface HomeProps extends Authenticated {}

const Center = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Home: FC<HomeProps> = (props: HomeProps) => {
  return (
    <>
      <Layout title="Home" authenticated={props.authenticated}>
        <Center>
          <article>Auth Demo</article>
        </Center>
      </Layout>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<{ props: Authenticated }> {
  const handler = nc().use(session);
  await handler.run(context.req, context.res);
  return {
    props: {
      authenticated: isAuthenticated(context.req),
    },
  };
}

export default Home;
