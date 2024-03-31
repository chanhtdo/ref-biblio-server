import * as Joi from "joi";

const bodySchema = Joi.object({
  value: Joi.string().trim().invalid("").required(),
});

const schema = { bodySchema };

export default schema;
