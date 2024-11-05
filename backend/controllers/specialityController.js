const specialityService = require('../service/SpecialitiesService');
const { ErrorResponse, SuccessResponse } = require('../error/error_back');

const createSpeciality = async (req, res, next) => {
  try {
    const specialityData = req.body;
    const speciality = await specialityService.createSpeciality(specialityData);
    req.body = speciality;
    if (!speciality) {
      throw new Error('Не удалось создать специальность');
    } else {
      new SuccessResponse('Специальность успешно создана').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

const getSpecialityById = async (req, res, next) => {
  try {
    const specialityId = req.params.id;
    const speciality = await specialityService.getSpecialityById(specialityId);
    req.body = speciality;
    if (!speciality) {
      throw new Error('Специальность не найдена');
    } else {
      new SuccessResponse('Специальность успешно найдена').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

const updateSpeciality = async (req, res, next) => {
  try {
    const specialityId = req.params.id;
    const specialityData = req.body;
    const speciality = await specialityService.updateSpeciality(specialityId, specialityData);
    req.body = speciality;
    if (!speciality) {
      throw new Error('Не удалось обновить специальность');
    } else {
      new SuccessResponse('Специальность успешно обновлена').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

const deleteSpeciality = async (req, res, next) => {
  try {
    const specialityId = req.params.id;
    const speciality = await specialityService.getSpecialityById(specialityId);
    if (!speciality) {
      throw new Error('Специальность не найдена');
    } else {
      await specialityService.deleteSpeciality(specialityId);
      new SuccessResponse('Специальность успешно удалена').send(res);
    }
  } catch (error) {
    next(error);
  }
};

const getAllSpecialities = async (req, res, next) => {
  try {
    const speciality = await specialityService.getAllSpecialities();
    req.body = speciality;
    if (!speciality) {
      throw new Error('Не удалось получить специальности');
    } else {
      new SuccessResponse('Специальности успешно получены').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

const getSpecialityByDisciplines = async (req, res, next) => {
  try {
    const { disciplines } = req.query;
    const disciplineList = disciplines.split(',');
    const specialities = await specialityService.getSpecialityByDisciplines(disciplineList);
    req.body = specialities;
    if (!specialities || specialities.length === 0) {
      throw new Error("Не удалось получить специальности");
    } else {
      new SuccessResponse("Специальности успешно получены").send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

const getAllSpecialitiesWithFaculties = async (req, res, next) => {
  try {
    const specialities = await specialityService.getAllSpecialities();
    const faculties = await specialityService.getAllFaculties(); // Предполагаем, что эта функция существует в сервисе
    const specialitiesWithFacultyId = specialities.map(speciality => {
      const faculty = faculties.find(f => f.id === speciality.faculty_id);
      return {
        ...speciality,
        faculty_id: faculty ? faculty.id : null
      };
    });

    req.body = specialitiesWithFacultyId;
    if (!specialitiesWithFacultyId || specialitiesWithFacultyId.length === 0) {
      throw new Error('Не удалось получить специальности с факультетами');
    } else {
      new SuccessResponse('Специальности с факультетами успешно получены').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};


module.exports = {
  createSpeciality,
  getSpecialityById,
  updateSpeciality,
  deleteSpeciality,
  getAllSpecialities,
  getSpecialityByDisciplines,
  getAllSpecialitiesWithFaculties
};
