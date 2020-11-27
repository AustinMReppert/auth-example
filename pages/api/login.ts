import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse): void => {
  if (req.body.username && req.body.password) {
    let username: string = req.body.username;
    let password: string = req.body.password;
    if (username === 'admin' && password === 'password') {
      res.statusCode = 200;
      res.json({ status: 'Ok.' });
    } else {
      res.statusCode = 401;
      res.json({ status: 'Invalid login credentials.' });
    }
  } else {
    res.statusCode = 400;
    res.json({ status: 'Bad Request.' });
  }
};
