const Joi = require('joi');

const DisciplineTypeSchema = Joi.object({
  discipline_id: Joi.number().integer().required(),
  speciality_id: Joi.number().integer().required(),
  createdAt: Joi.date().allow(null),
  updatedAt: Joi.date().allow(null)
});

const validateDisciplineType = (DisciplineTypeSchema) => (req,res,next) => {
    const {error} = DisciplineTypeSchema.validate(req.body, {
        abortEarly: false
    });
    if(error){
        next(error);
    } else {
        next();
    }
}



exports.validateDisciplineType = validateDisciplineType(DisciplineTypeSchema);
