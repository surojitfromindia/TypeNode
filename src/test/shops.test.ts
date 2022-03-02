import { connectMock, closeMock, dropMockDb } from '../connection/db';
import { createShopController } from '../controllers/v1/shops';
import { shopSchema } from '../validation/shop';
import { IShop as Shop } from '../Interface/IShop';

describe('validate shop model', () => {
  test('sub shop body must have name and stuff_counr', () => {
    const mainShop = {
      name: 'main shop',
      staff_count: 1,
      sub_shops: [
        { name: 'sub shop 1', staff_count: 1 },
        { name: 'sub shop 2', staff_count: 1 },
      ],
    };
    const validationResult = shopSchema.validate(mainShop);
    expect(validationResult).not.toHaveProperty('error');
  });
});

describe('save single shop in data', () => {
  beforeAll(async () => {
    await connectMock();
  });

  afterAll(async () => {
    await dropMockDb();
    await closeMock();
  });
  test('create shop does not return __v', async () => {
    const shop = await createShopController({ name: 'Bob', staff_count: 4 }, [
      '__v',
    ]);
    expect(shop).not.toHaveProperty('__v');
  });

  test('no two shop has same uid', async () => {
    //expect.assertions(2)
    const shop1 = await createShopController({
      name: 'Abc shop',
      staff_count: 4,
    });
    const shop2 = await createShopController({
      name: 'Abc shop',
      staff_count: 4,
    });

    expect(shop1.uid).not.toBe(shop2.uid);
  });
});

describe('save single shop with multiple sub shop in data', () => {
  beforeAll(async () => {
    await connectMock();
  });

  afterAll(async () => {
    await dropMockDb();
    await closeMock();
  });
  const mainShop:Shop = {
    name: 'main shop',
    staff_count: 1,
    sub_shops: [
      { name: 'sub shop 1', staff_count: 1 },
      { name: 'sub shop 2', staff_count: 1 },
    ],
  };

  test('validate multiple sub shop before save', () => {
    const validationResult = shopSchema.validate(mainShop);
    expect(validationResult).not.toHaveProperty('error');
  });

  test('sub shops main_branch must match main shops _id', async () => {
    const result = await createShopController(mainShop);
    expect(result.name).toBe(mainShop.name);
    expect(result?.sub_shops?.length).toBe(2);
  });
});

