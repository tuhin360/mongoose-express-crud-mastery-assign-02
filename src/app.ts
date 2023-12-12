import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRouter } from './routes/user.route';
 
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

app.use('/api', userRouter);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome To Mongoose Express CRUD Mastery Assignment',
  });
});


export default app;
