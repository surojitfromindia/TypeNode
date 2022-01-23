import { Router } from "express";
import { Request, Response } from "express";
import {router as ShopRoute} from "./v1/shops";


const router:Router =  Router({caseSensitive: true});

//get test
router.get("/",(_req:Request, res:Response) => {
    res.status(200).send("API v1");
})

//post test
router.post("/json_test", (req:Request,res) => {
    const json_body = req.body;
    res.status(200).send(json_body);
})

router.use("/shops",ShopRoute);


router.all("/*", (_req:Request,res) => {
    res.status(404).send("Not Found");
})


export  {router};