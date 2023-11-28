const OrderRouter=require("express").Router();

const { AllOrders, GetSingleOrder, UpdateorderStatus, DeleteOrder, CreateOrder,  GetUserOrder } = require("../controllers/Order.Controller");
const {Authentication}=require("../middlewares/Authenitcation");


OrderRouter.route("/order").post(Authentication,CreateOrder).get(Authentication,AllOrders);
OrderRouter.route("/order/:id").get(Authentication,GetSingleOrder).patch(Authentication,UpdateorderStatus).delete(Authentication,DeleteOrder);
OrderRouter.route("/order/User/me").get(Authentication,GetUserOrder);

module.exports={
    OrderRouter
}