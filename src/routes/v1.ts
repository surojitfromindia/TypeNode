import { Router, RouterOptions } from "express";
import { Request, Response } from "express";


const router:Router =  Router({caseSensitive: true});

router.get("/",(_req:Request, res:Response, next) => {
    res.status(200).send("API v1");
})

router.post("/json_test", (req:Request,res,next) => {
    let json_body = req.body;
    res.status(200).send(json_body);
})

router.all("/*", (req:Request,res,next) => {
    res.status(404).send("Not Found");
})


//export the router
export  {router};