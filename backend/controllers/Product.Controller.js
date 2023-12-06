const AsyncerrorHandler = require("../middlewares/AsyncerrorHandler");
const { ProductModel } = require("../models/Product.model");
const { ErrorHandler } = require("../utils/Error.Handler");



exports.CreateProduct = AsyncerrorHandler(async (req, res, next) => {
  let { role } = req.body;
  if (role != "admin") {
    return next(
      new ErrorHandler(401, "you are not authorize for these routes")
    );
  }
  console.log("object");
  let images = [];
  if (req.files) {
    console.log(images, req.files);
    req.files.forEach((item) => images.push({ image: item.path }));
  }

  const { name, price, description, categoryId, stock, UserId } = req.body;
  const saveProduct = new ProductModel({
    name,
    price,
    description,
    categoryId,
    stock,
    user: UserId,
    images,
  });
  await saveProduct.save();
  return res.status(201).send({
    sucess: true,
    msg: "product has been added",
    data: saveProduct,
  });
});

exports.GetAllProduct = AsyncerrorHandler(async (req, res, next) => {
  const page=req.query.page ? req.query.page :1;
  const limit=req.query.limit ? req.query.limit :3;
  const productCount=await ProductModel.countDocuments()
  const options = {
    limit: parseInt(limit),
    skip: (parseInt(page) - 1) * parseInt(limit)
};
let query ={}
if(req.query.search!='null'&&req.query.search!=""&&req.query.search!="undefined"){
   query = {name: { $regex: new RegExp(req.query.search, 'i') } }
}
   if(req.query.minPrice!="undefined" && req.query.maxPrice!="undefined"){
  query={
    price:{
      $gte:req.query.minPrice ? req.query.minPrice : 0,
      $lte:req.query.maxPrice  ,
    }
  }
}
  if(req.query.ratings!="" && req.query.ratings!="undefined"){
  query={
    ratings:{
      $gte:Number(req.query.ratings)
    }
  }
}
  if(req.query.filter!=""&&req.query.filter!="undefined"){
  query={
    categoryId:req.query.filter
  }
}
console.log("objectofQuery",req.query);
console.log("objectofPrice",query);

const result = await ProductModel.find(query,null, options).populate("categoryId","name");
// console.log("result",result);
  res.status(200).json({
    success: true,
    data:result,
    productCount,
    resultPerPage:limit,
    filteredProductsCount:result.length,
  });
});

exports.updateParticularProduct = AsyncerrorHandler(async (req, res, next) => {
  let { role } = req.body;
  if (role != "admin") {
    return next(
      new ErrorHandler(401, "you are not authorize for these routes")
    );
  }
  const { name, price, description, categoryId, Stock } = req.body;
  let images = [];
  if (req.files) {
    req.files.forEach((item) => images.push({ image: item.path }));
  }

  const findData = await ProductModel.findOne({ _id: req.params.id });
  if (!findData) {
    return next(new ErrorHandler(404, "Product does not exist to update"));
  }
  const updatedImages = [...images, ...findData.images];

  const updateData = {
    name: name || findData.name,
    price: Number(price) || findData.price,
    description: description || findData.description,
    categoryId: categoryId || findData.categoryId,
    Stock: Number(Stock) || findData.Stock,
    images: updatedImages,
  };
  console.log("updatedData",req.body,updateData);


  const UpdateProducts = await ProductModel.findByIdAndUpdate(
    { _id: req.params.id },
    updateData,
    { new: true }
  ).populate("categoryId", "name");
  return res.status(200).send({
    sucess: true,
    msg: "product has been updated",
    data: UpdateProducts,
  });
});

exports.GetAdminAllProduct = AsyncerrorHandler(async (req, res, next) => {
  let { role } = req.body;
  if (role != "admin") {
    return next(
      new ErrorHandler(401, "you are not authorize for these routes")
    );
  }
  

  const findData = await ProductModel.find().populate("categoryId", "name");;
  if (findData.length==0) {
    return next(new ErrorHandler(404, "Product does not exist to update"));
  }
  return res.status(200).send({
    sucess: true,
    msg: "product has been updated",
    data: findData,
  });
});
exports.GetParticularProduct = AsyncerrorHandler(async (req, res, next) => {

  const findData = await ProductModel.findOne({ _id: req.params.id }).populate(
    "categoryId",
    "name"
  ).populate(
    "reviews.userId",
    "name avatar"
  );
  if (!findData) {
    return next(new ErrorHandler(404, "Product does not exist to update"));
  }
  return res.status(200).send({
    sucess: true,
    msg: "product has been updated",
    data: findData,
  });
});

exports.DeleteparticularProduct = AsyncerrorHandler(async (req, res, next) => {
  let { role } = req.body;
  if (role != "admin") {
    return next(
      new ErrorHandler(401, "you are not authorize for these routes")
    );
  }
  const findData = await ProductModel.findOne({ _id: req.params.id });
  if (!findData) {
    return next(new ErrorHandler(404, "Product does not exist to update"));
  }
  await ProductModel.findByIdAndDelete({ _id: req.params.id });
  return res.status(200).send({
    sucess: true,
    msg: "product has been deleted",
  });
});

exports.CreateReviews = AsyncerrorHandler(async (req, res, next) => {
  const { UserId, rating, comment, productId } = req.body;
  const findProduct = await ProductModel.findOne({ _id: productId });
  if (!findProduct) {
    return next(new ErrorHandler(404, "Product does not exist to update"));
  } 
  else {
    
    const findUserExistingReview = await ProductModel.findOne({
      _id: productId,
      "reviews": {
        $elemMatch: { userId: UserId }
      }
    });

    if (findUserExistingReview) {
   
      let CalculateRatings = 0;
      findProduct.reviews.forEach((item) => {
        CalculateRatings += Number(item.rating);
      });
      const FindUserExistRating=findProduct.reviews.filter((item)=>item.userId==UserId);
     
      const AverageRating =
        (CalculateRatings + Number(rating)-Number(FindUserExistRating[0]?.rating)) / (findProduct.reviews.length );
        console.log("objectOfCalculated",AverageRating);
      const updateReviews = await ProductModel.findOneAndUpdate(
        {
          _id: productId,
          "reviews.userId": UserId
        },
        {
          $set: {
            "reviews.$.rating": rating,
            "reviews.$.comment": comment,
            ratings: AverageRating
          }
        },
        { new: true }
      );
      console.log("ofUpdated",findUserExistingReview)
      return res.status(201).send({
        success: true,
        msg: "Review has been updated",
        data: updateReviews,
      });
    }
     else {
      let CalculateRatings = 0;
      findProduct.reviews.forEach((item) => {
        CalculateRatings += Number(item.rating);
      });
     
      const AverageRating =
        (CalculateRatings + Number(rating)) / (findProduct.reviews.length + 1);

      const updatedData = {
        rating,
        comment,
        userId: UserId,
      };
   
      const AddReview = await ProductModel.findByIdAndUpdate(
        { _id: productId },
        {
          $push: { reviews: updatedData },
          $inc: { numOfReviews: 1 },
          $set: { ratings: AverageRating },
        },
        { new: true }
      );
      return res.status(201).send({
        sucess: true,
        msg: "reviews has been Added",
        data: AddReview,
      });
    }
  }
});

exports.DeleteParticularProductImages = AsyncerrorHandler(
  async (req, res, next) => {
    let { role } = req.body;
    if (role != "admin") {
      return next(
        new ErrorHandler(401, "you are not authorize for these routes")
      );
    }
    let { ImageId } = req.body;
    const findProductImage = await ProductModel.findOne({
      _id: req.params.id,
      "images._id": ImageId,
    },{
      images: { $elemMatch: { _id: ImageId } },
    });
    if (!findProductImage) {
      return next(new ErrorHandler(404, "This image Id does not exist"));
    }
    console.log("object",findProductImage);
    const updateImageArray = await ProductModel.findOneAndUpdate(
      { _id: req.params.id, "images._id": ImageId },
      {
        $pull: {images:{ _id: ImageId }},
      },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      msg: "Image has been deleted",
      data: updateImageArray,
    });
  }
);

exports.deleteReviews = AsyncerrorHandler(async (req, res, next) => {
  const { id, productId } = req.params;
  let { role } = req.body;
  if (role != "admin") {
    return next(
      new ErrorHandler(401, "you are not authorize for these routes")
    );
  }
  const FindProductReview = await ProductModel.findOne(
    {
      _id: productId,
      "reviews": {
        $elemMatch: { _id:id }
      },
    }
  );
  if (!FindProductReview) {
    return next(new ErrorHandler(404, "User Review Does not exist"));
  }
  const FindReview = await ProductModel.findOne({
    _id: productId,
  });

  let CalculateRatings = 0;
  FindReview.reviews.forEach((item) => {
    CalculateRatings += Number(item.rating);
  });
  const FindUserExistRating=FindReview.reviews.filter((item)=>item._id==id);

  let AverageRating =
    (CalculateRatings - FindUserExistRating?.[0].rating) /
    (FindReview.reviews.length - 1);
  if (FindReview.reviews.length - 1 == 0) {
    AverageRating = 0;
  }
console.log(CalculateRatings,AverageRating);
  const updateReviews = await ProductModel.findOneAndUpdate(
    {
      _id: productId,
      "reviews._id": id,
    },
    {
      $set: { ratings: AverageRating },
      $inc: { numOfReviews: -1 },
      $pull: { reviews: { _id: id } },
    },
    { new: true }
  );
  // const updateData = await ProductModel.findOneAndUpdate(
  //   {
  //     _id: productId,
  //     "reviews.userId": id,
  //   },
  //   {
  //     $pull: { reviews: { userId: id } },
  //   },
  //   { new: true }
  // );
  return res.status(200).send({
    sucess: true,
    msg: "user review has been deleted",
    data:  updateReviews,
  });
});

exports.GetParticularUserReviews = AsyncerrorHandler(async (req, res, next) => {
  const { id, productId } = req.params;
  let { role } = req.body;
  if (role != "admin") {
    return next(
      new ErrorHandler(401, "you are not authorize for these routes")
    );
  }
  const FindProductReview = await ProductModel.findOne(
    {
        _id: productId,
        "reviews.userId": id,
    },
    {
        name: 1,
        description: 1,
        price: 1,
        ratings: 1,
        images: 1,
        stock: 1,
        numOfReviews: 1,
        reviews: { $elemMatch: { userId: id } }, 
    }
).populate("categoryId", "name");

  if (!FindProductReview) {
    return next(new ErrorHandler(404, "User Review Does not exist"));
  }
  return res.status(200).send({
    sucess: true,
    msg: "Particular user review",
    data: FindProductReview,
  });
});

exports.ProdcutAllReviews = AsyncerrorHandler(async (req, res, next) => {
  const findData = await ProductModel.findOne({ _id: req.params.id }).populate(
    "categoryId",
    "name"
  ).populate(
    "reviews.userId",
    "name avatar"
  );
  if (!findData) {
    return next(new ErrorHandler(404, "Product reviews does not exist to update"));
  }
  return res.status(200).send({
    sucess: true,
    msg: "product all reviews",
    data: findData,
  });
});
