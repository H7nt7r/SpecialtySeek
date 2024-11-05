const User = require('../models/Users');

const createUser = async(userData) => {
  const user = await User.create(userData);
  
  const defaultRole = await Type.findOne({ where: { id: 3 } });
  if (!defaultRole) {
    throw new Error('Тип с id=3 не найден');
  }

  const userRole = await User_type.create({
    user_id: user.id,
    type_id: defaultRole.id
  });

  if (!userRole) {
    throw new Error('Не удалось создать запись о роли пользователя');
  }

  return user;
};

const getUserById = async (userId) => {
  const user = await User.findByPk(userId);
  return user;
};

const updateUser = async (userId, userData) => {
  const user = await User.findByPk(userId);
  await user.update(userData);
  return user;
};

const deleteUser = async (userId) => {
  const user = await User.findByPk(userId);
  await user.destroy();
};

const getAllUsers = async () => {
  const user = await User.findAll();
  return user;
};

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getAllUsers,
};
