import { z } from "zod";
import type { Request, Response, NextFunction } from "express";

const productSchema = z.object({
  name: z
    .string({ message: "El nombre es obligatorio" })
    .min(3, "El nombre no puede estar vacio")
    .trim()
    .min(1),
  description: z
    .string({ message: "El nombre es obligatorio" })
    .min(3, "La descripcion no puede estar vacia")
    .trim()
    .min(1),
  price: z
    .number({ message: "El precio debe ser obligatorio" })
    .positive("el precio debe ser mayor a 0"),
  cost: z
    .number({ message: "El costo debe ser un número" })
    .min(0, "El costo debe ser mayor o igual a 0")
    .optional(),
  stock: z
    .number({ message: "El stock debe ser un número" })
    .int("El stock debe ser un número entero")
    .min(0, "El stock debe ser mayor o igual a 0")
    .optional(),
});

export const validateProduct = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = productSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        error: result.error.issues,
      });
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "error interno del servidor" });
  }
};
