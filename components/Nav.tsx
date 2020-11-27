import Link from 'next/link';
import { FC } from 'react';
import styled from 'styled-components';

interface NavProps {}

const A = styled.a`
  display: inline-block;
  padding: 1em;
  cursor: grab;
  user-select: none;

  &:hover {
    color: #ffffff;
  }
`;

const Header = styled.header`
  width: 100%;
  height: 48px;
  color: #cdcdcd;
  background-color: #323232;
`;

const NavBar = styled.nav`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Nav: FC<NavProps> = (props: NavProps) => {
  return (
    <Header>
      <NavBar>
        <div>
          <Link href="/">
            <A>Auth Example</A>
          </Link>
        </div>
        <div>
          <Link href="/">
            <A>Home</A>
          </Link>
          <Link href="/login">
            <A>Login</A>
          </Link>
        </div>
      </NavBar>
    </Header>
  );
};

export default Nav;
