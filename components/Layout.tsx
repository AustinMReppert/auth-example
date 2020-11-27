import { FC, ReactNode } from 'react';
import Head from 'next/head';
import Nav from './Nav';
import styled from 'styled-components';

interface LayoutProps {
  title: string;
  children: ReactNode;
}

const Main = styled.main`
  height: calc(100% - 48px);
`;

const Layout: FC<LayoutProps> = (props: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>
      <Nav />
      <Main>{props.children}</Main>
    </>
  );
};

export default Layout;
