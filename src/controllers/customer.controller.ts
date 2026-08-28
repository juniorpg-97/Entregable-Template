import type { Request, Response } from "express";

import {
  getAllCustomers,
  getCustomerById,
  insertCustomer,
  updateCustomer,
} from "../models/customer.model.js";

export const getCustomers = async (req: Request, res: Response) => {
  try {
    /*#swagger.tags = ['Customers']
      #swagger.summary = 'Obtener todos los clientes' */

    const customers = await getAllCustomers();

    res.json(customers);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error al obtener los clientes",
    });
  }
};

export const getCustomer = async (req: Request, res: Response) => {
  try {
    /*#swagger.tags = ['Customers']
      #swagger.summary = 'Obtener un cliente por ID' */

    const id = Number(req.params.id);

    const customer = await getCustomerById(id);

    if (customer === null) {
      res.status(404).json({
        error: "Cliente no encontrado",
      });
      return;
    }

    res.json(customer);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error al obtener el cliente",
    });
  }
};

export const createCustomer = async (req: Request, res: Response) => {
  try {
    /*#swagger.tags = ['Customers']
      #swagger.summary = 'Crear un nuevo cliente' */

    const { name, email, phone_number } = req.body;

    const customer = await insertCustomer(name, email, phone_number);

    res.status(201).json(customer);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error al crear el cliente",
    });
  }
};

export const updateCustomerController = async (req: Request, res: Response) => {
  try {
    /*#swagger.tags = ['Customers']
      #swagger.summary = 'Actualizar un cliente' */

    const id = Number(req.params.id);

    const { name, email, phone_number } = req.body;

    const customer = await updateCustomer(id, name, email, phone_number);

    if (customer === null) {
      res.status(404).json({
        error: "Cliente no encontrado",
      });
      return;
    }

    res.json(customer);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error al actualizar el cliente",
    });
  }
};
