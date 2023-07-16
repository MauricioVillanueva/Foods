const axios = require("axios");
const { Diet } = require("../db");
require('dotenv').config();

const getApiDiets = async () => {
    const dietsApiResponse = await axios.get(process.env.API);
    const dietsSet = new Set();

    // if(dietsApiResponse[0].vegetarian){
    //   if(!dietas.includes('vegetarian'))dietas.push('vegetarian')
    // }

    dietsApiResponse.data.results.forEach((diet) => {
      diet.diets.forEach((d) => dietsSet.add(d));
    });

    if(!dietsSet.has('vegetarian'))dietsSet.add('vegetarian')

    const uniqueDiets = Array.from(dietsSet);

    for (const diet of uniqueDiets) {
      await Diet.findOrCreate({
        where: { name: diet },
      });
    }
    const allRecipes = await Diet.findAll();
    return allRecipes;
};

module.exports = { getApiDiets };