const  {RegisterUser,loginUser,updatePassword,updateProfile,resetPassword,getAllUser, getSingleUser, updateUserRole, deleteUser,MyProfile, forgotPassword}=require("../controllers/User.Controller");
const express=require("express");
const UserRouter=express.Router();
const {Authentication}=require("../middlewares/Authenitcation");

var multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dofqdjya8",
  api_key: "416125953541235",
  api_secret: "MeZYxFvPOzS51ACsECtVyewfOFI",
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "E-Commerce/images/Profiles",
    allowed_formats: [
      "jpg",
      "avif",
      "webp",
      "jpeg",
      "png",
      "PNG",
      "xlsx",
      "xls",
      "pdf",
      "PDF",
    ],
  },
});
const upload = multer({ storage: storage });
UserRouter.route("/User/register").post(upload.single('profile'),RegisterUser);
UserRouter.route("/User/login").post(loginUser);
UserRouter.route("/User/update-password").patch(Authentication,updatePassword);
UserRouter.route("/User/update-profile").patch(upload.single('profile'),Authentication,updateProfile);
UserRouter.route("/User/Alluser").get(Authentication,getAllUser);
UserRouter.route("/User/profile").get(Authentication,MyProfile);
UserRouter.route("/User/SingleUser/:id").get(Authentication,getSingleUser);
UserRouter.route("/User/update-role/:id").patch(Authentication,updateUserRole);
UserRouter.route("/User/deleteUser/:id").delete(Authentication,deleteUser);
UserRouter.route("/User/forget/password").patch(forgotPassword);
UserRouter.route("/User/reset/password").patch(resetPassword);


module.exports={
    UserRouter
}