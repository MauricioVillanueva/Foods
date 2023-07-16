const {Router} = require ("express");
const {dietsHandler} = require("../handlers/dietsHandler")

const dietRouter = Router();

dietRouter.get("/", dietsHandler);

module.exports = dietRouter;