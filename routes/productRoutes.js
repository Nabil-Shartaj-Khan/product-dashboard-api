const { ensureAuth } = require("../auth");
const {
  createProduct,
  getProduct,
  getProductbyId,
  updateProductbyId,
  deleteProductbyId,
} = require("../controllers/productController");

const router = require("express").Router();

router.post("/", ensureAuth, createProduct);
router.get("/", getProduct);
router.get("/:id", getProductbyId);
router.put("/:id", ensureAuth, updateProductbyId);
router.delete("/:id", ensureAuth, deleteProductbyId);

module.exports = router;
