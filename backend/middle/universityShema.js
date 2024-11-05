const Joi = require('joi');

const UniversitySchema = Joi.object({
 
  name: Joi.string().required(),
  desc: Joi.string().required(),
  img: Joi.string().required(),
  user_id: Joi.string().required(),
  createdAt: Joi.date().allow(null),
  updatedAt: Joi.date().allow(null)
});

const validateUniversity = (UniversitySchema) => (req,res,next) => {
    const {error} = UniversitySchema.validate(req.body, {
        abortEarly: false
    });
    if(error){
        next(error);
    } else {
        next();
    }
}

exports.validateUniversity = validateUniversity(UniversitySchema);
