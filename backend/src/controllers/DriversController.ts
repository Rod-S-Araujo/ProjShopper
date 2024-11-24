import { NextFunction, Request, Response } from "express";

const DriverService = require("../services/drivers.service");

class DriversController {
  private service = new DriverService();

  async get(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const { status, message } = await this.service.get(Number(id));
      res.status(status).json(message);
    } catch (error) {
      next(error);
    }
  }
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.getAll();
      res.status(status).json(message);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.create(req.body);
      res.status(status).json(message);
    } catch (error) {
      next(error);
    }
  }
}

export default DriversController;
