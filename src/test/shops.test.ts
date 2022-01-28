import { connectMock, closeMock } from '../connection/db';
import { createShopController } from '../controllers/v1/shops';

beforeAll(async () => {
  await connectMock();
});

afterAll(async () => await closeMock());

test('create shop does not return __v', async () => {
  const shop = await createShopController({ name: 'Bob', staff_count: 4 }, [
    '__v',
  ]);
  expect(shop).not.toHaveProperty('__v');
});

// let shop2;
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

  expect(shop1.uid).not.toBe(shop2.uid)
  
});
