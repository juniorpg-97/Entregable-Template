import { Router } from "express";

import {
  getSales,
  getSale,
  createSale,
} from "../controllers/sale.controller.js";

const salesRouter: Router = Router();

salesRouter.get("/", getSales);
salesRouter.get("/:id", getSale);
salesRouter.post("/", createSale);

export default salesRouter;
