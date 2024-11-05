const Joi = require('joi');

const FacultySchema = Joi.object({
  name: Joi.string().required(),
  university_id: Joi.number().integer().required(),
  createdAt: Joi.date().allow(null),
  updatedAt: Joi.date().allow(null)
});

const validateFaculty = (FacultySchema) => (req,res,next) => {
    const {error} = FacultySchema.validate(req.body, {
        abortEarly: false
    });
    if(error){
        next(error);
    } else {
        next();
    }
}



exports.validateFaculty = validateFaculty(FacultySchema);
