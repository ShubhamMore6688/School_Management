import { pool } from "../config/db.js";

export async function addSchool(name, address, latitude, longitude) {
  const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
  const [result] = await pool.execute(query, [name, address, latitude, longitude]);
  return result.insertId;
}

export async function getAllSchools() {
  const query = 'SELECT * FROM schools';
  const [rows] = await pool.query(query);
  return rows;
}
