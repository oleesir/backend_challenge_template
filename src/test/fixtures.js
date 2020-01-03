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
  id: 1,
  email: 'tree@gmail.com',
};

const userToken = jwt.sign(userPayload, process.env.JWT_KEY, { expiresIn: '1day' });
const customerId = 1;
const unexistingId = 90;
const invalidId = 'jwijrne';
const idLessThanOne = 0;

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
};
