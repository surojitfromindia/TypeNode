import { asyncWrapper } from '../../middlewares/asyncWrapper';
import { NextFunction, Request, Response } from 'express';
import { ErrorResponse } from '../../middlewares/errorHandler';
import { successResponse } from '../../class/Response';
import { IProduct } from '../../Interface/IProducts';
import { Product } from '../../models/Products';
import { TransactionError } from '../../utils/Errors';

const createProduct = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const saveRes = await createProductController(req.body);
    res.locals.status = 201;
    res.responseBody = successResponse(saveRes, 'Product created successfully', ['__v', '_id']);
    next();
  } catch (err) {
    throw new ErrorResponse(404, ['Product can not be created']);
  }
});

const createProductController = async (products: IProduct) => {
  try {
    const product = new Product(products);
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
        let product = await Product.findOne({ uid: product_uid }, { _id: 0, ...projection }).lean();
        return product;
      }
    }
    const productSaveRes = await Product.findOne({ uid: product_uid }).lean();
    const { _id, ...product } = productSaveRes!;
    return product;
  } catch (error) {
    throw error;
  }
};

const patchProductController = async (product_uid: string, new_name: string, patch_type: PatchType) => {
  try {
    switch (patch_type) {
      case 'name': {
        let renamed_product = await Product.updateName(product_uid, new_name);
        if ('_id' in renamed_product) {
          const { _id, ...product } = renamed_product!;
          return product;
        }
      }
      default: {
        throw new TransactionError('P03');
      }
    }
  } catch (error: any) {
    if (error.hasOwnProperty('code')) {
      throw error;
    }
    throw new TransactionError('P00');
  }
};

const patchProductsController = async (
  product_uids: string[],
  new_name: string,
  patch_type: PatchType
): Promise<string> => {
  try {
    switch (patch_type) {
      case 'name': {
        let renamed_products = await Product.updateName(product_uids, new_name);
        if (!('_id' in renamed_products)) {
          return `products updated successfully`;
        }
      }
      default: {
        throw new TransactionError('P03');
      }
    }
  } catch (error: any) {
    if (error.hasOwnProperty('code')) {
      throw error;
    }
    throw new TransactionError('P00');
  }
};

type PatchType = 'name' | 'price' | 'quantity' | 'description' | 'image';

export {
  createProduct,
  createProductController,
  getProductController,
  patchProductController,
  patchProductsController,
};
