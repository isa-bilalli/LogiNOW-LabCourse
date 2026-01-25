import { pool } from '../config/db.js';

class Truck {
  static async create(truckData) {
    const {
      currentLocation,
      truckType,
      dateAvailable,
      maxWeight,
      vanLength = null,
      width = null,
      userID
    } = truckData;

    const query = `
      INSERT INTO truck (currentLocation, truckType, dateAvailable, maxWeight, vanLength, width, userID)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await pool.execute(query, [
      currentLocation,
      truckType,
      dateAvailable,
      maxWeight,
      vanLength,
      width,
      userID
    ]);

    return Truck.findById(result.insertId);
  }

  static async findById(truckID) {
    const query = 'SELECT * FROM truck WHERE truckID = ?';
    const [rows] = await pool.execute(query, [truckID]);
    return rows[0] || null;
  }

  static async findByUserId(userID) {
    const query = 'SELECT * FROM truck WHERE userID = ? ORDER BY dateAvailable DESC';
    const [rows] = await pool.execute(query, [userID]);
    return rows;
  }

  static async findAll() {
    const query = 'SELECT * FROM truck ORDER BY dateAvailable DESC';
    const [rows] = await pool.execute(query);
    return rows;
  }

  static async update(truckID, truckData) {
    const {
      currentLocation,
      truckType,
      dateAvailable,
      maxWeight,
      vanLength,
      width,
      booked
    } = truckData;

    const query = `
      UPDATE truck 
      SET currentLocation = ?, truckType = ?, dateAvailable = ?, 
          maxWeight = ?, vanLength = ?, width = ?, booked = ?
      WHERE truckID = ?
    `;

    await pool.execute(query, [
      currentLocation,
      truckType,
      dateAvailable,
      maxWeight,
      vanLength,
      width,
      booked,
      truckID
    ]);

    return Truck.findById(truckID);
  }

  static async delete(truckID) {
    const query = 'DELETE FROM truck WHERE truckID = ?';
    const [result] = await pool.execute(query, [truckID]);
    return result.affectedRows > 0;
  }
}

export default Truck;