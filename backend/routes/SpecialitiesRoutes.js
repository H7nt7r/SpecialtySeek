const express = require('express');
const router = express.Router();
const specialityController = require('../controllers/specialityController');

const authenicate = require('../error/authenicate_manager');
const { validateSpecialities } = require('../middle/specialityShema');

router.get('/:id', specialityController.getSpecialityById);

router.get('/', (req, res, next) => {
    if(req.query.disciplines) {
        return specialityController.getSpecialityByDisciplines(req, res, next);
    }
    return specialityController.getAllSpecialities(req, res, next);
});

router.get('/withFaculties', specialityController.getAllSpecialitiesWithFaculties); // Новый маршрут для получения специальностей с факультетами

router.post('/', authenicate, validateSpecialities, specialityController.createSpeciality);
router.put('/:id', authenicate, validateSpecialities, specialityController.updateSpeciality);
router.delete('/:id', authenicate, specialityController.deleteSpeciality);

module.exports = router;
