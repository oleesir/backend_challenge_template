// eslint-disable-next-line import/no-extraneous-dependencies
import '@babel/polyfill';
import request from 'supertest';
import app, { server } from '../..';
import {
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
  updateCustomerWrongAddress,
} from '../../test/fixtures';

describe('Customer', () => {
  describe('createCustomer', () => {
    afterAll(async done => {
      server.close();
      done();
    });
    it('should create a customer', done => {
      request(app)
        .post('/customers')
        .send(newCustomer)
        .set('Content-Type', 'application/json')
        .end((error, res) => {
          expect(res.status).toEqual(201);
          expect(res.body.data).toHaveProperty('name');
          expect(res.body.data).toHaveProperty('email');
          expect(res.body.data).toHaveProperty('customer_id');
          expect(res.body.data).toHaveProperty('shipping_region_id');
          done();
        });
    });
    it('should not create a customer with empty fields', done => {
      request(app)
        .post('/customers')
        .send(emptyCustomerFields)
        .set('Content-Type', 'application/json')
        .end((error, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.error).toHaveProperty('name');
          expect(res.body.error.name).toEqual('name should be between 2 to 15 characters');
          expect(res.body.error).toHaveProperty('email');
          expect(res.body.error.email).toEqual('Enter a valid email address');
          expect(res.body.error).toHaveProperty('password');
          expect(res.body.error.password).toEqual('Password should be between 8 to 15 characters');
          done();
        });
    });

    it('should not create a customer that already exists', done => {
      request(app)
        .post('/customers')
        .send(existingCustomer)
        .set('Content-Type', 'application/json')
        .end((error, res) => {
          expect(res.status).toEqual(409);
          expect(res.body.error).toEqual('Customer already exists');
          done();
        });
    });

    it('should not create a customer with an invalid name field', done => {
      request(app)
        .post('/customers')
        .send(wrongNameInputField)
        .set('Content-Type', 'application/json')
        .end((error, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.error.name).toEqual('name should only contain alphabets');
          done();
        });
    });

    it('should not create a customer with an invalid email field', done => {
      request(app)
        .post('/customers')
        .send(wrongEmailInputField)
        .set('Content-Type', 'application/json')
        .end((error, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.error.email).toEqual('Enter a valid email address');
          done();
        });
    });
  });
  describe('Login Customer', () => {
    afterAll(async done => {
      server.close();
      done();
    });

    it('should login a customer', done => {
      request(app)
        .post('/customers/login')
        .send(loginCustomer)
        .set('Content-Type', 'application/json')
        .end((error, res) => {
          expect(res.status).toEqual(200);
          expect(res.body.data).toHaveProperty('name');
          expect(res.body.data).toHaveProperty('email');
          expect(res.body.data).toHaveProperty('customer_id');
          expect(res.body.data).toHaveProperty('shipping_region_id');
          done();
        });
    });

    it('should not login a customer with empty fields', done => {
      request(app)
        .post('/customers/login')
        .send(emptyLoginCustomerField)
        .set('Content-Type', 'application/json')
        .end((error, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.error).toHaveProperty('email');
          expect(res.body.error.email).toEqual('Enter a valid email address');
          expect(res.body.error).toHaveProperty('password');
          expect(res.body.error.password).toEqual('Password should be between 8 to 15 characters');
          done();
        });
    });

    it('should not login a customer with empty fields', done => {
      request(app)
        .post('/customers/login')
        .send(wrongEmailField)
        .set('Content-Type', 'application/json')
        .end((error, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.error).toHaveProperty('email');
          expect(res.body.error.email).toEqual('Enter a valid email address');
          done();
        });
    });
  });
  describe('GET Customer', () => {
    afterAll(async done => {
      server.close();
      done();
    });

    it('should get profile owned by an authorized user', done => {
      request(app)
        .get(`/customers/${customerId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .end((error, res) => {
          expect(res.status).toEqual(200);
          expect(res.body.data).toHaveProperty('name');
          expect(res.body.data).toHaveProperty('email');
          expect(res.body.data).toHaveProperty('customer_id');
          expect(res.body.data).toHaveProperty('shipping_region_id');
          done();
        });
    });

    it('should not get a profile for an unauthorized user', done => {
      request(app)
        .get(`/customers/${unexistingId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .end((error, res) => {
          expect(res.status).toEqual(403);
          expect(res.body.error).toEqual('You not authorized to perform this action');
          done();
        });
    });

    it('should not get a profile for an invalid Id', done => {
      request(app)
        .get(`/customers/${invalidId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .end((error, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.error.customer_id).toEqual('Enter a valid id');
          done();
        });
    });

    it('should not get a profile for an Id less than 1', done => {
      request(app)
        .get(`/customers/${idLessThanOne}`)
        .set('Authorization', `Bearer ${userToken}`)
        .end((error, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.error.customer_id).toEqual('Id should not be less than 1');
          done();
        });
    });
  });
  describe('PUT Customer', () => {
    afterAll(async done => {
      server.close();
      done();
    });

    it('should update profile owned by an authorized user', done => {
      request(app)
        .put(`/customers/${customerId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send(updateCustomer)
        .end((error, res) => {
          expect(res.status).toEqual(200);
          expect(res.body.updatedCustomer).toHaveProperty('name');
          expect(res.body.updatedCustomer).toHaveProperty('email');
          expect(res.body.updatedCustomer).toHaveProperty('customer_id');
          expect(res.body.updatedCustomer).toHaveProperty('day_phone');
          expect(res.body.updatedCustomer).toHaveProperty('eve_phone');
          expect(res.body.updatedCustomer).toHaveProperty('mob_phone');
          done();
        });
    });

    it('should update profile owned by an unauthorized user', done => {
      request(app)
        .put(`/customers/${unexistingId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send(updateCustomer)
        .end((error, res) => {
          expect(res.status).toEqual(403);
          expect(res.body.error).toEqual('You not authorized to perform this action');
          done();
        });
    });

    it('should not update profile with invalid email', done => {
      request(app)
        .put(`/customers/${unexistingId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send(updateCustomerInvalidEmail)
        .end((error, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.error.email).toEqual('Enter a valid email address');
          done();
        });
    });

    it('should update profile with invalid phone number', done => {
      request(app)
        .put(`/customers/${unexistingId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send(updateCustomerInvalidPhoneNumber)
        .end((error, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.error.day_phone).toEqual('Phone numbers should contain only numbers');
          expect(res.body.error.eve_phone).toEqual('Phone numbers should contain only numbers');
          expect(res.body.error.mob_phone).toEqual('Phone numbers should contain only numbers');
          done();
        });
    });

    it('should update profile with invalid phone number', done => {
      request(app)
        .put(`/customers/${unexistingId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send(updateCustomerWrongPhoneNumber)
        .end((error, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.error.day_phone).toEqual('Enter a valid phone number');
          expect(res.body.error.eve_phone).toEqual('Enter a valid phone number');
          expect(res.body.error.mob_phone).toEqual('Enter a valid phone number');
          done();
        });
    });

    it('should update profile with invalid phone number', done => {
      request(app)
        .put(`/customers/${unexistingId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send(updateCustomerWrongPhoneNumber)
        .end((error, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.error.day_phone).toEqual('Enter a valid phone number');
          expect(res.body.error.eve_phone).toEqual('Enter a valid phone number');
          expect(res.body.error.mob_phone).toEqual('Enter a valid phone number');
          done();
        });
    });

    it('should update profile with invalid phone number', done => {
      request(app)
        .put(`/customers/${unexistingId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send(updateCustomerWrongMobNumber)
        .end((error, res) => {
          expect(res.status).toEqual(400);
          expect(res.body.error.mob_phone).toEqual('mobile_phone is required');
          done();
        });
    });

    it('should update profile owned by an authorized user ', done => {
      request(app)
        .put(`/customers/address/${customerId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send(updateCustomer)
        .end((error, res) => {
          expect(res.status).toEqual(200);
          expect(res.body.updatedCustomer).toHaveProperty('address_1');
          expect(res.body.updatedCustomer).toHaveProperty('address_2');
          expect(res.body.updatedCustomer).toHaveProperty('city');
          expect(res.body.updatedCustomer).toHaveProperty('region');
          expect(res.body.updatedCustomer).toHaveProperty('postal_code');
          expect(res.body.updatedCustomer).toHaveProperty('shipping_region_id');
          done();
        });
    });

    it('should not update profile owned by an unauthorized user', done => {
      request(app)
        .put(`/customers/address/${unexistingId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send(updateCustomer)
        .end((error, res) => {
          expect(res.status).toEqual(403);
          expect(res.body.error).toEqual('You not authorized to perform this action');
          done();
        });
    });

    it('should not update a profile with wrong address input ', done => {
      request(app)
        .put(`/customers/address/${customerId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send(updateCustomerWrongAddress)
        .end((error, res) => {
          console.log(res.body);
          expect(res.status).toEqual(400);
          expect(res.body.error.address_1).toEqual(
            'Address should not contain these characters @#$%^&*_+'
          );
          expect(res.body.error.address_2).toEqual(
            'Address should not contain these characters @#$%^&*_+'
          );
          done();
        });
    });
  });
});
