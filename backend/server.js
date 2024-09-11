const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const axios = require('axios');
const User = require('./models/User');
const app = express();
const port = process.env.PORT || 5000;

const authRouter = require("./routes/authRoutes.js");

const cors = require("cors");
// Middleware
app.use(express.json());
app.use(cors());
// MongoDB connection
mongoose.connect('mongodb+srv://rsingh300103:chamanchutiyachoubey@farmers-goods.tgiyj.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

app.get("/api/login", async (req, res)=>{
  const { email, password } = req.body;
  console.log(email, password);
  // Check if user exists in the database
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
 /* const token = jwt.sign(
    {
      id: user._id,
      role: user.role, // Store role in the token payload
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  res.json({ token });
})*/
app.post("/api/register", async (req, res) => {
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
})
// app.use("/api", authRouter);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
});