import type { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const customerSchema = z.object({
  name: z
    .string({
      message: "El nombre es obligatorio",
    })
    .min(1, "El nombre no puede estar vacío")
    .max(100, "El nombre no puede superar los 100 caracteres"),

  email: z
    .string({
      message: "El email es obligatorio",
    })
    .email("El email debe tener un formato válido")
    .max(150, "El email no puede superar los 150 caracteres"),

  phone_number: z
    .string()
    .max(20, "El teléfono no puede superar los 20 caracteres")
    .nullable()
    .optional(),
});

export const validateCustomer = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = customerSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      error: "Datos inválidos",
      details: result.error.issues,
    });
    return;
  }

  req.body = result.data;

  next();
};
