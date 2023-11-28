const { PaymentProcess, GetStripeCred } = require("../controllers/Payment.Controller");
const { Authentication } = require("../middlewares/Authenitcation");

const PaymentRouter=require("express").Router();


PaymentRouter.route("/payment/stripe").post(Authentication,PaymentProcess).get(Authentication,GetStripeCred);


module.exports={
    PaymentRouter
}