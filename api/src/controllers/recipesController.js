const axios = require("axios");
const { Recipe, Diet } = require("../db.js");
require("dotenv").config();

const getRecipe = async () => {
  try {
    const response = await axios.get(`${process.env.API}`);
    const results = response.data.results.map(recipe => ({
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      summary: recipe.summary.replace(/<[^>]+>/g, ""),
      healthScore: recipe.healthScore,
      steps: recipe.analyzedInstructions[0]?.steps?.map(step => step.step) || [],
      diets: recipe.diets.map((diet) => diet),
      createdInDb: recipe.createdInDb
    }));
    return results;
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const getDb = async () => {
  try {
    const recipeDb = await Recipe.findAll({
      include: {
        model: Diet,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      }
    });
    return recipeDb;
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const getAllRecipes = async () => {
  try {
    const api = await getRecipe();
    const db = await getDb();
    const allRecipes = api.concat(db);
    return allRecipes;
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message })
  }
};

const post = async (req, res) => {
  try {
    let { title, image, summary, healthScore, steps, diets, createInDb } = req.body;

    // if (!title || !image || !summary || !healthScore || !steps || !diets || createInDb === undefined) {
    //   return res.status(400).json({ error: "Missing required fields" });
    // }

    let newRecipe = await Recipe.create({
      title,
      image,
      summary,
      healthScore,
      steps,
      createInDb,
    });

    let dietDB = await Diet.findAll({
      where: { name: diets },
    });

    await newRecipe.addDiet(dietDB);
    res.send("Recipe is created");
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message })
  }
};

module.exports = {
  getAllRecipes,
  post
}