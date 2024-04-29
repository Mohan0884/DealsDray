import { body, validationResult } from 'express-validator';
import { BadRequestError, UnauthenticatedError } from '../errors/customErrors.js';
import mongoose from 'mongoose';
import User from '../models/userModel.js'
import { param } from 'express-validator';

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith('no job')) {
          throw new NotFoundError(errorMessages);
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

import { DESIGNATION, COURSE,GENDER } from '../utils/constants.js';
import Employee from '../models/employeeModel.js';
import { verifyJWT } from '../utils/tokenUtils.js';

export const validateEmployeeInput = withValidationErrors([
  body('name').notEmpty().withMessage('Name is required'),
  body('email').notEmpty().withMessage('Email is required').custom(async (email) => {
    const user = await User.findOne({ email });
    if (user) {
      throw new BadRequestError('email already exists');
    }
  }),
  body('mobile').notEmpty().withMessage('Mobile Number is required'),
  body('designation')
    .isIn(Object.values(DESIGNATION))
    .withMessage('invalid designation value'),
  body('course').isIn(Object.values(COURSE)).withMessage('invalid course type'),
  body('gender').isIn(Object.values(GENDER)).withMessage('invalid gender type'),
  body('image').notEmpty().withMessage('image is required'),
]);

export const validateIdParam = withValidationErrors([
  param('id').custom(async (value) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new BadRequestError('invalid MongoDB id');
    const employee = await Employee.findById(value);
    if (!employee) throw new NotFoundError(`no employee with id : ${value}`);
  }),
]);


export const validateRegisterInput = withValidationErrors([
  body('name')
    .notEmpty()
    .withMessage('name is required'),
  body('email').notEmpty().withMessage('email is required').custom(async (email) => {
    const user = await User.findOne({ email });
    if (user) {
      throw new BadRequestError('email already exists');
    }
  }),
  body('password')
    .notEmpty()
    .withMessage('password is required'),
  body('name').notEmpty().withMessage('name is required')
]);

export const validateLoginInput=withValidationErrors([
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format')
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new BadRequestError('email not exists exists');
      }
    }),
  body('password')
    .notEmpty()
    .withMessage('password is required')
]);
// export const authenticateUser=async(req,res,next)=>{
//   const { token } = req.cookies;
//   if (!token) {
//     throw new UnauthenticatedError('authentication invalid');
//   }
//   try {
//     const { userId, name } = verifyJWT(token);
//     req.user = { userId, name };
//     next();
//   } catch (error) {
//     throw new UnauthenticatedError('authentication invalid');
//   }
// }

