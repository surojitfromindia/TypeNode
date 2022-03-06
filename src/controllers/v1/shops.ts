import { asyncWrapper } from '../../middlewares/asyncWrapper';
import { NextFunction, Request, Response } from 'express';
import { ErrorResponse } from '../../middlewares/errorHandler';
import { ShopModel } from '../../models/Shops';
import { IShop } from '../../Interface/IShop';
import { unqiueNumber } from '../../models/Static';
import { successResponse } from '../../class/Response';
import mongoose, { Types } from 'mongoose';

const getAllShops = asyncWrapper(async (_req: Request, res: Response, next) => {
  try {
    throw new ErrorResponse(404, ['shops not found']);
  } catch (err) {
    next(err);
  }
});

const createShop = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const saveRes = await createShopController(req.body);
    res.locals.status = 201;
    res.responseBody = successResponse(saveRes, 'shop created successfully', ['__v', '_id']);
    next();
  } catch (err) {
    throw new ErrorResponse(404, ['shop can not be created']);
  }
});

const getShop = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const shop_uid = req.params.uid;
    const shop = await ShopModel.findOne({ uid: shop_uid }).populate({ path: 'sub_shops_information', select: 'name' });
    res.locals.status = 200;
    res.responseBody = successResponse(shop, 'shop found', ['__v', '_id']);
    next();
  } catch (err) {
    throw new ErrorResponse(404, ['shop not found']);
  }
});

const createShopController = async (body: IShop, exclude?: [keyof IShop]) => {
  try {
    if (body?.sub_shops) {
      const saveResObjec = await createShopWithSubShopController(body, exclude);
      return saveResObjec;
    } else {
      const shop = new ShopModel(body);
      const saveRes = await shop.save({ validateBeforeSave: true });
      const saveResObjec = saveRes.toObject();

      if (exclude) {
        for (const key of exclude) {
          delete saveResObjec[key];
        }
      }
      return saveResObjec;
    }
  } catch (err) {
    throw err;
  }
};

/**
Create Shop with sub shops,
the sub shops has therir main_brach set as main shops _id
*/
const createShopWithSubShopController = async (body: IShop, exclude?: [keyof IShop]) => {
  const session = await mongoose.startSession();
  session.startTransaction({ comment: 'Trasnaction started' });
  try {
    //if body has sub_shops.
    if (typeof body?.sub_shops !== undefined) {
      //create main shop
      const sub_shops = body.sub_shops || [];
      delete body.sub_shops;
      const mainShop = new ShopModel(body);
      const mainShopSaveResDoc = await mainShop.save({ session: session });
      const mainShopSaveRes = mainShopSaveResDoc.toJSON();

      const mainShopId = mainShopSaveRes._id;
      //loop throw each sub shop and set main_brach
      //create a bulk array
      const bulkShopArray = [];
      for (const shop of sub_shops) {
        delete shop.sub_shops; //delete any farther sub shops
        bulkShopArray.push({
          insertOne: {
            document: {
              ...shop,
              main_branch: mainShopId,
              uid: unqiueNumber().toString(),
            },
          },
        });
      }
      //do bulk insert
      const bulkRes = await ShopModel.bulkWrite(bulkShopArray, {
        session: session,
      });
      if (exclude) {
        for (const key of exclude) {
          delete mainShopSaveRes[key];
        }
      }
      mainShopSaveRes.sub_shops_id = Object.values(bulkRes.insertedIds as [Types.ObjectId]);
      mainShopSaveRes.sub_shops = sub_shops;

      await session.commitTransaction();
      return mainShopSaveRes;
    } else {
      //end session
      await session.abortTransaction();
      throw new Error("can't create shop with no sub shops");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export { getAllShops, getShop, createShop, createShopController };
