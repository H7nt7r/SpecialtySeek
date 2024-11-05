const Joi = require('joi');

const RequestSchema = Joi.object({
  name_university: Joi.string().allow(null),
  desc:Joi.string().allow(null),
  img: Joi.string().allow(null),
  telephone: Joi.string().allow(null),
  user_id: Joi.string().allow(null),
  createdAt: Joi.date().allow(null),
  updatedAt: Joi.date().allow(null)
});

const validateRequest = (RequestSchema) => (req,res,next) => {
    const {error} = RequestSchema.validate(req.body, {
        abortEarly: false
    });
    if(error){
        next(error);
    } else {
        next();
    }
}



exports.validateRequest = validateRequest(RequestSchema);
