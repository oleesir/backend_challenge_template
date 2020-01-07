/* eslint-disable import/prefer-default-export */
import jwt from 'jsonwebtoken';

const newCustomer = {
  name: 'tree',
  email: 'tree@gmail.com',
  password: 'qwertyuiop',
};

const emptyCustomerFields = {
  name: '',
  email: '',
  password: '',
};

const existingCustomer = {
  name: 'tree',
  email: 'tree@gmail.com',
  password: 'qwertyuiop',
};

const wrongEmailInputField = {
  name: 'tanko',
  email: 'jupitergmail.com',
  password: 'qwertyuiop',
};

const loginCustomer = {
  email: 'tree@gmail.com',
  password: 'qwertyuiop',
};

const emptyLoginCustomerField = {
  email: '',
  password: '',
};

const wrongNameInputField = {
  name: 'tre948',
  email: 'jupiter@gmail.com',
  password: 'qwertyuiop',
};

const wrongEmailField = {
  email: 'treegmail.com',
  password: 'qwertyuiop',
};

const userPayload = {
  customer_id: 1,
  email: 'tree@gmail.com',
};

const userToken = jwt.sign(userPayload, process.env.JWT_KEY, { expiresIn: '1day' });
const customerId = 1;
const unexistingId = 90;
const invalidId = 'jwijrne';
const idLessThanOne = 0;

const updateCustomer = {
  name: 'jeff',
  email: 'jeff@gmail.com',
  day_phone: '+2341234534267',
  eve_phone: '+2341234534267',
  mob_phone: '+2341234534267',
};

const updateCustomerInvalidEmail = {
  name: 'jeff',
  email: 'jeffgmail.com',
  day_phone: '+2341234534267',
  eve_phone: '+2341234534267',
  mob_phone: '+2341234534267',
};

const updateCustomerInvalidPhoneNumber = {
  name: 'jeff',
  email: 'jeff@gmail.com',
  day_phone: '+234123453426d',
  eve_phone: '+234123453426d',
  mob_phone: '+234123453426d',
};

const updateCustomerWrongPhoneNumber = {
  name: 'jeff',
  email: 'jeff@gmail.com',
  day_phone: '+234123453426347685',
  eve_phone: '+2341234534263455',
  mob_phone: '+234123453426445323',
};

const updateCustomerWrongMobNumber = {
  name: 'jeff',
  email: 'jeff@gmail.com',
};

export {
  newCustomer,
  emptyCustomerFields,
  existingCustomer,
  wrongEmailInputField,
  loginCustomer,
  emptyLoginCustomerField,
  wrongNameInputField,
  wrongEmailField,
  userToken,
  customerId,
  unexistingId,
  invalidId,
  idLessThanOne,
  updateCustomer,
  updateCustomerInvalidEmail,
  updateCustomerInvalidPhoneNumber,
  updateCustomerWrongPhoneNumber,
  updateCustomerWrongMobNumber,
};
