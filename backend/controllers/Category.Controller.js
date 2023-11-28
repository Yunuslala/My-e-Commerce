const AsyncerrorHandler = require("../middlewares/AsyncerrorHandler");
const {CategoryModel}=require("../models/Category.Model");
const {ErrorHandler}=require("../utils/Error.Handler");

exports.AddCategory=AsyncerrorHandler(async(req,res,next)=>{
    const {name}=req.body;
    if(!name){
        return next(new ErrorHandler(400,"category is required"))
    }
    let {role}=req.body;
    if(role!="admin"){
        return next(new ErrorHandler(401,"you are not authorize for these routes"))
    }
    const data=new CategoryModel({name});
    await data.save();
    return res.status(201).send({
        sucess:true,
        msg:"category is added",
        data
    })
})

exports.UpdateCategory=AsyncerrorHandler(async(req,res,next)=>{
    const {name}=req.body;
    let {role}=req.body;
    if(role!="admin"){
        return next(new ErrorHandler(401,"you are not authorize for these routes"))
    }
    if(!name){
        return next(new ErrorHandler(400,"category is required for update"))
    }
    const findCategory=await CategoryModel.findOne({_id:req.params.id});
    if(!findCategory){
        return next(new ErrorHandler(400,"category does not exist"))

    }
    const data=await CategoryModel.findByIdAndUpdate({_id:req.params.id},{name},{new:true});

    return res.status(201).send({
        sucess:true,
        msg:"category is updated",
        data
    })
})

exports.deleteCategory=AsyncerrorHandler(async(req,res,next)=>{
    let {role}=req.body;
    if(role!="admin"){
        return next(new ErrorHandler(401,"you are not authorize for these routes"))
    }
   
    const findCategory=await CategoryModel.findOne({_id:req.params.id});
    if(!findCategory){
        return next(new ErrorHandler(400,"category does not exist"))

    }
    const data=await CategoryModel.findByIdAndDelete({_id:req.params.id});

    return res.status(200).send({
        sucess:true,
        msg:"category is deleted",
      
    })
})

exports.GetAllCategory=AsyncerrorHandler(async(req,res,next)=>{
   
    const data=await CategoryModel.find();
    if(!data.length){
        return next(new ErrorHandler(400,"category does not exist"))

    }
    return res.status(201).send({
        sucess:true,
        msg:"All categories",
        data
    })
})

