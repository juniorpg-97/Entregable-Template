import pool from "../config/db.js";

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone_number: string | null;
}

export const getAllCustomers = async (): Promise<Customer[]> => {
  const result = await pool.query("SELECT * FROM customers ORDER BY id");

  return result.rows;
};

export const getCustomerById = async (id: number): Promise<Customer | null> => {
  const result = await pool.query("SELECT * FROM customers WHERE id = $1", [
    id,
  ]);

  return result.rows[0] || null;
};

export const insertCustomer = async (
  name: string,
  email: string,
  phone_number: string | null,
): Promise<Customer> => {
  const result = await pool.query(
    `INSERT INTO customers (name, email, phone_number)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [name, email, phone_number],
  );

  return result.rows[0];
};

export const updateCustomer = async (
  id: number,
  name: string,
  email: string,
  phone_number: string | null,
): Promise<Customer | null> => {
  const result = await pool.query(
    `UPDATE customers
     SET name = $1,
         email = $2,
         phone_number = $3
     WHERE id = $4
     RETURNING *`,
    [name, email, phone_number, id],
  );

  return result.rows[0] || null;
};
