import { check } from 'express-validator/check';
import isValidPhoneNumber from '../helpers/validatePhoneNumber';

export default {
  createCustomerSchema: [
    check('name')
      .trim()
      .exists()
      .withMessage('name is required')
      .isLength({ min: 2, max: 15 })
      .withMessage('name should be between 2 to 15 characters')
      .isAlpha()
      .withMessage('name should only contain alphabets')
      .customSanitizer(name => name.toLowerCase()),
    check('email')
      .trim()
      .exists()
      .withMessage('Email address is required')
      .isEmail()
      .withMessage('Enter a valid email address')
      .customSanitizer(email => email.toLowerCase()),
    check('password')
      .trim()
      .exists()
      .withMessage('Password is required')
      .isLength({ min: 8, max: 15 })
      .withMessage('Password should be between 8 to 15 characters'),
  ],
  loginCustomerSchema: [
    check('email')
      .trim()
      .exists()
      .withMessage('Email address is required')
      .isEmail()
      .withMessage('Enter a valid email address')
      .customSanitizer(email => email.toLowerCase()),
    check('password')
      .trim()
      .exists()
      .withMessage('Password is required')
      .isLength({ min: 8, max: 15 })
      .withMessage('Password should be between 8 to 15 characters'),
  ],
  getCustomerSchema: [
    check('customer_id')
      .isInt()
      .withMessage('Enter a valid id')
      .custom(value => {
        if (value < 1) {
          throw new Error('Id should not be less than 1');
        }
        return true;
      }),
  ],
  updateCustomerProfileSchema: [
    check('customer_id')
      .isInt()
      .withMessage('Enter a valid id')
      .custom(value => {
        if (value < 1) {
          throw new Error('Id should not be less than 1');
        }
        return true;
      }),
    check('name')
      .trim()
      .exists()
      .withMessage('Name is required')
      .isLength({ min: 2, max: 15 })
      .withMessage('name should be between 2 to 15 characters')
      .isAlpha()
      .withMessage('name should only contain alphabets')
      .customSanitizer(name => name.toLowerCase()),
    check('email')
      .trim()
      .exists()
      .withMessage('Email address is required')
      .isEmail()
      .withMessage('Enter a valid email address')
      .customSanitizer(email => email.toLowerCase()),
    check('day_phone')
      .optional({ checkFalsy: true })
      .isInt()
      .withMessage('Phone numbers should contain only numbers')
      .custom(number => {
        if (!isValidPhoneNumber(number)) {
          throw new Error('Enter a valid phone number');
        }
        return true;
      }),
    check('eve_phone')
      .optional({ checkFalsy: true })
      .isInt()
      .withMessage('Phone numbers should contain only numbers')
      .custom(number => {
        if (!isValidPhoneNumber(number)) {
          throw new Error('Enter a valid phone number');
        }
        return true;
      }),
    check('mob_phone')
      .exists()
      .withMessage('mobile_phone is required')
      .isInt()
      .withMessage('Phone numbers should contain only numbers')
      .custom(number => {
        if (!isValidPhoneNumber(number)) {
          throw new Error('Enter a valid phone number');
        }
        return true;
      }),
  ],
};
