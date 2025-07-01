
const PostSchema = require("../models/post.js");


const getPosts = async (req, res) => {
  try {
    const posts = await PostSchema.find();
    res.status(200).json(posts);
  } catch (error) {
    console.log("GetPosts hatası:", error);
    return res.status(500).json({ msg: error.message });
  }
}

const createPost = async (req, res) => {
  try {
    const newpost = await PostSchema.create(req.body);
    res.status(201).json(newpost);
  } catch (error) {
    console.log("CreatePost hatası:", error);
    return res.status(500).json({ msg: error.message });
  }
}

const updatePost = async (req, res) => {
  try {
    const {id} = req.params;
    const update = await PostSchema.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(update);
  } catch (error) {
    console.log("UpdatePost hatası:", error);
    return res.status(500).json({ msg: error.message });
  }
}

const deletePost = async (req, res) => {
  try {
    const {id} = req.params;

    await PostSchema.findByIdAndDelete(id);
    res.status(200).json({ msg: "Silme işlemi başarılı!" });
  } catch (error) {
    console.log("DeletePost hatası:", error);
    return res.status(500).json({ msg: error.message });
  }
}

module.exports = {
  getPosts,
  createPost,
  updatePost,
  deletePost
};