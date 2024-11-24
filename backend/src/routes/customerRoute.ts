import CustomerController from "../controllers/CustomerController";

const { Router } = require("express");
const customerController = new CustomerController();

const router = Router();

router.get("/customer", customerController.getAll.bind(customerController));
router.post("/login", customerController.login.bind(customerController));
router.post("/customer", customerController.create.bind(customerController));

module.exports = router;
