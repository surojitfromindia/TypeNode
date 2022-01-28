import express, { json } from 'express';
import { Application } from 'express';
import { errorHandler } from './middlewares/errorHandler';
import { connect as connectToDb } from './connection/db';
import * as dotenv from 'dotenv';
//import the routes
import { router as apiV1Router } from './routes/v1';

dotenv.config({ debug: true, path: __dirname + '/.env' });

connectToDb();

const app: Application = express();


app.use(json({ limit: 100 }));
app.use('/api/v1', apiV1Router);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Application started on port ${process.env.PORT}!`);
});
