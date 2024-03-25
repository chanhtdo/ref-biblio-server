import { Router } from "express";

const glob = require("glob");

const extension = __dirname.includes("build") ? "js" : "ts";

const router = glob
  .sync(`**/*.${extension}`, { cwd: `${__dirname}/` })
  .map((filename: string) => require(`./${filename}`))
  .filter((router: Router) => Object.getPrototypeOf(router) == Router)
  .reduce(
    (rootRouter: Router, router: Router) => rootRouter.use(router),
    Router({ mergeParams: true }),
  );

// console.log(glob.sync(`**/*.${extension}`, { cwd: `${__dirname}/` })); /* Uncomment to list spec file paths */

export default router;
