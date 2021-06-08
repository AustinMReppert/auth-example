import { NextApiRequest, NextApiResponse } from "next";
import { Client, QueryResult } from "pg";
import bcrypt from "bcrypt";
import nc from "next-connect";
import session from "../../middleware/session";
import requireAuthentication from "../../middleware/requireAuthentication";

const handler = nc<NextApiRequest, NextApiResponse>()
  .use(session)
  .use(requireAuthentication(false))
  .post((req: NextApiRequest, res) => {
    let username: string = req.body.username;
    let password: string = req.body.password;

    if (!username || !password) {
      res.status(400).json({ status: "Bad request." });
      return;
    }

    const client: Client = new Client();
    client.connect((err: Error) => {
      if (err) {
        res.status(501).json({ status: "Error on server." });
      } else {
        client.query(
          'select password, id from "user" where username = $1',
          [username],
          (err: Error, queryResult: QueryResult) => {
            if (err) {
              res.statusCode = 501;
              res.json({ status: "Error on server." });
              client.end();
              return;
            } else {
              if (queryResult.rows.length === 1) {
                bcrypt.compare(password, queryResult.rows[0].password, (err: Error, same: boolean) => {
                  if (err) {
                    res.statusCode = 501;
                    res.json({ status: "Ok." });
                  } else if (!same) {
                    res.statusCode = 401;
                    res.json({ status: "Invalid login credentials." });
                  } else {
                    res.statusCode = 200;
                    req.session.userUUID = queryResult.rows[0].id;
                    res.redirect("/profile");
                  }
                  client.end();
                  return;
                });
              } else {
                res.statusCode = 401;
                res.json({ status: "Invalid login credentials." });
                return;
              }
            }
          },
        );
      }
    });
  });

export default handler;
