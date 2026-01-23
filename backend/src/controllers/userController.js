import bcrypt from 'bcrypt';
import User from '../models/User.js';

export async function registerUser(req, res) {
  try {
    const { username, email, password, phoneNumber, companyName, locatedIn } = req.body;

    // Validation
    if (!username || !email || !password || !phoneNumber) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: 'Missing required fields',
        message: 'Username, email, password, and phone number are required'
      }));
      return;
    }

    // Validimi emailit
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: 'Invalid email format'
      }));
      return;
    }

    // Validaimi passwordit
    if (password.length < 8) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: 'Password must be at least 8 characters long'
      }));
      return;
    }

    // Check if username already exists
    if (await User.usernameExists(username)) {
      res.writeHead(409, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: 'Username already exists'
      }));
      return;
    }

    // Check if email already exists
    if (await User.emailExists(email)) {
      res.writeHead(409, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: 'Email already exists'
      }));
      return;
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const userData = {
      username,
      pass: hashedPassword,
      email,
      phoneNumber,
      companyName: companyName || null,
      locatedIn: locatedIn || null,
      roleID: 1 // Roli default eshte user
    };

    const user = await User.create(userData);

    // Return user data (without password)
    const { pass, ...userWithoutPassword } = user;

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      message: 'User registered successfully',
      user: userWithoutPassword
    }));

  } catch (error) {
    console.error('Registration error:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      error: 'Internal server error',
      message: 'Failed to register user'
    }));
  }
}

