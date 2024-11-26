import axios from "axios";
import { NextFunction, Request, Response } from "express";

const RidesServices = require("../services/rides.service");
const database = require("../models");

class RidesController {
  private service = new RidesServices();

  async estimate(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.estimate(req.body);

      res.status(status).json(message);
    } catch (error) {
      next(error);

      res.status(400).json();
    }
  }
  async confirm(req: Request, res: Response, next: NextFunction) {
    try {
      const { status } = await this.service.confirm(req.body);

      const message = { sucess: true };
      res.status(status).json(message);
    } catch (error) {
      next(error);
    }
  }
  async getByCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const customerId = req.params.customer_id;
      const driverId = req.query.driver_id || 0;

      const { status, message } = await this.service.getByCustomer(
        customerId,
        driverId
      );

      res.status(status).json(message);
    } catch (error) {
      next(error);
    }
  }
}

export default RidesController;
