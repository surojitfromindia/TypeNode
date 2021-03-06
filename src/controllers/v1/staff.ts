import { asyncWrapper } from '../../middlewares/asyncWrapper';
import { NextFunction, Request, Response } from 'express';
import { ErrorResponse } from '../../middlewares/errorHandler';
import { StaffModel } from '../../models/Staffs';
import { successResponse } from '../../class/Response';
import { IStaff } from '../../Interface/IStaff';

const getAllStaff = asyncWrapper(async (_req: Request, res: Response, next) => {
  try {
    throw new ErrorResponse(404, ['shops not found']);
  } catch (err) {
    next(err);
  }
});

const createStaff = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const saveRes = await createStaffController(req.body);
    res.locals.status = 200;
    res.responseBody = successResponse(saveRes, 'staff created successfully', ['_id', '__v']);
    next();
  } catch (err) {
    throw new ErrorResponse(404, ['staff can not be created']);
  }
});

const createStaffController = async (body: object, exclude?: [keyof IStaff]) => {
  try {
    const staff = new StaffModel(body);
    const saveRes = await staff.save({ validateBeforeSave: true });
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

export { getAllStaff, createStaff, createStaffController };
