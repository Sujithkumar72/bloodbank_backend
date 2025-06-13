const pool = require('../config/db');

const createDonor = async (donorData) => {
  const conn = await pool.getConnection();
  try {
    const result = await conn.query(
      `INSERT INTO donors (firstname, lastname, date_of_birth, gender, age, occupation, village, mobile_number, created_by) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [...donorData]
    );
    return result.insertId;
  } finally {
    conn.release();
  }
};