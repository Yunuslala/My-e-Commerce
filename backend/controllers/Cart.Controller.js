const AsyncerrorHandler = require("../middlewares/AsyncerrorHandler");
const OrderModel = require("../models/Order.Model");
const {CartModel}=require("../models/Cart.Model");
const { ProductModel } = require("../models/Product.model");
const { ErrorHandler } = require("../utils/Error.Handler");


module.exports={
    createCart:AsyncerrorHandler(async(req,res,next)=>{
        const {quantity,productId,UserId}=req.body;
        const isExist=await CartModel.findOne({UserId,isAddedInOrder:false});
        if(isExist){
        const CheckProd=await CartModel.findOne({'items.productId':productId,UserId,isAddedInOrder:false});

            if(CheckProd){
                return next(new ErrorHandler(400,"Product already exist in your cart"))
            }else{
                const UpdateUserCart=await CartModel.findOneAndUpdate({UserId,isAddedInOrder:false},{
                    $push:{items:{
                        quantity,productId
                    }}
                },{new:true})
                return res.status(200).send({
                    sucess:true,
                    message:"Product has been added in cart",
                    data:UpdateUserCart
                })
            }
         
        }else{

            const createCart=await CartModel.create({UserId});
            createCart.items.push({
                quantity,productId
            })
            await createCart.save();
            return res.status(200).send({
                sucess:true,
                message:"Product has been added in cart",
                data:createCart
            })
        }
       
    }),
    finalUpdatedQuantity:AsyncerrorHandler(async(req,res,next)=>{
        const { CartId,ItemId,Quantity,UserId}=req.body;
        const isExist=await CartModel.findOne({_id:CartId,UserId,items:{$elemMatch:{_id:ItemId}},isAddedInOrder:false});
        if(!isExist){
            return next(new ErrorHandler(400,"these product is not exist in your cart"))
        }
      console.log(isExist)
      const updatedQuantity = await CartModel.findOneAndUpdate(
        {
          _id: CartId,
          UserId,
          items: { $elemMatch: { _id: ItemId } },
          isAddedInOrder: false,
        },
        { $set: { "items.$.quantity": Quantity } },{new:true}
      ).populate("items.productId", "name images description price Stock");
      
        return res.status(200).send({
            sucess:true,
            message:"Product Quantity has been changed",
            data:updatedQuantity
        })
    }),
    removeFromCart:AsyncerrorHandler(async(req,res,next)=>{
        const {ItemId,UserId}=req.body;
        const isExist=await CartModel.findOne({UserId,isAddedInOrder:false});
        if(!isExist){
            return next(new ErrorHandler(400,"these product is not exist in your cart"))
        }
        const removeProduct=await CartModel.findOneAndUpdate({ UserId, isAddedInOrder: false },
            {
                $pull: { items: {_id: ItemId } }
            },
            { new: true } ).populate("items.productId", "name images description price Stock");
            return res.status(201).send({
                sucess:true,
                message:"Product remove from cart",
                data:removeProduct
            })
    }),
    getUserCartData:AsyncerrorHandler(async(req,res,next)=>{
        const {UserId}=req.body;
        const findData=await CartModel.findOne({UserId,isAddedInOrder:false}).populate("items.productId", "name images description price Stock");
        if(!findData){
            return next(new ErrorHandler(400,"Cart is empty"))
        }
        return res.status(200).send({
            sucess:true,
            message:"User Cart Data",
            data:findData
        })
    })
   
}