import { HttpStatusCode } from "http";
import { CatchAsyncError } from "../Middlewares/CatchAsyncError.js";
import Message from "../Models/message.model.js";
import User from "../Models/user.model.js";
import cloudinary from "../cloudinary/Cloudinary.js";
import getReceiverSocketId, { io } from "../lib/socket.js";
import ErrorHandler from "../Middlewares/ErrorMiddlewares.js";

export const GetUserForSidebar = CatchAsyncError(async (req, res, next) => {
  const loggedInUserId = req.user._id;
  const listUser = await User.find({ _id: { $ne: loggedInUserId } }).select(
    "-password"
  );
  res.status(200).json(listUser);
});

export const GetMessage = CatchAsyncError(async (req, res, next) => {
  const { id: receiverId } = req.params;
  if (!receiverId)
    return next(new ErrorHandler("Receiver ID  is required!", 400));
  const { _id: senderId } = req.user;
  const listMessage = await Message.find({
    $or: [
      { receiverId, senderId },
      { receiverId: senderId, senderId: receiverId },
    ],
  });
  if (!listMessage)
    return next(new ErrorHandler("Message Not Found with that ID", 404));
  res.status(HttpStatusCode.Accepted).json(listMessage);
});

export const SendMessage = CatchAsyncError(async (req, res, next) => {
  const { id: receiverId } = req.params;
  const { text = "", image = "" } = req.body;
  const { _id: senderId } = req.user;
  let imageURL = "";
  if (image) {
    const uploadResponse = await cloudinary.uploader.upload(image);
    imageURL = uploadResponse.secure_url;
  }
  const newMessage = await Message.create({
    senderId,
    receiverId,
    text,
    image: imageURL,
  });

  const recSocketId = getReceiverSocketId(receiverId);
  console.log("recSocketId: ", recSocketId);
  if (recSocketId) io.to(recSocketId).emit("newMessage", newMessage);

  res.status(200).json(newMessage);
});
