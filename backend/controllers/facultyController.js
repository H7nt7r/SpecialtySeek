const facultyService = require('../service/FacultiesService.js');
const { ErrorResponse, SuccessResponse } = require('../error/error_back');

const createFaculty = async (req, res, next) => {
  try {
    const facultyData = req.body;
    const faculty = await facultyService.createFaculty(facultyData);
    req.body = faculty;
    if (!faculty) {
      throw new Error('Не удалось создать факультет');
    } else {
      new SuccessResponse('Факультет успешно создан').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

const getFacultyById = async (req, res, next) => {
  try {
    const facultyId = req.params.id;
    const faculty = await facultyService.getFacultyById(facultyId);
    req.body = faculty;
    if (!faculty) {
      throw new Error('Факультет не найден');
    } else {
      new SuccessResponse('Факультет успешно найден').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

const updateFaculty = async (req, res, next) => {
  try {
    const facultyId = req.params.id;
    const facultyData = req.body;
    const faculty = await facultyService.updateFaculty(facultyId, facultyData);
    req.body = faculty;
    if (!faculty) {
      throw new Error('Не удалось обновить факультет');
    } else {
      new SuccessResponse('Факультет успешно обновлён').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

const deleteFaculty = async (req, res, next) => {
  try {
    const facultyId = req.params.id;
    const faculty = await facultyService.getFacultyById(facultyId);
    if (!faculty) {
      throw new Error('Факультет не найден');
    } else {
      await facultyService.deleteFaculty(facultyId);
      new SuccessResponse('Факультет успешно удалён').send(res);
    }
  } catch (error) {
    next(error);
  }
};

const getAllFaculties = async (req, res, next) => {
  try {
    const faculties = await facultyService.getAllFaculties();
    if (!faculties || faculties.length === 0) {
      throw new Error('Не удалось получить факультеты');
    } else {
      new SuccessResponse('Факультеты успешно получены').send(res, faculties);
    }
  } catch (error) {
    next(error);
  }
};


module.exports = {
  createFaculty,
  getFacultyById,
  updateFaculty,
  deleteFaculty,
  getAllFaculties,
};