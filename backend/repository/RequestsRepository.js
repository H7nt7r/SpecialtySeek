const Request = require('../models/Requests');



const createRequest = async(requestData) => {
	const request = await Request.create(requestData);
	return request;
};

const getRequestById = async (requestId) => {
  const request = await Request.findByPk(requestId);
  return request;
};

const updateRequest = async (requestId, requestData) => {
  const request = await Request.findByPk(requestId);
  await request.update(requestData);
  return request;
};

const deleteRequest = async (requestId) => {
  const request = await Request.findByPk(requestId);
  await request.destroy();
};

const getAllRequests = async () => {
  const request = await Request.findAll();
  return request;
};


module.exports = {
  createRequest,
  getRequestById,
  updateRequest,
  deleteRequest,
  getAllRequests,
};