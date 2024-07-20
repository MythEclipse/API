import express, { Request, Response, NextFunction } from 'express';

const app = express();
const port: number = 3000;

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ data: 'Hello World' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
