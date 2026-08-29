import type { Request, Response } from "express";

import {
  getAllProducts,
  getProductById,
  insertProduct,
  updateProduct as updateProductModel,
} from "../models/product.model.js";

export const getMenu = async (req: Request, res: Response) => {
  try {
    /*#swagger.tags = ['Products']
      #swagger.summary = 'Obtener todos los productos' */

    const maxPrice = req.query.maxPrice
      ? Number(req.query.maxPrice)
      : undefined;

    const page = req.query.page ? Number(req.query.page) : undefined;

    const limit = req.query.limit ? Number(req.query.limit) : undefined;

    const products = await getAllProducts(maxPrice, page, limit);

    res.json(products);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error al obtener el menú",
    });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    /*#swagger.tags = ['Products']
      #swagger.summary = 'Obtener un producto por ID' */

    const id = Number(req.params.id);

    const product = await getProductById(id);

    if (product === null) {
      res.status(404).json({
        error: "Producto no encontrado",
      });
      return;
    }

    res.json(product);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error al obtener el producto",
    });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    /*#swagger.tags = ['Products']
      #swagger.summary = 'Crear un nuevo producto' */

    const { name, description, price } = req.body;

    const product = await insertProduct(name, description, price);

    res.status(201).json(product);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error al crear el producto",
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    /*#swagger.tags = ['Products']
      #swagger.summary = 'Actualizar un producto' */

    const id = Number(req.params.id);

    const { name, description, price } = req.body;

    const product = await updateProductModel(id, name, description, price);

    if (product === null) {
      res.status(404).json({
        error: "Producto no encontrado",
      });
      return;
    }

    res.json(product);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error al actualizar el producto",
    });
  }
};
