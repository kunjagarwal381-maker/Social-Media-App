import { userModel } from "./../models/user.model.js";

export const followUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const currentUserId = req.user._id;

    const userToFollow = await userModel.findById(userId);
    const isFollowing = userToFollow.followers.includes(currentUserId);
    if (isFollowing) {
      return res.status(400).json({ message: "Already following" });
    }

    await userModel.findByIdAndUpdate(userId, {
      $push: { followers: currentUserId },
    });

    await userModel.findByIdAndUpdate(currentUserId, {
      $push: { following: userId },
    });

    return res.status(200).json({ message: "Successfully Followed" });
  } catch (error) {
    console.log(error);
  }
};

export const unfollowUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const currentUserId = req.user._id;

    const userToUnfollow = await userModel.findById(userId);
    const isFollowing = userToUnfollow.followers.includes(currentUserId);
    if (!isFollowing) {
      return res.status(400).json({ message: "User not following" });
    }

    await userModel.findByIdAndUpdate(userId, {
      $pull: { followers: currentUserId },
    });

    await userModel.findByIdAndUpdate(currentUserId, {
      $pull: { following: userId },
    });

    return res.status(200).json({ message: "Successfully Unfollowed" });
  } catch (error) {
    console.log(error);
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userModel.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      user: user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { username, bio, profilePic } = req.body;

    await userModel.findByIdAndUpdate(
      req.user._id,
      { username, bio, profilePic },
      { new: true },
    );

    const user = await userModel.findById(userId).select("-password");
    return res.status(200).json({
      user: user,
    });
  } catch (error) {
    console.log(error);
  }
};
