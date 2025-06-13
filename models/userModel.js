const pool = require('../config/db');

const createUser = async (userData) => {
  const conn = await pool.getConnection();
  try {
    const result = await conn.query(
      `INSERT INTO users (firstname, lastname, username, password, date_of_birth, gender, age, occupation, village, mobile_number, role, created_by) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [...userData]
    );
    return result.insertId;
  } finally {
    conn.release();
  }
};

// Add similar methods for getUserByUsername, getUsersByRole, etc.