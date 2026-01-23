import { pool } from '../config/db.js';

class User {
  static async create(userData) {
    const {
      username,
      pass,
      email,
      phoneNumber,
      roleID = 1,
      companyName = null,
      locatedIn = null
    } = userData;

    const query = `
      INSERT INTO users (username, pass, email, roleID, phoneNumber, companyName, locatedIn)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await pool.execute(query, [
      username,
      pass,
      email,
      roleID,
      phoneNumber,
      companyName,
      locatedIn
    ]);

    return User.findById(result.insertId);
  }

  static async findById(userID) {
    const query = 'SELECT userID, username, email, roleID, phoneNumber, companyName, locatedIn, createdAt FROM users WHERE userID = ?';
    const [rows] = await pool.execute(query, [userID]);
    return rows[0] || null;
  }

  static async findByUsername(username) {
    const query = 'SELECT * FROM users WHERE username = ?';
    const [rows] = await pool.execute(query, [username]);
    return rows[0] || null;
  }

  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = ?';
    const [rows] = await pool.execute(query, [email]);
    return rows[0] || null;
  }

  static async usernameExists(username) {
    const user = await User.findByUsername(username);
    return user !== null;
  }

  static async emailExists(email) {
    const user = await User.findByEmail(email);
    return user !== null;
  }
}

export default User;

