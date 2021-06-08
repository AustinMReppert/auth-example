import React from "react";
import Layout from "../components/Layout";
import styled from "styled-components";
import { GetServerSidePropsContext } from "next";
import nc from "next-connect";
import session from "../middleware/session";
import ProtectedLink from "../components/ProtectedLink";
import requireAuthentication from "../middleware/requireAuthentication";
import isAuthenticated, { Authenticated } from "../utils/authenticate";

interface ProfileProps extends Authenticated {
  user?: string;
}

interface ProfileState {}

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

class Profile extends React.Component<ProfileProps, ProfileState> {
  constructor(profileProps: ProfileProps) {
    super(profileProps);
    this.state = {};
  }

  render() {
    return (
      <Layout title="Profile" authenticated={this.props.authenticated}>
        <ProtectedLink authenticated={this.props.authenticated}>Hello, {this.props.user}</ProtectedLink>
      </Layout>
    );
  }
}

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<{ props: ProfileProps }> {
  const handler = nc().use(session).use(requireAuthentication(true));
  await handler.run(context.req, context.res);
  return {
    props: {
      user: context.req.session.userUUID,
      authenticated: isAuthenticated(context.req),
    },
  };
}

export default Profile;
