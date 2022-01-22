import express, {json} from 'express';
import {env} from "process"
import { Application  } from 'express';

//import the routes
import {router as apiV1Router} from "./routes/v1";

//node enviroments
env.PORT = "5000";
env.REQ_LIMIT = "100";

const app : Application= express();

//json body parser only parse those body
//whoes content-type is application/json
app.use(json({limit: env.REQ_LIMIT}));



app.use("/api/v1", apiV1Router);


app.listen(env.PORT, () => {
  console.log('Application started on port 3000!');
});

console.log("Hello");

