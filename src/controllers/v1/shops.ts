import {asyncWrapper} from "../../middlewares/asyncWrapper"
import { Request, Response } from "express";
import {ErrorResponse} from "../../middlewares/errorHandler"



const getAllShops = asyncWrapper(async (_req:Request,res:Response,next)=>{
    try{
        throw new ErrorResponse(404,"shops not found");
    } catch(err){
        next(err);
    }
    
})


export {getAllShops}