import { asyncWrapper } from '../../middlewares/asyncWrapper';
import { NextFunction, Request, Response } from 'express';
import { ErrorResponse } from '../../middlewares/errorHandler';
import { successResponse } from '../../class/Response';
import { IProduct } from '../../Interface/IProducts';
import { ProductModel } from '../../models/Products';

const createProduct = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const saveRes = await createProductController(req.body);
    res.locals.status = 201;
    res.responseBody = successResponse(saveRes, 'Products created successfully', ['__v', '_id']);
    next();
  } catch (err) {
    throw new ErrorResponse(404, ['Products can not be created']);
  }
});

const createProductController = async (products: IProduct) => {
  try {
    const product = new ProductModel(products);
    const productsSaveRes = await product.save();
    return productsSaveRes;
  } catch (error) {
    throw error;
  }
};

const getProductController = async (product_uid: string, include?: string[]) => {
  try {
    if (include) {
      if (include.length > 0) {
        let projection = include.reduce((curr, acc) => ({ [acc]: 1, ...curr }), {});
        let product = await ProductModel.findOne({ uid: product_uid }, { _id: 0, ...projection }).lean();
        return product;
      }
    }
    const productSaveRes = await ProductModel.findOne({ uid: product_uid }).lean();
    const { _id, ...product } = productSaveRes!;
    return product;
  } catch (error) {
    throw error;
  }
};

export { createProduct, createProductController, getProductController };
