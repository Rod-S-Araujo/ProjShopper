import RidesController from "../controllers/RidesController";
import { Request, Response } from "express";

const { Router } = require("express");

const ridesController = new RidesController();

const router = Router();

router.post("/ride/estimate", ridesController.estimate.bind(ridesController));
router.patch("/ride/confirm", ridesController.confirm.bind(ridesController));
router.get(
  "/ride/:customer_id",
  ridesController.getByCustomer.bind(ridesController)
);

module.exports = router;
