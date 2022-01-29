import { staffSchema } from '../validation/staff';
import { connectMock, closeMock, dropMockDb } from '../connection/db';
import { createStaffController } from '../controllers/v1/staff';

describe('validate staff creation and save to db', () => {
  test('validate staff payload before save', async () => {
    const body = {
      first_name: 'Kooper',
      last_name: 'Kipper',
      email: 'kooper@gmailo.com',
      temporalPassword: '1234567890',
    };
    const validationResult = await staffSchema.validateAsync(body);
    expect(validationResult).toEqual(body);
  });

  describe('temporal password test', () => {
    test('password less than 10 must have error property', () => {
      const body = {
        name: 'Kooper',
        email: 'kooper@gmailo.com',
        temporalPassword: '438893848',
      };
      const result = staffSchema.validate(body);
      expect(result).toHaveProperty('error');
    });

    test('no temporalPassword does not throw error not have error', () => {
      const body = {
        first_name: 'Kooper',
        last_name: 'Kipper',
        email: 'kooper@gmailo.com',
      };
      const result = staffSchema.validate(body);
      expect(result).not.toHaveProperty('error');
    });
  });
});

describe('save staff data to db', () => {
  beforeAll(async () => {
    await connectMock();
  });

  afterAll(async () => {
    await dropMockDb();
    await closeMock();
  });

  test('save staff data to db', async () => {
    const body = {
      first_name: 'Kooper',
      last_name: 'Kipper',
      email: 'kooper@gmailo.com',
      temporalPassword: '1234567890',
    };

    const result = await createStaffController(body);
    expect(result.first_name).toBe('Kooper');
  });

  let staff0;
  test('empty staff temporal must be genrated with length 10 ', async () => {
    const body = {
      first_name: 'Kooper',
      last_name: 'Kipper',
      email: 'kooper@gmailo.com',
    };

    staff0 = await createStaffController(body);
    expect(staff0.temporalPassword.length).toBe(10);
  });

  let staff1;
  test('if given password is equal temporalPassword must match that', async () => {
    const body = {
      first_name: 'Kooper',
      last_name: 'Kipper',
      email: 'kooper@gmailo.com',
      temporalPassword: '1234567890',
    };

    staff1 = await createStaffController(body);
    expect(staff1.temporalPassword).toBe(body.temporalPassword);
  });

  test('no two staff can have same uid', () => {
    expect(staff0.uid).not.toBe(staff1.uid);
  });
});
