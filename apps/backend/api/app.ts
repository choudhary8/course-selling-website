import express from 'express';
import cors from 'cors';
import adminRouter from './routes/admin.routes';
import userRouter from './routes/users.routes';
import { errorHandler } from './middlewares/error.middlewares';

const app=express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/admin',adminRouter);
app.use('/api/v1/users',userRouter);

app.use(errorHandler as any)

export default app;