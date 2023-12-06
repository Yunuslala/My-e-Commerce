const productRouter=require("express").Router();

const {Authentication}=require("../middlewares/Authenitcation");

var multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { GetParticularProduct, updateParticularProduct, DeleteparticularProduct, GetParticularUserReviews, UpdateReviews, deleteReviews, CreateProduct, CreateReviews, GetAllProduct,DeleteParticularProductImages, GetAdminAllProduct, ProdcutAllReviews } = require("../controllers/Product.Controller");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dofqdjya8",
  api_key: "416125953541235",
  api_secret: "MeZYxFvPOzS51ACsECtVyewfOFI",
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "E-Commerce/images/Products",
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



productRouter.route("/admin/product/add").post(upload.array("images"),Authentication,CreateProduct);
productRouter.route("/product/getAll").get(GetAllProduct);
productRouter.route("/admin/product/:id").patch(upload.array("images"),Authentication,updateParticularProduct).get(GetParticularProduct).delete(Authentication,DeleteparticularProduct).put(Authentication,DeleteParticularProductImages);
productRouter.route("/product/add/reviews").post(Authentication,CreateReviews)
productRouter.route("/admin/product/reviews/:id/:productId").get(Authentication,GetParticularUserReviews).delete(Authentication,deleteReviews);
productRouter.route("/admin/all/product").get(Authentication,GetAdminAllProduct)
productRouter.route("/admin/product/allReviews/:id").get(Authentication,ProdcutAllReviews);


module.exports={
    productRouter
}