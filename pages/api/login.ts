import { NextApiRequest, NextApiResponse } from "next";
import { Client, QueryResult } from "pg";
import bcrypt from "bcrypt";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise<void>((resolve) => {
    if (req.body.username && req.body.password) {
      let username: string = req.body.username;
      let password: string = req.body.password;

      const client: Client = new Client();
      client.connect();
      client.query(
        "select password from users where username = '" + username + "'",
        (err: Error, queryResult: QueryResult) => {
          if (err) {
            console.error(err);
            res.statusCode = 501;
            res.json({ status: "Error on server." });
            return resolve();
          } else {
            if (queryResult.rows.length === 1) {
              bcrypt.compare(password, queryResult.rows[0].password, (err: Error, same: boolean) => {
                if (err) {
                  res.statusCode = 501;
                  res.json({ status: "Ok." });
                  return resolve();
                } else if (!same) {
                  res.statusCode = 401;
                  res.json({ status: "Invalid login credentials." });
                  return resolve();
                } else {
                  res.statusCode = 200;
                  res.json({ status: "Ok." });
                  return resolve();
                }
              });
            } else {
              res.statusCode = 401;
              res.json({ status: "Invalid login credentials." });
              return resolve();
            }
          }
        },
      );
    } else {
      res.statusCode = 400;
      res.json({ status: "Bad Request." });
      return resolve();
    }
  });
};
