// const { default: mongoose } = require("mongoose");
const mongoose=require("mongoose");
mongoose.connect("mongodb://0.0.0.0:27017/PropertyManagmentSystem",
{
useNewUrlParser:true,
}
).then(async()=>{
 await console.log("Connection DOne d")
}).catch((e)=>{
console.log(`This Error: ${e}`)
})