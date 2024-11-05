const Joi = require('joi');

const DisciplineSchema = Joi.object({
 
  name: Joi.string().required(),
  user_id: Joi.number().integer().required(),
  createdAt: Joi.date().allow(null),
  updatedAt: Joi.date().allow(null)
});

const validateDiscipline = (DisciplineSchema) => (req,res,next) => {
    const {error} = DisciplineSchema.validate(req.body, {
        abortEarly: false
    });
    if(error){
        next(error);
    } else {
        next();
    }
}

exports.validateDiscipline = validateDiscipline(DisciplineSchema);
