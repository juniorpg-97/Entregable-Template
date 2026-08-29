import pool from "../config/db.js";

export const getAllSales = async () => {
  const result = await pool.query(
    `SELECT
       sales.id,
       sales.customer_id,
       sales.product_id,
       customers.name AS customer_name
     FROM sales
     INNER JOIN customers
       ON sales.customer_id = customers.id
     ORDER BY sales.id`,
  );

  return result.rows;
};

export const getSaleById = async (id: number) => {
  const result = await pool.query(
    `SELECT
       sales.id,
       sales.customer_id,
       sales.product_id,
       customers.name AS customer_name
     FROM sales
     INNER JOIN customers
       ON sales.customer_id = customers.id
     WHERE sales.id = $1`,
    [id],
  );

  return result.rows[0] || null;
};

export const insertSale = async (customer_id: number, product_id: number) => {
  const result = await pool.query(
    `INSERT INTO sales (customer_id, product_id)
     VALUES ($1, $2)
     RETURNING *`,
    [customer_id, product_id],
  );

  return result.rows[0];
};

export default router;
