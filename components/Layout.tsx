import { FC, ReactNode } from "react";
import Head from "next/head";
import Nav from "./Nav";
import styled from "styled-components";
import { Authenticated } from "../utils/authenticate";

interface LayoutProps extends Authenticated {
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
      <Nav authenticated={props.authenticated} />
      <Main>{props.children}</Main>
    </>
  );
};

export default Layout;
