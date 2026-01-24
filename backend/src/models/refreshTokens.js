import { pool } from '../config/db.js'
import { hashRefreshToken } from '../utils/jwt.js'

class refreshTokens{
    static async create(userID, refreshToken, expiresAt) {
        try {
            // Hash the token before storing (security: if DB is compromised, tokens can't be used)
            const tokenHash = hashRefreshToken(refreshToken);
            
            const query = `INSERT INTO refreshTokens (user_id, token_hash, expires_at)
            VALUES (?, ?, ?)`;

            const [result] = await pool.execute(query , [
                userID,
                tokenHash,
                expiresAt
            ]);
            return result.insertId;
        } catch (error) {
            console.error('Model: Error in create:', error);
            console.error('Model: Error stack:', error.stack);
            throw error;
        }
    } 
    // find token by token hash
    static async findByTokenHash(tokenHash) {
    const query = `
      SELECT id, user_id, token_hash, expires_at, created_at, revoked
      FROM refreshTokens
      WHERE token_hash = ? AND revoked = FALSE
    `;
    
    const [rows] = await pool.execute(query, [tokenHash]);
    return rows[0] || null;
  }

  // Find token by plain token (verifies against stored hash using SHA-256)
  static async findByToken(refreshToken) {
    // Hash the incoming token and find it directly (SHA-256 is deterministic)
    const tokenHash = hashRefreshToken(refreshToken);
    const query = `
      SELECT id, user_id, token_hash, expires_at, created_at, revoked
      FROM refreshTokens
      WHERE token_hash = ? AND revoked = FALSE AND expires_at > NOW()
    `;
    
    const [rows] = await pool.execute(query, [tokenHash]);
    return rows[0] || null;
  }

  // Revoke a specific token
  static async revokeToken(tokenID) {
    const query = `
      UPDATE refreshTokens
      SET revoked = TRUE
      WHERE id = ?
    `;
    
    await pool.execute(query, [tokenID]);
  }

  // Revoke all tokens for a user (logout from all devices)
  static async revokeAllUserTokens(userID) {
    const query = `
      UPDATE refreshTokens
      SET revoked = TRUE
      WHERE user_id = ? AND revoked = FALSE
    `;
    
    await pool.execute(query, [userID]);
  }

  // Delete expired tokens (cleanup)
  static async deleteExpiredTokens() {
    const query = `
      DELETE FROM refreshTokens
      WHERE expires_at < NOW() OR revoked = TRUE
    `;
    
    await pool.execute(query);
  }

  // Get all active tokens for a user
  static async findByUserID(userID) {
    const query = `
      SELECT id, user_id, expires_at, created_at, revoked
      FROM refreshTokens
      WHERE user_id = ? AND revoked = FALSE AND expires_at > NOW()
      ORDER BY created_at DESC
    `;
    
    const [rows] = await pool.execute(query, [userID]);
    return rows;
  }

  // Check if token is valid (exists, not revoked, not expired)
  static async isValid(tokenHash) {
    const token = await refreshTokens.findByTokenHash(tokenHash);
    if (!token) return false;
    
    const now = new Date();
    const expiresAt = new Date(token.expires_at);
    
    return !token.revoked && expiresAt > now;
  }
}

export default refreshTokens;