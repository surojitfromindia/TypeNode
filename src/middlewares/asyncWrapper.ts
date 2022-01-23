
import {Request, Response, NextFunction} from 'express'

type ExpressMiddleware = (req: Request, res: Response, next: NextFunction) => Promise<void>;

const asyncWrapper = (fn:ExpressMiddleware)=>(req:Request,res:Response,next:NextFunction) =>   {
    return Promise.resolve(fn(req,res,next)).catch(next)
}
export {asyncWrapper};