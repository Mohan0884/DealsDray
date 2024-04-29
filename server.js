import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import 'express-async-errors';
import bodyParser from 'body-parser'
const app = express();
dotenv.config();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json())
app.use(morgan('dev'));
import errorHandlerMiddleware from './middleware/errorHandleMiddleware.js';


//routers
import employeeRouter from './routes/employeeRoutes.js'
import authRouter from './routes/authRoutes.js';
// import { authenticateUser } from './middleware/validationMiddleware.js';

import cookieParser from 'cookie-parser';
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
 
app.use('/api/v1/employees',employeeRouter);
app.use('/api/v1/auth', authRouter);
app.use(errorHandlerMiddleware);
//Not Found Middleware
  app.use('*', (req, res) => {
    res.status(404).json({ msg: 'not found' });
  });

//Error Middleware
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ msg: 'something went wrong' });
  });
  const port=process.env.PORT || 5100;
  try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`server running on PORT ${port}....`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }