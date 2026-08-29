import type { Request, Response } from "express";

import { getAllSales, getSaleById, insertSale } from "../models/sale.model.js";

export const getSales = async (req: Request, res: Response) => {
  try {
    /*#swagger.tags = ['Sales']
      #swagger.summary = 'Obtener todas las ventas' */

    const sales = await getAllSales();

    res.json(sales);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error al obtener las ventas",
    });
  }
};

export const getSale = async (req: Request, res: Response) => {
  try {
    /*#swagger.tags = ['Sales']
      #swagger.summary = 'Obtener una venta por ID' */

    const id = Number(req.params.id);

    const sale = await getSaleById(id);

    if (sale === null) {
      res.status(404).json({
        error: "Venta no encontrada",
      });
      return;
    }

    res.json(sale);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error al obtener la venta",
    });
  }
};

export const createSale = async (req: Request, res: Response) => {
  try {
    /*#swagger.tags = ['Sales']
      #swagger.summary = 'Crear una nueva venta' */

    const { customer_id, product_id } = req.body;

    const sale = await insertSale(customer_id, product_id);

    res.status(201).json(sale);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error al crear la venta",
    });
  }
};
