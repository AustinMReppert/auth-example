import nc, { Middleware, NextHandler } from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

/**
 * Hashes the password field within the body. If the field is missing, error 400 is thrown.
 */
const hashPass = nc<NextApiRequest, NextApiResponse>().use(
  (req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
    let password: string = req.body.password;
    if (!password) {
      res.status(400).json({ status: "Bad request." });
      return;
    }

    bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS as string), (err: Error, hash: string) => {
      if (err) {
        res.statusCode = 400;
        res.json({ status: "Bad request." });
      } else {
        req.body.password = hash;
        next();
      }
    });
  },
);

export default hashPass;
