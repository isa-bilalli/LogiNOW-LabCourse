import { pool } from '../config/db.js';

class Profile {
  static async create(profileData) {
    const {
      fullName,
      email,
      phoneNumber,
      companyName = null,
      location = null,
      userID
    } = profileData;

    const query = `
      INSERT INTO profiles (fullName, email, phoneNumber, companyName, location, userID)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const [result] = await pool.execute(query, [
      fullName,
      email,
      phoneNumber,
      companyName,
      location,
      userID
    ]);

    return Profile.findById(result.insertId);
  }

  static async findById(profileID) {
    const query = 'SELECT * FROM profiles WHERE profileID = ?';
    const [rows] = await pool.execute(query, [profileID]);
    return rows[0] || null;
  }

  static async findByUserId(userID) {
    const query = 'SELECT * FROM profiles WHERE userID = ? ORDER BY createdAt DESC';
    const [rows] = await pool.execute(query, [userID]);
    return rows;
  }

  static async update(profileID, profileData) {
    const {
      fullName,
      email,
      phoneNumber,
      companyName,
      location
    } = profileData;

    const query = `
      UPDATE profiles 
      SET fullName = ?, email = ?, phoneNumber = ?, companyName = ?, location = ?
      WHERE profileID = ?
    `;

    await pool.execute(query, [
      fullName,
      email,
      phoneNumber,
      companyName,
      location,
      profileID
    ]);

    return Profile.findById(profileID);
  }

  static async delete(profileID) {
    const query = 'DELETE FROM profiles WHERE profileID = ?';
    const [result] = await pool.execute(query, [profileID]);
    return result.affectedRows > 0;
  }
}

export default Profile;