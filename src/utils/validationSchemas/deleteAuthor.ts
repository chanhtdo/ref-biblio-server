import * as Joi from "joi";

const paramsSchema = Joi.object({
  id: Joi.number().integer().min(1).required(),
});

const schema = { paramsSchema };

export default schema;
