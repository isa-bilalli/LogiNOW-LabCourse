import bcrypt from 'bcrypt';
import User from '../models/User.js';
import RefreshToken from '../models/refreshTokens.js';
import { generateAccessToken, generateRefreshToken, getRefreshTokenExpiry } from '../utils/jwt.js';

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
    const saltRounds = 3;
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

export async function loginUser(req, res){
  try{
    const {username, password} = req.body;
    //Sigurojme qe te dhenat jane te mbushura
    if (!username || !password){
      res.writeHead(400, {'Content-Type': 'application/json'})
      res.end(JSON.stringify({
        error: 'Missing Credentials',
        message: 'Username & Password required.'
      }));
      return;
    }
    
    //Gjejme prej Username, ose Email
    let user = await User.findByUsername(username)
    if(!user) {
      console.log('Controller: User not found by username, trying email');
      user = await User.findByEmail(username)
    }
    
    //Sigurojme qe te dhenat jane te sakta  sic priten
    if(!user) {
      res.writeHead(400, {'Content-Type':'application/json'})
      res.end(JSON.stringify({
        error:'Invalid Credentials',
        message:'Username or Password is incorrect'
      }));
      return;
    }
    
    console.log('Controller: User found, validating password');
    //Validojme pass
    const isPasswordValid = await bcrypt.compare(password, user.pass);
    if(!isPasswordValid){
      res.writeHead(401,{'Content-Type':'application/json'})
      res.end(JSON.stringify({
        error:'Invalid Credentials',
        message:'Password is incorrect'
      }));
      return;
    }
    
    console.log('Controller: Password valid, generating tokens');
    //Gjenerojme Tokenet
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken();
    const expiresAt = getRefreshTokenExpiry();
    
    try {
      //Shkruajme Refresh token ne DB ku hashohet ne RefreshTokens Model
      const tokenId = await RefreshToken.create(user.userID, refreshToken, expiresAt);
    } catch (dbError) {
      console.error('Controller: Error storing refresh token:', dbError);
      console.error('Controller: Error stack:', dbError.stack);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: 'Internal server error',
        message: 'Failed to store refresh token'
      }));
      return;
    }

    const cookieExpiry = new Date();
    cookieExpiry.setDate(cookieExpiry.getDate() + 30);
    const cookieMaxAge = 30 * 24 * 60 * 60 * 1000;
    const cookieOptions = [
      `refreshToken=${refreshToken}`,
      `HttpOnly`,
      `SameSite=Lax`, // Changed from Strict to Lax for cross-origin support
      `Path=/`,
      `Max-Age=${cookieMaxAge / 1000}` // Max-Age in seconds
    ].join('; ');
    //kthejm user data pa password (refresh token is now in cookie, not in response)
    const {pass, ...userWithoutPassword} = user;
    
    const responseData = {
      accessToken,
      user: userWithoutPassword
    };
    console.log('Controller: Response data prepared:', { 
      hasAccessToken: !!accessToken, 
      hasUser: !!userWithoutPassword,
      userId: userWithoutPassword.userID 
    });
    
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Set-Cookie': cookieOptions
    });
    res.end(JSON.stringify(responseData));
  }catch(err){
    console.error('Controller: Login error:', err);
    console.error('Controller: Error stack:', err.stack);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      error: 'Internal server error',
      message: 'Failed to login'
    }));
  }
}

export async function countUsers(req, res){
  try{
    const total = await User.countUsers();
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({
      total: total
    }));
  } catch(err) {
    console.log('Error counting users', err);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      error: 'Internal server error',
      message: 'Failed to count users'
    }));
  }
}