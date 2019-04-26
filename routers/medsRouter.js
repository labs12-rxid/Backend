const medsRouter = require("express").Router();

const Meds = require("../data/helpers/meds-model");

medsRouter.get("/", async (req, res) => {
  try {
    const meds = await Meds.findMeds();
    res.status(200).json(meds);
  } catch (error) {
    res.status(500).json(error);
  }
});

medsRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const med = await Meds.findMedById(id);
    if (med) {
      res.status(200).json(med);
    } else {
      res
        .status(404)
        .json({ message: "User with specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = medsRouter;
