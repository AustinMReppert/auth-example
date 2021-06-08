import React from "react";
import Layout from "../components/Layout";
import styled from "styled-components";
import { GetServerSidePropsContext } from "next";
import nc from "next-connect";
import session from "../middleware/session";
import requireAuthentication from "../middleware/requireAuthentication";
import authenticate, { Authenticated } from "../utils/authenticate";
import isAuthenticated from "../utils/authenticate";

interface LogoutProps extends Authenticated {}

interface LogoutState {
  username: string;
  password: string;
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const H1 = styled.h1`
  margin-bottom: 2em;
`;

const Input = styled.input`
  margin: 1em;
`;

class Logout extends React.Component<LogoutProps, LogoutState> {
  usernameRef: React.RefObject<HTMLInputElement>;

  constructor(logoutProps: LogoutProps) {
    super(logoutProps);
    this.state = { username: "", password: "" };
    this.usernameRef = React.createRef<HTMLInputElement>();
  }

  onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ username: e.target.value });
  };

  onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: e.target.value });
  };

  async componentDidMount() {
    let usernameInput: HTMLInputElement | null = this.usernameRef.current;
    if (usernameInput) usernameInput.focus();
  }

  render() {
    return (
      <Layout title="Logout" authenticated={this.props.authenticated}>
        <Form method="POST" action="/api/logout">
          <H1>Logout</H1>
          <Input type="submit" name="submit" value="Logout" />
        </Form>
      </Layout>
    );
  }
}

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<{ props: Authenticated }> {
  const handler = nc().use(session).use(requireAuthentication(true));
  try {
    await handler.run(context.req, context.res);
  } catch (e) {
    console.log(e);
  }
  return {
    props: {
      authenticated: isAuthenticated(context.req),
    },
  };
}

export default Logout;
