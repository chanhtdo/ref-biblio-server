import { get, has, map } from "lodash";
import { Request, Response, NextFunction } from "express";
import { ErrorType } from "ts/enums/errors";
import { HTTPVerbs } from "ts/enums/httpVerbs";

/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const Schemas = require("utils/validationSchemas/index");

const validate = (paramType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    let options = {
      abortEarly: false, // abort after the last validation error
      allowUnknown: true, // allow unknown keys that will be ignored
      stripUnknown: true, // remove unknown keys from the validated data
    };

    const route = req.route.path;
    const method = Object.keys(req.route.methods)
      .find((k) => req.route.methods[k] === true)
      .toUpperCase();

    if (!has(Schemas, route)) {
      return next(
        `Error: no schemas found for route ${route}. Please ensure it is imported in /utils/validationSchemas/index.ts.`,
      );
    }

    // Get schema for the current route/method and desired parameter type
    const routeSchemas = get(Schemas, route);

    let schema;
    if (Object.keys(routeSchemas).some((e) => Object.keys(HTTPVerbs).includes(e))) {
      schema = routeSchemas[method][`${paramType}Schema`];
    } else {
      schema = routeSchemas[`${paramType}Schema`];
    }

    if (!schema) {
      return next(
        `Error: no schema found for type ${paramType} in "${method} ${route}". Please ensure it is imported in /utils/validationSchemas/index.ts.`,
      );
    }

    // Not allowed unknow values for Licences management
    if (route === "/api/v1/licences/periods/active" || route === "/api/v1/licences/periods") {
      options = {
        abortEarly: false,
        allowUnknown: false,
        stripUnknown: false,
      };
    }
    // Validate req[paramType] using the schema and validation options
    schema
      .validateAsync(req[paramType], options)
      .then((data) => {
        // Replace req[paramType] with the data after Joi validation
        req[paramType] = data;

        return next();
      })
      .catch((err) => {
        const validationErrors = {
          type: ErrorType.BadRequest,
          details: map(err.details, ({ message, type }) => ({
            message: message.replace(/['"]/g, ""),
            source: paramType,
            rule: type,
          })),
        };
        console.error(validationErrors);

        return res.status(400).json(validationErrors);
      });
  };
};

export const validateBody = validate("body");
export const validateParams = validate("params");
export const validateQuery = validate("query");

// Help: https://www.digitalocean.com/community/tutorials/how-to-use-joi-for-node-api-schema-validation
// @Todo: ideally the the parameters of the validate() function should be (paramType, method, options) for full customization in each route
