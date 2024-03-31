import * as Joi from "joi";

const paramsSchema = Joi.object({
  value: Joi.string().trim().invalid("").required(),
});

const schema = { paramsSchema };

export default schema;
