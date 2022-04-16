import { connectMock, closeMock, dropCollection } from '../connection/db';
import { createProductController, getProductController } from '../controllers/v1/products';
import { Types } from 'mongoose';

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

  let product_uid: string = '';
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
