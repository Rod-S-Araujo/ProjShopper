import { ModelStatic } from "sequelize";
import CustomerModel from "../models/CustomerModel";
const resp = require("../utils/resp");

import { sign } from "../jwt/jwt";
import ICustomer from "../interfaces/ICustomer";

class CustomerService {
  private model: ModelStatic<CustomerModel> = CustomerModel;

  async get() {
    const customers = await this.model.findAll();
    return resp(200, customers);
  }

  async login(body: { email: string }) {
    const customer = await this.model.findOne({
      where: {
        email: body.email,
      },
    });

    if (!customer) return resp(404, "User not found");

    const { id, email } = customer;
    const token = sign({ id, email });
    return resp(200, token);
  }

  async create(customer: ICustomer) {
    const existingCustomer = await this.model.findOne({
      where: { email: customer.email },
    });

    if (existingCustomer) {
      return resp(409, "Email registred");
    }

    const createCustomer = await this.model.create({ ...customer });

    return resp(201, createCustomer);
  }
}

module.exports = CustomerService;
