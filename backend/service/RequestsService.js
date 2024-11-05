const requestRepository = require('../repository/RequestsRepository');

const createRequest = async (requestData) => {
  const request = await requestRepository.createRequest(requestData);
  return request;
};

const getRequestById = async (requestId) => {
  const request = await requestRepository.getRequestById(requestId);
  return request;
};

const updateRequest = async (requestId, requestData) => {
  const request = await requestRepository.updateRequest(requestId, requestData);
  return request;
};

const deleteRequest = async (requestId) => {
  await requestRepository.deleteRequest(requestId);
};

const getAllRequests = async () => {
  const request = await requestRepository.getAllRequests();
  return request;
};

module.exports = {
  createRequest,
  getRequestById,
  updateRequest,
  deleteRequest,
  getAllRequests
};
