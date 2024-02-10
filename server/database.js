import mysql from 'mysql2';

const pool = mysql.createPool({
  host: process.env.host,
  user: 'root',
  password: 'admin123',
  database: 'usersTable',
}).promise()

// get data from database
export const status = {
  active: 'active',
  blocked: 'blocked',
  deleted: 'deleted',
}

export const isExistUser = async (login, password) => {
  const [result] = await pool.query(`
  SELECT * 
  FROM users
  WHERE login = ?
  AND password = ?`,
  [login, password])
  return result.length === 0 ? false : true
}

export const getUsers = async () => {
  const [data] = await pool.query("SELECT * FROM users");
  return data;
} 

export const getUser = async (id) => {
  const [data] = await pool.query(
  `SELECT * 
  FROM users
  WHERE id = ?`,
  [id])
  return data;
}

export const createUser = async (name, login, status, password) => {
  const [newUser] = await pool.query(`
  INSERT INTO users (name, login, status, password)
  VALUES (?, ?, ?, ?)
  `, [name, login, status, password])
  return newUser;
}

export const deleteUser = async (id) => {
  try {
    const deleted = await pool.query(`
      DELETE FROM users
      WHERE id = ?`,
      [id])
    return deleted;
  }
  catch (e) {
    console.log(e)
  }
}

export const deleteAll = async (users) => {
  try {
    const deletedAll = await pool.query(`
    DELETE FROM users`
    );
    return deleteAll;
  }
  catch (e) {
    console.log(e)
  }
}

