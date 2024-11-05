const Speciality = require('../models/Specialties');
const DisciplineTypes = require('../models/Discipline_types');
const Discipline = require('../models/Disciplines');
const { Sequelize } = require('sequelize');

const createSpeciality = async(specialityData) => {
	const speciality = await Speciality.create(specialityData);
	return speciality;
};

const getSpecialityById = async (specialityId) => {
  const speciality = await Speciality.findByPk(specialityId);
  return speciality;
};

const updateSpeciality = async (specialityId, specialityData) => {
  const speciality = await Speciality.findByPk(specialityId);
  await speciality.update(specialityData);
  return speciality;
};

const deleteSpeciality = async (specialityId) => {
  const speciality = await Speciality.findByPk(specialityId);
  await speciality.destroy();
};

const getAllSpecialities = async () => {
  const speciality = await Speciality.findAll();
  return speciality;
};

const getSpecialityByDisciplines = async (disciplineList) => {
  const disciplineNames = disciplineList;
    const specialities = await Speciality.findAll({
      // attributes: ['id', 'name'],
      include: [
        {
          model: DisciplineTypes,
          attributes: [],
          include: [
            {
              model: Discipline,
              attributes: [],
              where: {
                name: disciplineNames
              }
            }
          ]
        }
      ],
      group: ['specialties.id', 'specialties.name'],
      having: Sequelize.literal(`COUNT(DISTINCT "discipline_types->discipline"."name") = ${disciplineList.length}`)
    });
    return specialities;
};



module.exports = {
  createSpeciality,
  getSpecialityById,
  updateSpeciality,
  deleteSpeciality,
  getAllSpecialities,
  getSpecialityByDisciplines
};
