const express = require('express');
const router = express.Router();
const disciplinesController = require('../controllers/disciplineController');

const {validateDiscipline} = require('../middle/disciplineShema')

router.post('/', validateDiscipline,disciplinesController.createDiscipline);
router.get('/:id', disciplinesController.getDisciplineById);
router.put('/:id',validateDiscipline, disciplinesController.updateDiscipline);
router.delete('/:id', disciplinesController.deleteDiscipline);
router.get('/', disciplinesController.getAllDisciplines);

module.exports = router;