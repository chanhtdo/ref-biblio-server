import * as Joi from "joi";

const paramsSchema = Joi.object({
  id: Joi.number().integer().min(1).required(),
});

const bodySchema = Joi.object({
  firstName: Joi.string().trim().invalid("").required(),
  middleName: Joi.string().trim().invalid("").optional(),
  lastName: Joi.string().trim().invalid("").required(),
  affiliations: Joi.array().items(Joi.string().trim().invalid("").required()).optional(),
  email: Joi.string().email().optional(),
  researchFields: Joi.array().items(Joi.string().trim().invalid("").required()).optional(),
});

const schema = { paramsSchema, bodySchema };

export default schema;
