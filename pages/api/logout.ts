import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import session from "../../middleware/session";
import requireAuthentication from "../../middleware/requireAuthentication";

const handler = nc<NextApiRequest, NextApiResponse>()
  .use(session)
  .use(requireAuthentication(true))
  .post((req: NextApiRequest, res) => {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ status: "Error on server." });
      } else {
        res.setHeader(
          "Set-Cookie",
          (process.env.SESSION_NAME as string) +
            "=; Path=/; HttpOnly; Max-Age=0; Expires=" +
            new Date().toUTCString() +
            "Same-Site=Strict;",
        );
        res.redirect("/login");
      }
    });
  });

export default handler;
