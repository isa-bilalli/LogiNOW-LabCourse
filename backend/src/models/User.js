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
    static async updateProfile(userID, userData) {
    const { username, email, phoneNumber, companyName, locatedIn } = userData;

    const query = `
      UPDATE users 
      SET username = ?, email = ?, phoneNumber = ?, companyName = ?, locatedIn = ?
      WHERE userID = ?
    `;
    await pool.execute(query, [username, email, phoneNumber, companyName, locatedIn, userID]);
    return User.findById(userID);  
  }
    static async updatePassword(userID, hashedPassword) {
      const query = 'UPDATE users SET pass = ? WHERE userID = ?';
      await pool.execute(query, [hashedPassword, userID]);
      return true;
    }
    static async deleteAccount(userID) {
      const query = 'DELETE  FROM users WHERE userID = ?';
      const[result] = await pool.execute(query, [userID]);
      return result.affectedRows > 0;
    }
    static async findByIdWithPassword(userID) {
      const query = 'SELECT * from users WHERE userID = ?';
      const[rows] = await pool.execute(query, [userID]);
      return rows[0] || null;
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

