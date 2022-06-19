import { asyncWrapper } from '../../middlewares/asyncWrapper';
import { NextFunction, Request, Response } from 'express';
import { ErrorResponse } from '../../middlewares/errorHandler';
import { successResponse } from '../../class/Response';
import { IProduct } from '../../Interface/IProducts';
import { Product, UpdateableFields } from '../../models/Products';
import { TransactionError } from '../../utils/Errors';
import Util from '../../utils/Util';

//create a single product
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

//find a single product from the database
const getProduct = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  try {
    let select_fields: string[] = [];

    if (typeof req?.query?.select === 'string') {
      select_fields = Util.removeElementFromArray(req.query.select, ['_id', 'createdAt', 'updatedAt']);
    }
    
    const product = await getProductController(req.params.product_uid, select_fields);
    res.locals.status = 200;
    res.responseBody = successResponse(product, 'Product found successfully', ['__v', '_id']);
    next();
  } catch (error) {
    throw new ErrorResponse(404, ['Product not found']);
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
        const projection = include.reduce((curr, acc) => ({ [acc]: 1, ...curr }), {});
        const product = await Product.findOne({ uid: product_uid }, { _id: 0, ...projection }).lean();
        return product;
      }
    }
    const productSaveRes = await Product.findOne({ uid: product_uid }).lean();
    if (productSaveRes?._id) {
      delete productSaveRes._id;
    }
    const { ...product } = productSaveRes;
    return product;
  } catch (error) {
    throw error;
  }
};

const patchProductController = async (product_uid: string, new_name: string, patch_type: UpdateableFields) => {
  try {
    switch (patch_type) {
      case 'name': {
        const renamed_product = await Product.updateField(product_uid, patch_type, new_name);
        if ('_id' in renamed_product) {
          delete renamed_product._id;
          const { ...product } = renamed_product;
          return product;
        }
      }
      default: {
        throw new TransactionError('P03');
      }
    }
  } catch (error) {
    if (error instanceof TransactionError) {
      if (error.hasOwnProperty('code')) {
        throw error;
      }
    }
    throw new TransactionError('P00');
  }
};

const patchProductsController = async (
  product_uids: string[],
  new_name: string,
  patch_type: UpdateableFields
): Promise<string> => {
  try {
    switch (patch_type) {
      case 'name':
      case 'category':
      case 'inventories':
      case 'description':
      case 'prices': {
        const renamed_products = await Product.updateField(product_uids, patch_type, new_name);
        if (!('_id' in renamed_products)) {
          return `products updated successfully`;
        }
      }
      default: {
        throw new TransactionError('P03');
      }
    }
  } catch (error) {
    if (error instanceof TransactionError) {
      if (error.hasOwnProperty('code')) {
        throw error;
      }
    }
    throw new TransactionError('P00');
  }
};

export {
  createProduct,
  getProduct,
  createProductController,
  getProductController,
  patchProductController,
  patchProductsController,
};
