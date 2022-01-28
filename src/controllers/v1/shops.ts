import { asyncWrapper } from '../../middlewares/asyncWrapper';
import { Request, Response } from 'express';
import { ErrorResponse } from '../../middlewares/errorHandler';
import { ShopModel } from '../../models/Shops';
import { successResponse } from '../../class/Response';

const getAllShops = asyncWrapper(async (_req: Request, res: Response, next) => {
  try {
    throw new ErrorResponse(404, 'shops not found');
  } catch (err) {
    next(err);
  }
});

const createShop = asyncWrapper(async (req: Request, res: Response) => {
  try {
    const saveRes = await createShopController(req.body);
    res
      .status(200)
      .json(
        successResponse(200, saveRes, 'shop created successfully', [
          '_id',
          '__v',
        ])
      );
  } catch (err) {
    throw new ErrorResponse(404, 'shop can not be created');
  }
});

const createShopController = async (body: object, exclude?: string[]) => {
  try {
    const shop = new ShopModel(body);
    const saveRes = await shop.save({ validateBeforeSave: true });
    const saveResObjec = saveRes.toObject();
    
    if (exclude) {
      for (const key of exclude) {
        delete saveResObjec[key];
      }
    }
    return saveResObjec;
  } catch (err) {
    throw err;
  }
};

export { getAllShops, createShop, createShopController };
