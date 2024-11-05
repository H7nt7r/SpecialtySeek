const express = require('express');
const router = express.Router();
const discipline_typesController = require('../controllers/discipline_typesController');

const {validateDisciplineType} = require('../middle/disciplineTypesShema')

router.get('/:id', discipline_typesController.getDiscipline_TypeById);
router.post('/',validateDisciplineType ,discipline_typesController.createDiscipline_Type);
router.get('/', discipline_typesController.getAllDisciplines_Types);
router.delete('/:id', discipline_typesController.deleteDiscipline_Type);
router.put('/:id',validateDisciplineType ,discipline_typesController.updateDiscipline_Type)

module.exports = router;