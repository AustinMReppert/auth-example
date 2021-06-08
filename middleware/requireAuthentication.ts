import nc, { Middleware, NextHandler, NextConnect } from "next-connect";
import { IncomingMessage } from "connect";
import { ServerResponse } from "http";

/**
 * If the route requires authentication and the request is not authenticated, redirected to login.
 * If the route requires no authentication and the request is authenticated, then redirect to profile.
 * @param requireAuthentication True if requires authentication and false if requires no authentication.
 */
const requireAuthentication = (requireAuthentication: boolean): NextConnect<IncomingMessage, ServerResponse> => {
  return nc<IncomingMessage, ServerResponse>().use((req: IncomingMessage, res: ServerResponse, next: NextHandler) => {
    res.setHeader("Cache-Control", "no-store");
    let authenticated: boolean = !!req.session.userUUID;

    if (requireAuthentication && !authenticated) {
      res.writeHead(301, { Location: "/login" });
      res.end();
    } else if (!requireAuthentication && authenticated) {
      res.writeHead(301, { Location: "/profile" });
      res.end();
    } else {
      next();
    }
  });
};

export default requireAuthentication;
