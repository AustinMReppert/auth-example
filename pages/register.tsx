import React from "react";
import Layout from "../components/Layout";
import styled from "styled-components";

interface RegisterProps {}

interface RegisterState {
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

class Login extends React.Component<RegisterProps, RegisterState> {
  usernameRef: React.RefObject<HTMLInputElement>;

  constructor(registerProps: RegisterProps) {
    super(registerProps);
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
      <Layout title="Register">
        <Form method="POST" action="/api/register">
          <H1>Register</H1>
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
          <Input type="submit" name="submit" value="Register" />
        </Form>
      </Layout>
    );
  }
}

export default Login;
