const AsyncerrorHandler = require("../middlewares/AsyncerrorHandler");
const OrderModel = require("../models/Order.Model");
const { ProductModel } = require("../models/Product.model");
const { ErrorHandler } = require("../utils/Error.Handler");
const {CartModel}=require("../models/Cart.Model")
module.exports = {
  CreateOrder: AsyncerrorHandler(async (req, res, next) => {
    const {
      shippingInfo,
      orderItems,
      UserId,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;
    const createOrder = new OrderModel({
      shippingInfo,
      orderItems,
      UserId,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
    });
    await createOrder.save();
    await CartModel.findOneAndUpdate({_id:orderItems.CartId},{isAddedInOrder:true})
    return res.status(201).send({
      sucess: true,
      msg: "Order has been created",
      data: createOrder,
    });
  }),
  GetSingleOrder: AsyncerrorHandler(async (req, res, next) => {
    const FindSingleOrder = await OrderModel.findOne({ _id: req.params.id })
    .populate({
      path: 'orderItems.CartId',
      populate: {
        path: 'items.productId',
        model: 'Product',
      },
    })
      .populate("UserId", "name email").exec();
    if (!FindSingleOrder) {
      return next(
        new ErrorHandler(404, "This Order is not valid Order does not exist")
      );
    }
    return res.status(200).send({
      sucess: true,
      msg: "Single Order Dispersed",
      data: FindSingleOrder,
    });
  }),
  UpdateorderStatus: AsyncerrorHandler(async (req, res, next) => {
    let { role } = req.body;
    if (role != "admin") {
      return next(
        new ErrorHandler(401, "you are not authorize for these routes")
      );
    }
    const FindSingleOrder = await OrderModel.findOne({ _id: req.params.id }) .populate({
      path: 'orderItems.CartId',
      populate: {
        path: 'items.productId',
        model: 'Product',
      },
    })
      .populate("UserId", "name email").exec();;
    if (!FindSingleOrder) {
      return next(new ErrorHandler(404, "Orders Does not exist"));
    }

    if (FindSingleOrder.orderStatus == "Delivered") {
      return next(new ErrorHandler(404, "order is already delivered"));
    }

    if (req.body.status === "Shipped") {
      FindSingleOrder.orderItems?.CartId?.items?.forEach(async (o) => {
        const findStock = await ProductModel.findOne({ _id: o.productId._id });
        const updatedStock = findStock.Stock - o.quantity;
        if (updatedStock < 0) {
          return next(new ErrorHandler(400, "Product is out of stock sorry"));
        }
        const UpdateProductStock = await ProductModel.findOneAndUpdate(
          { _id: o.productId },
          {
            $set: { Stock: updatedStock },
          }
        );
      });
      await OrderModel.findOneAndUpdate(
        { _id: req.params.id },
        { orderStatus: "Shipped" }
      );
      return res.status(201).send({
        sucess: 201,
        msg: "Order status has been updated to Shipped",
      });
    }
    if (req.body.status === "Delivered") {
      await OrderModel.findOneAndUpdate(
        { _id: req.params.id },
        { orderStatus: "Delivered", deliveredAt: Date.now() }
      );
      return res.status(201).send({
        sucess: 201,
        msg: "Order status has been updated to Delivered",
      });
    }
  }),
  DeleteOrder: AsyncerrorHandler(async (req, res, next) => {
    let { role } = req.body;
    if (role != "admin") {
      return next(
        new ErrorHandler(401, "you are not authorize for these routes")
      );
    }
    const FindSingleOrder = await OrderModel.findOne({ _id: req.params.id });
    if (!FindSingleOrder) {
      return next(new ErrorHandler(404, "Orders Does not exist"));
    }
    const DeleteOrderOfUser = await OrderModel.findOneAndDelete({
      _id: req.params.id,
    });
    return res.status(200).send({
      sucess: true,
      msg: "Order has been deleted",
    });
  }),
  AllOrders: AsyncerrorHandler(async (req, res, next) => {
    let { role } = req.body;
    if (role != "admin") {
      return next(
        new ErrorHandler(401, "you are not authorize for these routes")
      );
    }
    const FindSingleOrder = await OrderModel.find()
    .populate({
      path: 'orderItems.CartId',
      populate: {
        path: 'items.productId',
        model: 'Product',
      },
    }).populate("UserId", "name email").exec();
    if (!FindSingleOrder.length) {
      return next(new ErrorHandler(404, "Orders Does not exist"));
    }
    return res.status(200).send({
      sucess: true,
      msg: "All Orders",
      data: FindSingleOrder,
    });
  }),
  GetUserOrder: AsyncerrorHandler(async (req, res, next) => {
    console.log("objectof",req.body.UserId);
    const FindSingleOrder = await OrderModel.find({ UserId: req.body.UserId })
    .populate({
      path: 'orderItems.CartId',
      populate: {
        path: 'items.productId',
        model: 'Product',
      },
    })
      .populate("UserId", "name email").exec();
    if (!FindSingleOrder.length) {
      return next(new ErrorHandler(404, "Orders Does not exist"));
    }
    console.log(FindSingleOrder);
    return res.status(200).send({
      sucess: true,
      msg: "All Order of This user",
      data: FindSingleOrder,
    });
  }),
};
