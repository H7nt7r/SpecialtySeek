const disciplineService = require('../service/DisciplinesService');
const { ErrorResponse, SuccessResponse } = require('../error/error_back');

const createDiscipline = async (req, res, next) => {
  try{
  const disciplineData = req.body;
  const discipline = await disciplineService.createDiscipline(disciplineData);
  req.body = discipline;
  if (!discipline){
    throw new Error('Не удалось создать дисциплину');
  } else {
    new SuccessResponse('Дисциплина успешно создана').send(res,req.body);
  }
} catch (error){
  next(error);
}
};

const getDisciplineById = async (req, res, next) => {
  try {
    const disciplineId = req.params.id;
    const discipline = await disciplineService.getDisciplineById(disciplineId);
    req.body = discipline;
    if (!discipline) {
      throw new Error('Дисциплина не найдена');
    } else {
      new SuccessResponse('Дисциплина успешно найдена').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

const updateDiscipline = async (req, res, next) => {
  try {
    const disciplineId = req.params.id;
    const disciplineData = req.body;
    const discipline = await disciplineService.updateDiscipline(disciplineId, disciplineData);
    req.body = discipline;
    if (!discipline) {
      throw new Error('Не удалось обновить дисциплину');
    } else {
      new SuccessResponse('Дисциплина успешно обновлена').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

const deleteDiscipline = async (req, res, next) => {
  try {
    const disciplineId = req.params.id;
    const discipline = await disciplineService.getDisciplineById(disciplineId);
    if (!discipline) {
      throw new Error('Дисциплина не найдена');
    } else {
      await disciplineService.deleteDiscipline(disciplineId);
      new SuccessResponse('Дисциплина успешно удалена').send(res);
    }
  } catch (error) {
    next(error);
  }
};

const getAllDisciplines = async (req, res, next) => {
  try {
    const discipline = await disciplineService.getAllDisciplines();
    req.body = discipline;
    if (!discipline) {
      throw new Error('Не удалось получить дисциплины');
    } else {
      new SuccessResponse('Дисциплины успешно получены').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createDiscipline,
  getDisciplineById,
  updateDiscipline,
  deleteDiscipline,
  getAllDisciplines,
};