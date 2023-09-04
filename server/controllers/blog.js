const slugify = require("slugify");
const Boxes = require("../models/box");
const { v4: uuidv4 } = require("uuid");

exports.create = (req, res) => {
  const { title, content, author, image } = req.body;
  let slug = slugify(title);

  if (!slug) {
    slug = uuidv4();
  }

  if (!title) {
    return res.status(400).json({ error: "title!" });
  } else if (!content) {
    return res.status(400).json({ error: "content!" });
  } else if (!image) {
    return res.status(400).json({ error: "image!" });
  }

  Boxes.create({ title, content, author, image, slug })
    .then((blog) => res.json(blog))
    .catch((error) => res.status(400).json({ error: "ERROR!" }));
};

exports.getAllBoxes = (req, res) => {
  Boxes.find({})
    .exec()
    .then((blogs) => res.json(blogs))
    .catch((err) => {
      res.status(500).json({ error: "Error fetching blogs" });
    });
};

exports.singleBlog = (req, res) => {
  const { slug } = req.params;
  Boxes.findOne({ slug })
    .exec()
    .then((this_box) => {
      if (!this_box) {
        return res.status(404).json({ error: "Box not found" });
      }
      res.json(this_box);
    })
    .catch((err) => {
      res.status(500).json({ error: "Error fetching this box" });
    });
};

exports.remove = (req, res) => {
  const { slug } = req.params;
  Boxes.findOneAndDelete({ slug })
    .exec()
    .then((box) => {
      if (!box) {
        return res.status(400).json({ error: "not found!" });
      }
      res.json({
        message: "delete success",
      });
    })
    .catch(() => {
      res.status(500).json({ error: "remove failed" });
    });
};

exports.updatePost = (req, res) => {
  const { slug } = req.params;
  const { title, content, author, image } = req.body;

  Boxes.findOneAndUpdate(
    { slug },
    { title, content, author, image },
    { new: true }
  )
    .exec()
    .then((response) => {
      if (!response) {
        return res.status(400).json({ error: "not found!" });
      }
      res.json(response);
    })
    .catch((err) => res.status(400).json({ error: "not found" }));
};
