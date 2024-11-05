const discipline_typeService = require('../service/Discipline_TypesService');
const { ErrorResponse, SuccessResponse } = require('../error/error_back');

const createDiscipline_Type = async (req, res, next) => {
  try {
    const discipline_typeData = req.body;
    const discipline_type = await discipline_typeService.createDiscipline_Type(discipline_typeData);
    req.body = discipline_type;
    if (!discipline_type) {
      throw new Error('Не удалось создать тип дисциплины');
    } else {
      new SuccessResponse('Тип дисциплины успешно создан').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

const getDiscipline_TypeById = async (req, res, next) => {
  try {
    const discipline_typeId = req.params.id;
    const discipline_type = await discipline_typeService.getDiscipline_TypeById(discipline_typeId);
    req.body = discipline_type;
    if (!discipline_type) {
      throw new Error('Тип дисциплины не найден');
    } else {
      new SuccessResponse('Тип дисциплины успешно найден').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

const updateDiscipline_Type = async (req, res, next) => {
  try {
    const discipline_typeId = req.params.id;
    const discipline_typeData = req.body;
    const discipline_type = await discipline_typeService.updateDiscipline_Type(discipline_typeId, discipline_typeData);
    req.body = discipline_type;
    if (!discipline_type) {
      throw new Error('Не удалось обновить тип дисциплины');
    } else {
      new SuccessResponse('Тип дисциплины успешно обновлен').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

const deleteDiscipline_Type = async (req, res, next) => {
  try {
    const discipline_typeId = req.params.id;
    const discipline_type = await discipline_typeService.getDiscipline_TypeById(discipline_typeId);
    if (!discipline_type) {
      throw new Error('Тип дисциплины не найден');
    } else {
      await discipline_typeService.deleteDiscipline_Type(discipline_typeId);
      new SuccessResponse('Тип дисциплины успешно удален').send(res);
    }
  } catch (error) {
    next(error);
  }
};

const getAllDisciplines_Types = async (req, res, next) => {
  try {
    const discipline_type = await discipline_typeService.getAllDisciplines_Types();
    req.body = discipline_type;
    if (!discipline_type) {
      throw new Error('Не удалось получить типы дисциплин');
    } else {
      new SuccessResponse('Типы дисциплин успешно получены').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};


module.exports = {
  createDiscipline_Type,
  getDiscipline_TypeById,
  updateDiscipline_Type,
  deleteDiscipline_Type,
  getAllDisciplines_Types,
};
