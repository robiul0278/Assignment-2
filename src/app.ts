// const express = require('express')
import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import { userRoutes } from './app/modules/users/users.route';
// const port = 3000

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/users', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Assignment-2 running...!');
});

export default app;
