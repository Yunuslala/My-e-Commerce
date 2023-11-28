const CartRouter=require("express").Router();

const {createCart, getUserCartData, finalUpdatedQuantity, removeFromCart } = require("../controllers/Cart.Controller");
const {Authentication}=require("../middlewares/Authenitcation");


CartRouter.route("/User/Cart").post(Authentication,createCart).get(Authentication,getUserCartData).put(Authentication,finalUpdatedQuantity).patch(Authentication,removeFromCart);


module.exports={
    CartRouter
}