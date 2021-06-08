import { IncomingMessage } from "http";

export interface Authenticated {
  authenticated: boolean;
}

const isAuthenticated = (req: IncomingMessage): boolean => {
  return !!req.session.userUUID;
};

export default isAuthenticated;
