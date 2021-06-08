import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";

const handler = nc<NextApiRequest, NextApiResponse>();
handler.get((req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).end("<h1>Potato</h1>");
});

export default handler;
