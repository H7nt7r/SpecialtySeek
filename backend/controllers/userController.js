const userService = require('../service/UsersService');
const jwt = require('jsonwebtoken');


const getUserFromToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; 
    const decodedToken = jwt.verify(token, '123'); 
    const userId = decodedToken.id; 
    
    const user = await userService.getUserById(userId); 
    
    if (!user) {
      throw new Error('Пользователь не найден');
    } else {
      res.json(user); 
    }
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const userData = req.body;
    const user = await userService.createUser(userData);
    if (!user) {
      throw new Error('Не удалось создать пользователя');
    } else {
      res.status(201).json(user);
    }
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await userService.getUserById(userId);
    if (!user) {
      throw new Error('Пользователь не найден');
    } else {
      res.json(user);
    }
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const userData = req.body;
    const user = await userService.updateUser(userId, userData);
    if (!user) {
      throw new Error('Не удалось обновить пользователя');
    } else {
      res.json(user);
    }
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await userService.getUserById(userId);
    if (!user) {
      throw new Error('Пользователь не найден');
    } else {
      await userService.deleteUser(userId);
      res.sendStatus(204);
    }
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const user = await userService.getAllUsers();
    if (!user) {
      throw new Error('Не удалось получить пользователей');
    } else {
      res.json(user);
    }
  } catch (error) {
    next(error);
  }
};


module.exports = {
  createUser,
  getUserFromToken,
  getUserById,
  updateUser,
  deleteUser,
  getAllUsers,

};
