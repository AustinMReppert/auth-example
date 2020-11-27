import Layout from '../components/Layout';
import { FC } from 'react';
import styled from 'styled-components';

interface HomeProps {}

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
      <Layout title="Home">
        <Center>
          <article>Auth Demo</article>
        </Center>
      </Layout>
    </>
  );
};

export default Home;
