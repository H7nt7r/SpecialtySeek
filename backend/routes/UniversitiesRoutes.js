const express = require('express');
const router = express.Router();
const universitiesController = require('../controllers/universityController');

const {validateUniversity} = require('../middle/universityShema')

router.post('/',validateUniversity, universitiesController.createUniversity);
router.get('/:id', universitiesController.getUniversityById);
router.put('/:id',validateUniversity, universitiesController.updateUniversity);
router.delete('/:id', universitiesController.deleteUniversity);
router.get('/', universitiesController.getAllUniversities);

module.exports = router;