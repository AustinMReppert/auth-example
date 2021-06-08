import { Component, ReactNode } from "react";
import { Authenticated } from "../utils/authenticate";

interface ProtectedLinkProps extends Authenticated {
  children: ReactNode;
}

class ProtectedLink extends Component<ProtectedLinkProps> {
  constructor(props: ProtectedLinkProps) {
    super(props);
  }

  render() {
    return this.props.authenticated ? this.props.children : "";
  }
}

export default ProtectedLink;
