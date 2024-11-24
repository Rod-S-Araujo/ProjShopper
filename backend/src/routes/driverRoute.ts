import DriversController from "../controllers/DriversController";

const { Router } = require("express");

const driversController = new DriversController();

const router = Router();

router.get("/drivers", driversController.getAll.bind(driversController));
router.get("/drivers/:id", driversController.get.bind(driversController));
router.post("/drivers", driversController.create.bind(driversController));

module.exports = router;
