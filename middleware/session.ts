import nc, { Middleware, NextHandler } from "next-connect";
import expressSession, { CookieOptions, SessionOptions } from "express-session";
import { IncomingMessage, ServerResponse } from "http";
import connectPgSimple from "connect-pg-simple";

const cookieOptions: CookieOptions = { sameSite: true, secure: false, httpOnly: true };

const store = new (connectPgSimple(expressSession))({});

// Declaration merging/module augmentation
// Add types to express-session's SessionData interface.
declare module "express-session" {
  interface SessionData {
    userUUID: string;
  }
}

// Patch IncomingMessage to include express-session data.
declare module "http" {
  interface IncomingMessage {
    session: expressSession.Session & Partial<expressSession.SessionData>;
    sessionID: string;
  }
}

const sessionOptions: SessionOptions = {
  secret: process.env.SESSION_SECRET as string,
  cookie: cookieOptions,
  resave: false,
  saveUninitialized: false,
  store: store,
  name: process.env.SESSION_NAME as string,
};

/**
 * Adds session data to the request using express-sessions.
 */
const session = nc<IncomingMessage, ServerResponse>().use(expressSession(sessionOptions));

export default session;
