const  mongoose=require('mongoose');

const CategorySchema=mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Category Name"],
        trim: true,
      }    
},{
    timestamps:true
})

const CategoryModel=mongoose.model('Category',CategorySchema);

module.exports={
    CategoryModel
}