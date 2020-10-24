const express = require("express")
const router = express.Router()
const controller = require("../controllers/musicasController")
 

router.get("/", controller.getAllMusics)
router.post("/", controller.createMusic)
router.get("/:id", controller.getMusic)
router.put("/:id", controller.updateMusic)
router.patch("/:id/favorited", controller.updateFavoritedStatus)
router.delete("/:id", controller.deleteMusic)
  
module.exports = router;