const express = require("express");
const router = express.Router();
const {
  getAllBoxes,
  create,
  singleBlog,
  remove,
  updatePost,
} = require("../controllers/blog");
const { requireLogin } = require("../controllers/authController");

router.post("/create", requireLogin, create);

router.get("/boxes", getAllBoxes);

router.get("/box/:slug", singleBlog);
router.delete("/box/:slug", requireLogin, remove);
router.put("/box/edit/:slug", requireLogin, updatePost);

module.exports = router;
