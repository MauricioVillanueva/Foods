const { Router } = require('express');
const recipeRouter = require("./recipes.js");
const dietRouter = require("./diets.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const mainRouter = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

mainRouter.use("/recipes", recipeRouter);
mainRouter.use("/diets", dietRouter);



module.exports = mainRouter;