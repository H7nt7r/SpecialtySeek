const Joi = require('joi');

const SpecialitySchema = Joi.object({
 
  name: Joi.string().required(),
  faculty_id: Joi.number().integer().required(),
  desc: Joi.string().required(),
  img: Joi.string().required(),
  createdAt: Joi.date().allow(null),
  updatedAt: Joi.date().allow(null)
});

const validateSpeciality = (SpecialitySchema) => (req,res,next) => {
    const {error} = SpecialitySchema.validate(req.body, {
        abortEarly: false
    });
    if(error){
        next(error);
    } else {
        next();
    }
}

exports.validateSpecialities = validateSpeciality(SpecialitySchema);