/*****************
USER CONTROLLER
******************/
const jwt = require('jsonwebtoken')          // For creating JSON Web Tokens
const User = require('../models/User')       // Mongoose User model

// The token contains the user id and expires in 1 day
const createToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' })

// REGISTER controller: creates a new user and returns a JWT
exports.register = async (req, res) => {
  try {
    // Create a new user in the database using the request body
    const user = await User.create(req.body)

    // Generate a JWT token for the new user
    const token = createToken(user._id)

    // Return the token as JSON
    res.json({ token })
  } catch (err) {
    // If there is an error (e.g., validation), return 400 with error message
    res.status(400).json({ error: err.message })
  }
}

// LOGIN controller: authenticates an existing user and returns a JWT
exports.login = async (req, res) => {
  const { email, password } = req.body

  // Find user by email
  const user = await User.findOne({ email })

  // If user does not exist or password is incorrect, return error
  if (!user || !(await user.comparePassword(password)))
    return res.status(400).json({ error: 'Invalid credentials' })

  // Generate a JWT token for the authenticated user
  const token = createToken(user._id)

  // Return the token as JSON
  res.json({ token })
}