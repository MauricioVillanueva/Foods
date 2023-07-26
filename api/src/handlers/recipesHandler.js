const { 
  getAllRecipes,
 } = require("../controllers/recipesController");
const { Recipe, Diet } = require("../db.js");


const recipesHandler = async (req, res) => {
  try {
    let { name } = req.query;
    let recipes = [];
    if (name) {
      recipes = await getAllRecipes().then((data) =>
        data.filter((recipe) =>
          recipe.title.toLowerCase().includes(name.toLowerCase())
        )
      );
      if (recipes.length === 0) {
        return res.status(400).send("Recipe not found");
      } else {
        return res.status(200).json(recipes);
      }
    } else {
      recipes = await getAllRecipes();
      return res.status(200).json(recipes);
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const recipesHandlerById = async (req, res) => {
    let id  = req.params.id;
    const recipesTotal = await getAllRecipes();
    if(id){
      let recipeId = await recipesTotal.filter((el) => el.id == id)
      recipeId.length?
      res.status(200).json(recipeId) :
      res.status(400).json('Recipe not found.');
    }
};
const createRecipesHandler = async (req,res) => {
  try {
      const {
        title, 
        image, 
        summary, 
        healthScore, 
        steps, 
        diets, 
        createInDb
      } = req.body;

      let recipe = await Recipe.create({
        title, 
        image, 
        summary, 
        healthScore, 
        steps, 
        createInDb});

      let dietDB = await Diet.findAll({
            where: { name: diets },
          });
          
      await recipe.addDiets(dietDB);
      return res.status(200).send('Recipe created successfully.');
  } catch (error) {
      res.status(400).json({ error: error.message })
  }
};


module.exports = {
  recipesHandler,
  recipesHandlerById,
  createRecipesHandler
}