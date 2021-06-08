import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import nc, { NextHandler } from "next-connect";
import session from "../../middleware/session";
import hashPass from "../../middleware/hashPass";
import { Client, QueryResult } from "pg";
import requireAuthentication from "../../middleware/requireAuthentication";

const handler = nc<NextApiRequest, NextApiResponse>()
  .use(session)
  .use(requireAuthentication(false))
  .use(hashPass)
  .post((req: NextApiRequest, res) => {
    if (req.session.userUUID) {
      res.redirect("/logout");
      return;
    }

    let username: string = req.body.username;
    let password: string = req.body.password;

    if (!username || !password) {
      res.status(400).json({ status: "Bad request." });
      return;
    }

    const client: Client = new Client();
    let statusCode: number = -1;
    let status: string = "";
    client.connect((err: Error) => {
      if (err) {
        res.status(500).json({ status: "Error on server." });
        return;
      } else {
        client.query(
          'insert into "user"(username, password) values ($1, $2) returning id',
          [username, password],
          (err: Error, queryResult: QueryResult) => {
            if (err) {
              if ((err as Error & { code: string }).code === "23505") {
                statusCode = 409;
                status = "Username already taken.";
              } else {
                statusCode = 500;
                status = "Error on server.";
              }
            } else {
              req.session.userUUID = queryResult.rows[0].id;
            }
            client.end((err: Error) => {
              if (err) {
                statusCode = 500;
                status = "Error on server.";
              } else if (statusCode == -1) {
                statusCode = 200;
                status = "Ok.";
                res.redirect("/profile");
                return;
              }
              res.status(statusCode).json({ status: status });
            });
          },
        );
      }
    });
  });

export default handler;
