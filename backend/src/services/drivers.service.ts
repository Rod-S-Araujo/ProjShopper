import { ModelStatic } from "sequelize";
import DriverModel from "../models/DriverModel";
import IDriver from "../interfaces/IDriver";
const resp = require("../utils/resp");

class DriverService {
  private model: ModelStatic<DriverModel> = DriverModel;

  async get(id: number) {
    const drivers = await this.model.findByPk(id);
    return resp(200, drivers);
  }

  async getAll() {
    const drivers = await this.model.findAll();
    return resp(200, drivers);
  }

  async create(driver: IDriver) {
    const createDriver = await this.model.create({ ...driver });

    return resp(201, createDriver);
  }
}
module.exports = DriverService;
