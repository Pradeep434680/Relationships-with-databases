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
const userSchema = new Schema({
    username:String,
    addresses:[
        {    _id:false,
            location:String,   //here in the addresses an id will generate automaticclly.
            city:String,       // to remove that id write _id:false
        }
    ]
})
const User = mongoose.model("User",userSchema);
 
const addUser = async ()=>{
    let user1 =new User({
    username:"sherlockholmes",  
    city:"Landon"
    })
    user1.addresses.push({location:'p32 WallStreet',city:'Landon'})
   let result= await user1.save();
   console.log(result);

}
addUser();
