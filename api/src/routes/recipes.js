const {Router} = require ("express");
const {
    recipesHandler,
    recipesHandlerById,
    createRecipesHandler
} = require("../handlers/recipesHandler")

const recipeRouter = Router();

recipeRouter.get("/", recipesHandler);
recipeRouter.get("/:id", recipesHandlerById);
recipeRouter.post("/", createRecipesHandler);


module.exports = recipeRouter;