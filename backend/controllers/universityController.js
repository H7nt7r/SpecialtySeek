const universityService = require('../service/UniversitiesService.js');
const { ErrorResponse, SuccessResponse } = require('../error/error_back');

const createUniversity = async (req, res, next) => {
  try {
    const universityData = req.body;
    const university = await universityService.createUniversity(universityData);
    req.body = university;
    if (!university) {
      throw new Error('Не удалось создать университет');
    } else {
      new SuccessResponse('Университет успешно создан').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

const getUniversityById = async (req, res, next) => {
  try {
    const universityId = req.params.id;
    const university = await universityService.getUniversityById(universityId);
    req.body = university;
    if (!university) {
      throw new Error('Университет не найден');
    } else {
      new SuccessResponse('Университет успешно найден').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

const updateUniversity = async (req, res, next) => {
  try {
    const universityId = req.params.id;
    const universityData = req.body;
    const university = await universityService.updateUniversity(universityId, universityData);
    req.body = university;
    if (!university) {
      throw new Error('Не удалось обновить университет');
    } else {
      new SuccessResponse('Университет успешно обновлен').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

const deleteUniversity = async (req, res, next) => {
  try {
    const universityId = req.params.id;
    const university = await universityService.getUniversityById(universityId);
    if (!university) {
      throw new Error('Университет не найден');
    } else {
      await universityService.deleteUniversity(universityId);
      new SuccessResponse('Университет успешно удален').send(res);
    }
  } catch (error) {
    next(error);
  }
};

const getAllUniversities = async (req, res, next) => {
  try {
    const university = await universityService.getAllUniversities();
    req.body = university;
    if (!university) {
      throw new Error('Не удалось получить университеты');
    } else {
      new SuccessResponse('Университеты успешно получены').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUniversity,
  getUniversityById,
  updateUniversity,
  deleteUniversity,
  getAllUniversities,
};
