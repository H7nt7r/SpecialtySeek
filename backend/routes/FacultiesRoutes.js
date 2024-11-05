const express = require('express');
const router = express.Router();
const facultiesController = require('../controllers/facultyController');

const {validateFaculty} = require('../middle/facultyShema')

router.post('/', validateFaculty,facultiesController.createFaculty);
router.get('/:id', facultiesController.getFacultyById);
router.put('/:id', validateFaculty, facultiesController.updateFaculty);
router.delete('/:id', facultiesController.deleteFaculty);
router.get('/', facultiesController.getAllFaculties);

module.exports = router;