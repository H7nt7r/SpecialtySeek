const express = require('express');
const router = express.Router();
const requestsController = require('../controllers/requestController');
const { validateRequest} = require('../middle/requestShema')


router.get('/:id', requestsController.getRequestById);
router.post('/',requestsController.createRequest);
router.get('/', requestsController.getAllRequests);
router.delete('/:id', requestsController.deleteRequest);
router.put('/:id',validateRequest,requestsController.updateRequest);
router.post('/:id/approve', requestsController.approveRequest);
router.delete('/:id/reject', requestsController.rejectRequest);


module.exports = router;