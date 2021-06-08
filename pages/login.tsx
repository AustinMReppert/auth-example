import React from "react";
import Layout from "../components/Layout";
import styled from "styled-components";
import { GetServerSidePropsContext } from "next";
import nc from "next-connect";
import session from "../middleware/session";
import requireAuthentication from "../middleware/requireAuthentication";
import isAuthenticated, { Authenticated } from "../utils/authenticate";

interface LoginProps extends Authenticated {}

interface LoginState {
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

class Login extends React.Component<LoginProps, LoginState> {
  usernameRef: React.RefObject<HTMLInputElement>;

  constructor(loginProps: LoginProps) {
    super(loginProps);
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
      <Layout title="Login" authenticated={this.props.authenticated}>
        <Form method="POST" action="/api/login">
          <H1>Login</H1>
          <Input
            type="username"
            name="username"
            placeholder="username"
            value={this.state.username}
            onChange={this.onUsernameChange}
            ref={this.usernameRef}
          />
          <Input
            type="password"
            name="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.onPasswordChange}
          />
          <Input type="submit" name="submit" value="Login" />
        </Form>
      </Layout>
    );
  }
}

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<{ props: Authenticated }> {
  const handler = nc().use(session).use(requireAuthentication(false));
  await handler.run(context.req, context.res);
  return {
    props: {
      authenticated: isAuthenticated(context.req),
    },
  };
}

export default Login;
