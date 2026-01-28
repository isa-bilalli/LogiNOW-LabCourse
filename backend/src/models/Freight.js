import { pool } from '../config/db.js';

class Freight {
  static async create(freightData) {
    const {
      currentLocation,
      destination,
      truckType,
      dateAvailable,
      maxWeight,
      price,
      full = true,
      userID
    } = freightData;

    const query = `
      INSERT INTO freight (currentLocation, destination, truckType, dateAvailable, maxWeight, price, full, userID)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await pool.execute(query, [
      currentLocation,
      destination,
      truckType,
      dateAvailable,
      maxWeight,
      price,
      full,
      userID
    ]);

    return Freight.findById(result.insertId);
  }

  static async findById(freightID) {
    const query = 'SELECT * FROM freight WHERE freightID = ?';
    const [rows] = await pool.execute(query, [freightID]);
    return rows[0] || null;
  }

  static async findByUserId(userID) {
    const query = 'SELECT * FROM freight WHERE userID = ? ORDER BY dateAvailable DESC';
    const [rows] = await pool.execute(query, [userID]);
    return rows;
  }

  static async findAll() {
    const query = `
      SELECT f.*, u.phoneNumber, u.username 
      FROM freight f 
      LEFT JOIN users u ON f.userID = u.userID 
      ORDER BY f.dateAvailable DESC
    `;
    const [rows] = await pool.execute(query);
    return rows;
  }

  static async update(freightID, freightData) {
    const {
      currentLocation,
      destination,
      truckType,
      dateAvailable,
      maxWeight,
      price,
      full,
      booked
    } = freightData;

    const query = `
      UPDATE freight 
      SET currentLocation = ?, destination = ?, truckType = ?, dateAvailable = ?, 
          maxWeight = ?, price = ?, full = ?, booked = ?
      WHERE freightID = ?
    `;

    await pool.execute(query, [
      currentLocation,
      destination,
      truckType,
      dateAvailable,
      maxWeight,
      price,
      full,
      booked,
      freightID
    ]);

    return Freight.findById(freightID);
  }

  static async delete(freightID) {
    const query = 'DELETE FROM freight WHERE freightID = ?';
    const [result] = await pool.execute(query, [freightID]);
    return result.affectedRows > 0;
  }
}

export default Freight;