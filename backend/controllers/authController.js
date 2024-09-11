// authController.js (Node.js backend)
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // User model in MongoDB

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  // Check if user exists in the database
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign(
    {
      id: user._id,
      role: user.role, // Store role in the token payload
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  res.json({ token });
};

exports.signup = async (req, res) => {
  const { name, email, mobile, password, role, productType, captchaToken } = req.body;
  // // Verify hCaptcha token
  // const captchaSecret = 'your-hcaptcha-secret-key';
  // try {
  //   const captchaResponse = await axios.post(`https://hcaptcha.com/siteverify?secret=${captchaSecret}&response=${captchaToken}`);
  //   if (!captchaResponse.data.success) {
  //     return res.status(400).json({ error: 'Captcha verification failed' });
  //   }
  // } catch (error) {
  //   return res.status(500).json({ error: 'Captcha validation error' });
  // }
  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ error: 'User already exists' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  // Create a new user
  const newUser = new User({
    name,
    email,
    mobile,
    password: hashedPassword,
    role,
    productType: role === 'farmer' ? productType : null,
  });

  try {
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
}