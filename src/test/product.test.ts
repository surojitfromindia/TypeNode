import { connectMock, closeMock, dropCollection } from '../connection/db';
import {
  createProductController,
  getProductController,
  patchProductController,
  patchProductsController,
} from '../controllers/v1/products';
import { Types } from 'mongoose';
import { TransactionError } from '../utils/Errors';

const STATICMAINBRANCHID = '62528da6efa3ba944ec28984';

describe('Create a new product', () => {
  beforeAll(async () => {
    await connectMock();
  });

  afterAll(async () => {
    await dropCollection('products');
    await closeMock();
  });

  test('create a product', async () => {
    const products = await createProductController({
      name: 'Apple',
      prices: [{ currency: 'INR', price: 100 }],
      description: 'Apple is a fruit',
      main_branch: new Types.ObjectId(STATICMAINBRANCHID),
    });
    expect(products).toHaveProperty('uid');
  });

  test('product name must match given name', async () => {
    const products = await createProductController({
      name: 'Alopine',
      prices: [{ currency: 'INR', price: 200 }],
      description: 'I dont like aplopine',
      main_branch: new Types.ObjectId(STATICMAINBRANCHID),
    });
    expect(products.name).toBe('Alopine');
  });

  test('product prices must match given prices', async () => {
    const products = await createProductController({
      name: 'Alovera',
      prices: [
        { currency: 'INR', price: 455.52 },
        { currency: 'SAR', price: 460 },
      ],
      description: 'I dont like aplopine',
      main_branch: new Types.ObjectId(STATICMAINBRANCHID),
    });
    expect(products.prices[0].price).toBe(455.52);
    expect(products.prices[1].price).toBe(460);
  });

  let product_uid = '';
  test('product must have a uid', async () => {
    const products = await createProductController({
      name: 'Asofodita',
      prices: [
        { currency: 'INR', price: 455.52 },
        { currency: 'SAR', price: 460 },
      ],
      description: 'A herb',
      main_branch: new Types.ObjectId(STATICMAINBRANCHID),
    });
    if (products.uid) product_uid = products.uid;
    expect(products.uid).toBeDefined();
  });

  test('product must not return _id  get request', async () => {
    const product = await getProductController(product_uid, ['description', 'name']);
    expect(product).not.toHaveProperty('_id');
  });

  test('product must return only selected field if mentioned', async () => {
    const select = ['name', 'prices', 'main_branch', 'description'];
    const product = await getProductController(product_uid, select);

    expect(Object.getOwnPropertyNames(product).length).toBe(select.length);
  });
});

describe('update a product', () => {
  let product_uid = '';

  beforeAll(async () => {
    await connectMock();
    const products = await createProductController({
      name: 'Asofodita',
      prices: [
        { currency: 'INR', price: 455.52 },
        { currency: 'SAR', price: 460 },
      ],
      description: 'A herb',
      main_branch: new Types.ObjectId(STATICMAINBRANCHID),
    });
    if (products.uid) product_uid = products.uid;
  });
  afterAll(async () => {
    await dropCollection('products');
    await closeMock();
  });
  test('product must be updated with new name', async () => {
   const  product = await patchProductController(product_uid, 'Apple', 'name');
    expect(product.name).toBe('Apple');
  });
  test('update must throw an error if patch type is not valid', async () => {
    // @ts-ignore
    await expect(patchProductController(product_uid, 'Apple', 'invalid')).rejects.toThrow(new TransactionError('P03'));
  });
});

describe('update multiple products', () => {
  let product_uid_1 = '';
  let product_uid_2 = '';

  beforeAll(async () => {
    await connectMock();
    const product_1 = await createProductController({
      name: 'Asofodita',
      prices: [
        { currency: 'INR', price: 455.52 },
        { currency: 'SAR', price: 460 },
      ],
      description: 'A herb',
      main_branch: new Types.ObjectId(STATICMAINBRANCHID),
    });
    const product_2 = await createProductController({
      name: 'Bilok',
      prices: [
        { currency: 'INR', price: 455.52 },
        { currency: 'SAR', price: 460 },
      ],
      description: 'A herb',
      main_branch: new Types.ObjectId(STATICMAINBRANCHID),
    });
    if (product_1.uid) product_uid_1 = product_1.uid;
    if (product_2.uid) product_uid_2 = product_2.uid;
  });
  afterAll(async () => {
    await dropCollection('products');
    await closeMock();
  });
  test('all products must be updated with new name', async () => {
    const product = await patchProductsController([product_uid_1, product_uid_2], 'Apple', 'name');
    expect(typeof product).toBe('string');
  });
  test('update must throw an error if patch type is not valid', async () => {
    // @ts-ignore
    await expect(patchProductController([product_uid_1, product_uid_2], 'Apple', 'invalid')).rejects.toThrow(
      new TransactionError('P03')
    );
  });
});
