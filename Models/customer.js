const mongoose = require("mongoose");
const {Schema} = mongoose;
main().then(()=>{
    console.log("connection successful");
})
.catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/relationship")
}
const orderSchema = new Schema({
    item:String,
    price:Number
})

 

// now we will create customer schema
const customerSchema = new Schema({
    name:String,
    orders:[
        {
            type:Schema.Types.ObjectId,  //with the help of this we can store the id of child schema
            ref:'Order'          //it tells the reference
        }
    ]
})

// both post and pre methods works findByIdAndDelete beacause we have passed an argument "findOneAndDelete"

// it will work before the query
// customerSchema.pre("findOneAndDelete",async()=>{
//     console.log("PRE middleware");
// })

// it will work after the query
customerSchema.post("findOneAndDelete",async(customer)=>{
    if(customer.orders.length){
        let res = await Order.deleteMany({_id:{$in:customer.orders}})
       console.log(res);    
    }
})

//this is the order schema


const Order = mongoose.model("Order",orderSchema);
const Customer = mongoose.model("Customer",customerSchema);

// const findCustomer = async()=>{
//    let result = await Customer.find({}).populate("orders")
//    console.log(result[0]);
// }
// findCustomer();

// int the second apporach we will insert the id of child docs into the parent docs

 //add customer
//  const addCustomer = async()=>{
//     let cust1 = new Customer({
//         name:"rahul kumar"
//     });
//     let order1 = await Order.findOne({item:"chips"}) // it will return you an object
//     let order2 = await Order.findOne({item:"chocolate"});
//     cust1.orders.push(order1);
//     cust1.orders.push(order2);
//  }
//  addCustomer()

// const addOrders = async()=>{
//   let res=  await Order.insertMany([
//         {item:"samosa",price:12},
//         {item:"chips",price:10},
//        { item:"chocolate",price:20}]);

//        console.log(res);
// }
// addOrders();
 
 

///++++++++++++++++++++++++++++++++++++++++++++++++++++++////

//day 51 
//lecture 01  Handling Deletion=>if i deleted a user then it is nesessary to remove all
// info about that user by mongoose middlewares
// make functions for add and delete a nuw user ;

const addCust = async()=>{

    let newCust =new Customer({
    name:"karan"
    })
    let newOrder = new Order({
        item:"barger",
        price:250
    })
    newCust.orders.push(newOrder);
    await newOrder.save();
    await newCust.save();
    console.log("new customer is added");
}
// addCust();
//function for the delete the user
const delCust = async()=>{
    let data = await Customer.findByIdAndDelete('66155625a09f3fd8b86d2a3f');
    console.log(data);
}
delCust()
