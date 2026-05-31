import { userModel } from "../models/user.model.js";
import { postModel } from "./../models/post.model.js";

export const createPost = async (req, res) => {
  try {
    const { content, image } = req.body;
    const author = req.user._id;

    if (!content) {
      return res.status(400).json({ message: "Content not provided" });
    }

    const post = new postModel({ content, image, author });
    await post.save();

    return res.status(201).json({
      message: "Post created successfully",
      post: {
        _id: post._id,
        content: post.content,
        image: post.image,
        author: post.author,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await postModel.findById(postId);

    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await postModel.findByIdAndDelete(postId);
    return res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await postModel
      .find()
      .populate("author", "username profilePic")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      posts,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getFeed = async (req, res) => {
  try {
    const userId = req.user._id;
    const currentUser = await userModel.findById(userId);

    const followingArray = currentUser.following;
    const allPosts = await postModel
      .find({
        author: { $in: [...followingArray, userId] },
      })
      .sort({ createdAt: -1 })
      .populate("author", "username profilePic");

    return res.status(200).json({ posts: allPosts });
  } catch (error) {
    console.log(error);
  }
};
