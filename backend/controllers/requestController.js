const requestService = require('../service/RequestsService');
const universityService = require('../service/UniversitiesService');
const { ErrorResponse, SuccessResponse } = require('../error/error_back');
const path = require('path');
const multer = require('multer');
const { Console } = require('console');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../frontend/public/img/requests'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage }).single('img');

const createRequest = async (req, res, next) => {
  console.log('||')
  upload(req, res, async (err) => {
    if (err) {
      return next(err);
    }

    try {
      const { name_university, desc, telephone, user_id } = req.body;

      const requestData = {
        name_university,
        desc,
        telephone,
        img: req.file ? req.file.filename : null,
        user_id,
      };

      const request = await requestService.createRequest(requestData);
      req.body = request;
      if (!request) {
        throw new Error('Не удалось создать запрос');
      } else {
        new SuccessResponse('Запрос успешно создан').send(res, req.body);
      }
    } catch (error) {
      next(error);
    }
  });
};

const getRequestById = async (req, res, next) => {
  try {
    const requestId = req.params.id;
    const request = await requestService.getRequestById(requestId);
    req.body = request;
    if (!request) {
      throw new Error('Запрос не найден');
    } else {
      new SuccessResponse('Запрос успешно найден').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

const updateRequest = async (req, res, next) => {
  try {
    const requestId = req.params.id;
    const requestData = req.body;
    const request = await requestService.updateRequest(requestId, requestData);
    req.body = request;
    if (!request) {
      throw new Error('Не удалось обновить запрос');
    } else {
      new SuccessResponse('Запрос успешно обновлен').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

const deleteRequest = async (req, res, next) => {
  try {
    const requestId = req.params.id;
    const request = await requestService.getRequestById(requestId);
    if (!request) {
      throw new Error('Запрос не найден');
    } else {
      await requestService.deleteRequest(requestId);
      new SuccessResponse('Запрос успешно удален').send(res);
    }
  } catch (error) {
    next(error);
  }
};

const getAllRequests = async (req, res, next) => {
  console.log('||');
  try {
    const request = await requestService.getAllRequests();
    req.body = request;
    if (!request) {
      throw new Error('Не удалось получить запросы');
    } else {
      new SuccessResponse('Запросы успешно получены').send(res, req.body);
    }
  } catch (error) {
    next(error);
  }
};

const approveRequest = async (req, res, next) => {
  try {
    const requestId = req.params.id;
    const request = await requestService.getRequestById(requestId);
    if (!request) {
      throw new Error('Запрос не найден');
    } else {
      await universityService.createUniversity({
        name: request.name_university,
        desc: request.desc,
        img: request.img,
        telephone: request.telephone,
        user_id: request.user_id,
      });
      await requestService.deleteRequest(requestId);
      new SuccessResponse('Запрос успешно принят и университет создан').send(res);
    }
  } catch (error) {
    next(error);
  }
};

const rejectRequest = async (req, res, next) => {
  try {
    const requestId = req.params.id;
    const request = await requestService.getRequestById(requestId);
    if (!request) {
      throw new Error('Запрос не найден');
    } else {
      await requestService.deleteRequest(requestId);
      new SuccessResponse('Запрос успешно отклонен').send(res);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRequest,
  getRequestById,
  updateRequest,
  deleteRequest,
  getAllRequests,
  approveRequest,
  rejectRequest,
};
