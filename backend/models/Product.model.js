const  mongoose=require('mongoose');

const ProductSchema=mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter product Name"],
        trim: true,
      },
      description: {
        type: String,
        required: [true, "Please Enter product Description"],
      },
      price: {
        type: Number,
        required: [true, "Please Enter product Price"],
        maxLength: [8, "Price cannot exceed 8 characters"],
      },
      ratings: {
        type: Number,
        default: 0,
      },
      images: [
      {
         image:{
            type: String,
            required: true,
         
        }
      }
      ],
      categoryId: {
        type: mongoose.Types.ObjectId,
        required: [true, "Please Enter Product Category"],
        ref:'Category'
      },
      Stock: {
        type: Number,
        required: [true, "Please Enter product Stock"],
        maxLength: [4, "Stock cannot exceed 4 characters"],
        default: 1,
      },
      numOfReviews: {
        type: Number,
        default: 0,
      },
      reviews: [
        {
          userId: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
          },
          rating: {
            type: Number,
            required: true,
          },
          comment: {
            type: String,
            required: true,
          },
        },
      ],
    
      user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
},{
    timestamps:true
})

const ProductModel=mongoose.model('Product',ProductSchema);

module.exports={
    ProductModel
}