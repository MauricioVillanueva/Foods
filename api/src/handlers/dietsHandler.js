const { getApiDiets } = require("../controllers/dietsController");

const dietsHandler = async (req, res) => {
    try {
      const dietsApi = await getApiDiets();
      res.status(200).send(dietsApi);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};

module.exports = {
  dietsHandler,
};