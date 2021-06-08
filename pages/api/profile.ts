import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import nc, { NextHandler } from "next-connect";
import session from "../../middleware/session";
import hashPass from "../../middleware/hashPass";
import { Client, QueryResult } from "pg";

const handler = nc<NextApiRequest, NextApiResponse>()
  .use(session)
  .post((req: NextApiRequest, res) => {
    if (!req.session.userUUID) {
      res.redirect("/login");
      return;
    } else {
      res.status(200).json({ uuid: req.session.userUUID });
    }
  });

export default handler;
