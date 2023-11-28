const CategoryRouter=require("express").Router();

const { AddCategory, GetAllCategory, UpdateCategory, deleteCategory } = require("../controllers/Category.Controller");
const {Authentication}=require("../middlewares/Authenitcation");



CategoryRouter.route("/admin/Category/add").post(Authentication,AddCategory);
CategoryRouter.route("/Category/getAll").get(GetAllCategory);
CategoryRouter.route("/admin/Category/:id").patch(Authentication,UpdateCategory).delete(Authentication,deleteCategory);

module.exports={
    CategoryRouter
}
