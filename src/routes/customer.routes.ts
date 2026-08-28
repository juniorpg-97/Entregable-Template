import { Router } from "express";

import {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomerController,
} from "../controllers/customer.controller.js";

import { validateCustomer } from "../middlewares/validate.customer.js";

const router: Router = Router();

router.get("/", getCustomers);

router.get("/:id", getCustomer);

router.post("/", validateCustomer, createCustomer);

router.put("/:id", validateCustomer, updateCustomerController);

export default router;
