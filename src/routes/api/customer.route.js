import { Router } from 'express';
import CustomerController from '../../controllers/customer.controller';
import Schemas from '../../validations/customers.validation';
// import Authorization from '../../middleware/Authorization.middleware';
import Validator from '../../middleware/validator.middleware';

// These are valid routes but they may contain a bug, please try to define and fix them

const { createCustomerSchema, loginCustomerSchema } = Schemas;
const { create, login } = CustomerController;
const { validationCheck } = Validator;

const router = Router();
router.post('/customers', createCustomerSchema, validationCheck, create);
router.post('/customers/login', loginCustomerSchema, validationCheck, login);
router.get('/customer', CustomerController.getCustomerProfile);
router.put('/customer', CustomerController.apply);
router.put('/customer/address', CustomerController.updateCustomerAddress);
router.put('/customer/creditCard', CustomerController.updateCreditCard);

export default router;
