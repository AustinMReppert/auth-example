import { NextApiRequest, NextApiResponse } from "next";
import { Client, QueryResult } from "pg";

import bcrypt from "bcrypt";

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  return new Promise<void>((resolve) => {
    if (req.body.username && req.body.password) {
      let username: string = req.body.username;
      let password: string = req.body.password;

      bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS as string), (err: Error, salt: string) => {
        if (err) {
          res.statusCode = 501;
          res.json({ status: "Error on server." });
          return resolve();
        } else {
          bcrypt.hash(password, salt, (err: Error, hash: string) => {
            if (err) {
              res.statusCode = 501;
              res.json({ status: "Error on server." });
              return resolve();
            } else {
              const client: Client = new Client();
              client.connect();
              client.query(
                "insert into users(username, password) values ('" + username + "', '" + hash + "')",
                (err: Error, queryResult: QueryResult) => {
                  if (err) {
                    res.statusCode = 501;
                    res.json({ status: "Error on server." });
                    return resolve();
                  } else {
                    res.statusCode = 200;
                    res.json({ status: "Ok." });
                    return resolve();
                  }
                },
              );
            }
          });
        }
      });
    } else {
      res.statusCode = 400;
      res.json({ status: "Bad Request." });
      return resolve();
    }
  });
};
