require('dotenv').config()
const mongoose=require("mongoose");

const connection=mongoose.connect("mongodb+srv://saifjava2:saif@cluster0.uhmlrv5.mongodb.net/Storage?retryWrites=true&w=majority");

module.exports={
    connection
}
