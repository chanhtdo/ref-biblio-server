import * as Joi from "joi";

const bodySchema = Joi.object({
  title: Joi.string().trim().invalid("").required(),
  description: Joi.string().trim().invalid("").required(),
  scientific_journal: Joi.string().trim().invalid("").required(),
  year: Joi.number().integer().min(1).required(),
  link: Joi.string().trim().invalid("").required(),
  authorIds: Joi.array().items(Joi.number().min(1).required()).optional(),
  labels: Joi.array().items(Joi.string().trim().invalid("").required()).optional(),
});

const schema = { bodySchema };

export default schema;
