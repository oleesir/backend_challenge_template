/* eslint-disable camelcase */
/**
 * Customer controller handles all requests that has to do with customer
 * Some methods needs to be implemented from scratch while others may contain one or two bugs
 *
 * - create - allow customers to create a new account
 * - login - allow customers to login to their account
 * - getCustomerProfile - allow customers to view their profile info
 * - updateCustomerProfile - allow customers to update their profile info like name, email, password, day_phone, eve_phone and mob_phone
 * - updateCustomerAddress - allow customers to update their address info
 * - updateCreditCard - allow customers to update their credit card number
 *
 *  NB: Check the BACKEND CHALLENGE TEMPLATE DOCUMENTATION in the readme of this repository to see our recommended
 *  endpoints, request body/param, and response object for each of these method
 */

import { Customer, Sequelize } from '../database/models';
import Authorization from '../middleware/Authorization.middleware';

const { hashPassword, generateToken, comparePassword } = Authorization;

const { Op } = Sequelize;

/**
 *
 *
 * @class CustomerController
 */
class CustomerController {
  /**
   * create a customer record
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status, customer data and access token
   * @memberof CustomerController
   */
  static async create(req, res, next) {
    // Implement the function to create the customer account
    try {
      const { email, password } = req.body;

      const foundCustomer = await Customer.findOne({
        where: {
          email,
        },
      });

      if (foundCustomer) {
        return res.status(409).json({ status: 409, error: 'Customer already exists' });
      }

      const hash = hashPassword(password);
      const newCustomer = await Customer.create({ ...req.body, password: hash });

      const payload = {
        email,
      };

      const token = generateToken(payload);
      const data = { token, ...newCustomer.get() };

      newCustomer.password = undefined;

      return res.status(201).json({ data, message: 'this works' });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * log in a customer
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status, and access token
   * @memberof CustomerController
   */
  static async login(req, res, next) {
    // implement function to login to user account
    try {
      const { email, password } = req.body;

      const foundCustomer = await Customer.findOne({ where: { email } });

      if (!foundCustomer) {
        return res.status(401).json({ status: 401, error: 'Email or password is incorrect' });
      }

      if (foundCustomer) {
        const foundPassword = comparePassword(password, foundCustomer.password);

        if (!foundPassword) {
          return res.status(401).json({ status: 401, error: 'Email or password is incorrect' });
        }

        const payload = {
          email: foundCustomer.email,
          customer_id: foundCustomer.customer_id,
        };

        foundCustomer.password = undefined;

        const token = generateToken(payload);
        const data = { token, ...foundCustomer.get() };

        return res.status(200).json({ data, message: 'this works' });
      }
    } catch (error) {
      return next(error);
    }
  }

  /**
   * get customer profile data
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status customer profile data
   * @memberof CustomerController
   */
  static async getCustomerProfile(req, res, next) {
    // fix the bugs in this code
    // eslint-disable-next-line camelcase
    const { customer_id } = req.params;
    // const { customer_id } = req.decoded;

    let customer;
    try {
      if (parseInt(customer_id, 10) === req.decoded.customer_id) {
        customer = await Customer.findByPk(customer_id);
      } else if (parseInt(customer_id, 10) !== req.decoded.customer_id) {
        return res
          .status(403)
          .json({ status: 403, error: 'You not authorized to perform this action' });
      }

      const {
        name,
        email,
        credit_card,
        address_1,
        address_2,
        city,
        region,
        postal_code,
        country,
        shipping_region_id,
        day_phone,
        eve_phone,
        mob_phone,
      } = customer;

      const data = {
        customer_id,
        name,
        email,
        credit_card,
        address_1,
        address_2,
        city,
        region,
        postal_code,
        country,
        shipping_region_id,
        day_phone,
        eve_phone,
        mob_phone,
      };

      return res.status(200).json({ data, message: 'this works' });
    } catch (error) {
      console.log('hey', err);
      return next(error);
    }
  }

  /**
   * update customer profile data such as name, email, password, day_phone, eve_phone and mob_phone
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status customer profile data
   * @memberof CustomerController
   */
  static async updateCustomerProfile(req, res, next) {
    const { customer_id } = req.params;
    const { email, name, day_phone, eve_phone, mob_phone } = req.body;

    let foundCustomer;

    try {
      if (parseInt(customer_id, 10) === req.decoded.customer_id) {
        foundCustomer = await Customer.findByPk(customer_id);
      } else if (parseInt(customer_id, 10) !== req.decoded.customer_id) {
        return res
          .status(403)
          .json({ status: 403, error: 'You not authorized to perform this action' });
      }

      const anotherUserWithEmail = await Customer.findOne({
        where: {
          email,
          [Op.not]: req.decoded.customer_id,
        },
      });

      if (anotherUserWithEmail) {
        return res.status(409).json({ status: 409, error: 'Email already exists' });
      }

      const updatedCustomer = await foundCustomer.update(
        {
          email: email || foundCustomer.email,
          name: name || foundCustomer.name,
          day_phone: day_phone || foundCustomer.day_phone,
          eve_phone: eve_phone || foundCustomer.eve_phone,
          mob_phone: mob_phone || foundCustomer.mob_phone,
        },
        {
          where: { customer_id: foundCustomer.customer_id },
          returning: true,
        }
      );

      updatedCustomer.password = undefined;

      return res
        .status(200)
        .json({ updatedCustomer, message: 'Customer has been updated successfully' });

      // Implement function to update customer profile like name, day_phone, eve_phone and mob_phone
    } catch (error) {
      return next(error);
    }
  }

  /**
   * update customer profile data such as address_1, address_2, city, region, postal_code, country and shipping_region_id
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status customer profile data
   * @memberof CustomerController
   */
  static async updateCustomerAddress(req, res, next) {
    // write code to update customer address info such as address_1, address_2, city, region, postal_code, country
    // and shipping_region_id
    const { customer_id } = req.params;
    const { address_1, address_2, city, region, postal_code, shipping_region_id } = req.body;

    let foundCustomer;

    try {
      if (parseInt(customer_id, 10) === req.decoded.customer_id) {
        foundCustomer = await Customer.findByPk(customer_id);
      } else if (parseInt(customer_id, 10) !== req.decoded.customer_id) {
        return res
          .status(403)
          .json({ status: 403, error: 'You not authorized to perform this action' });
      }
      const anotherUserWithShippingId = await Customer.findOne({
        where: {
          shipping_region_id,
          [Op.not]: req.decoded.customer_id,
        },
      });

      if (anotherUserWithShippingId) {
        return res.status(409).json({ status: 409, error: 'Shipping Id already exists' });
      }

      const updatedCustomer = await foundCustomer.update(
        {
          address_1: address_1 || foundCustomer.address_1,
          address_2: address_2 || foundCustomer.address_2,
          city: city || foundCustomer.city,
          region: region || foundCustomer.region,
          postal_code: postal_code || foundCustomer.postal_code,
          shipping_region_id:
            parseInt(shipping_region_id, 10) || parseInt(foundCustomer.shipping_region_id, 10),
        },
        {
          where: { customer_id: foundCustomer.customer_id },
          returning: true,
        }
      );
      updatedCustomer.password = undefined;

      return res.status(200).json({ updatedCustomer, message: 'this works' });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * update customer credit card
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status customer profile data
   * @memberof CustomerController
   */
  static async updateCreditCard(req, res, next) {
    // write code to update customer credit card number
    return res.status(200).json({ message: 'this works' });
  }
}

export default CustomerController;
