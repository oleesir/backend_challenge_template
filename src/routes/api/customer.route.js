import { Router } from 'express';
import CustomerController from '../../controllers/customer.controller';
import Schemas from '../../validations/customers.validation';
import Authorization from '../../middleware/Authorization.middleware';
import Validator from '../../middleware/validator.middleware';

// These are valid routes but they may contain a bug, please try to define and fix them

const {
  createCustomerSchema,
  loginCustomerSchema,
  getCustomerSchema,
  updateCustomerProfileSchema,
  updateCustomerAddressSchema,
} = Schemas;
const {
  create,
  login,
  getCustomerProfile,
  updateCustomerProfile,
  updateCustomerAddress,
} = CustomerController;
const { validationCheck } = Validator;
const { verifyToken } = Authorization;

const router = Router();
router.post('/customers', createCustomerSchema, validationCheck, create);
router.post('/customers/login', loginCustomerSchema, validationCheck, login);
router.get(
  '/customers/:customer_id',
  verifyToken,
  getCustomerSchema,
  validationCheck,
  getCustomerProfile
);
router.put(
  '/customers/:customer_id',
  verifyToken,
  updateCustomerProfileSchema,
  validationCheck,
  updateCustomerProfile
);
router.put(
  '/customers/address/:customer_id',
  verifyToken,
  updateCustomerAddressSchema,
  validationCheck,
  updateCustomerAddress
);
router.put('/customer/creditCard', CustomerController.updateCreditCard);

export default router;
