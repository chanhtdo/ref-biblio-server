import * as Joi from "joi";

const querySchema = Joi.object({
  search: Joi.string().optional(),
  limit: Joi.number().integer().min(1).max(30).optional().default(30),
  page: Joi.number().integer().min(1).optional().default(1),
});

const schema = { querySchema };

export default schema;
