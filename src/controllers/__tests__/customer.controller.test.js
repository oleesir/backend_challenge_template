// eslint-disable-next-line import/no-extraneous-dependencies
import '@babel/polyfill';
import request from 'supertest';
import app, { server } from '../..';

describe('Customer', () => {
  describe('createCustomer', () => {
    afterAll(async done => {
      server.close();
      done();
    });
    it('should create a customer', done => {
      const newCustomer = {
        name: 'tree',
        email: 'tree@gmail.com',
        password: 'qwertyuiop',
      };
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
      const emptyCustomerFields = {
        name: '',
        email: '',
        password: '',
      };
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
      const existingCustomer = {
        name: 'tree',
        email: 'tree@gmail.com',
        password: 'qwertyuiop',
      };
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
      const wrongNameInputField = {
        name: 'tre948',
        email: 'jupiter@gmail.com',
        password: 'qwertyuiop',
      };
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
      const wrongEmailInputField = {
        name: 'tanko',
        email: 'jupitergmail.com',
        password: 'qwertyuiop',
      };
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
      const newCustomer = {
        email: 'tree@gmail.com',
        password: 'qwertyuiop',
      };
      request(app)
        .post('/customers/login')
        .send(newCustomer)
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
      const emptyCustomerField = {
        email: '',
        password: '',
      };
      request(app)
        .post('/customers/login')
        .send(emptyCustomerField)
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
      const wrongEmailField = {
        email: 'treegmail.com',
        password: 'qwertyuiop',
      };
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

    it('should not login a customer that does not exist', done => {
      const wrongEmailField = {
        email: 'jeff@gmail.com',
        password: 'qwertyuiop',
      };
      request(app)
        .post('/customers/login')
        .send(wrongEmailField)
        .set('Content-Type', 'application/json')
        .end((error, res) => {
          expect(res.status).toEqual(401);
          expect(res.body.error).toEqual('Email or password is incorrect');
          done();
        });
    });
  });
});
