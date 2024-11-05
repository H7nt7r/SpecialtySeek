const express = require("express");
const User = require("../models/Users");
const userService = require("../service/UsersService");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const router = express.Router();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Токен не предоставлен' });
  }

  jwt.verify(token, '123', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Невалидный токен' });
    }
    req.user = user;
    next();
  });
};

router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

router.put('/me', authenticateToken, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { name, email } = req.body;
    const user = await userService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    const updatedUser = await userService.updateUser(userId, { name, email });
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
});


router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Missing email or password", status: 400 });
  }

  try {
    const userWithEmail = await User.findOne({ where: { email } });

    if (!userWithEmail) {
      return res.status(400).json({ success: false, message: "Email does not match!", status: 400 });
    }

    const isMatch = await bcrypt.compare(password, userWithEmail.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Password does not match!", status: 400 });
    }

    const jwtToken = jwt.sign(
      { id: userWithEmail.id, email: userWithEmail.email },
      '123', { expiresIn: '1h' }
    );

    res.json({ success: true, message: "Welcome Back!", token: jwtToken, status: 200 });
  } catch (err) {
    console.error('Error: ', err);
    res.status(500).json({ success: false, message: "Server error", status: 500 });
  }
});

router.post("/register", async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ email, password: hashedPassword, name });

    await newUser.save();
    res.json({ success: true, message: 'User registered', user: newUser });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(400).json({ success: false, message: 'Error registering user', error: error.message });
  }
});

module.exports = router;
