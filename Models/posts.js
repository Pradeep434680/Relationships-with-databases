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
const userSchema = ({
    username:String,
    email:String
})
const postSchema = ({
    contant:String,
    likes:Number,
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
})

const User = mongoose.model("User",userSchema);
const Post = mongoose.model("Post",postSchema);

// const addData =async ()=>{
//     let user1 = new User({
//         username:"rahul kumar",
//         email:"rahul@gamil.com"
//     })
//     let post1 = new Post({
//         content:"Hello world",
//         likes:7
//     })

//     post1.user =user1;
//     await user1.save();
//     await post1.save();
// }


// add a new post
// const addData = async()=>{
//     let user = await User.findOne({username:"rahul kumar"});

//     let post2 = new Post({
//         content:"Bye bye :)",
//         likes:23
//     });
//     post2.user = user;

//     await post2.save();
// }

// to get details or data

const getData = async()=>{
  let result = await Post.find({}).populate("user","username"); //here "user" will give all info about user
  console.log(result);//if i wn=ant to print only a specific info
}                      //then write  await Post.find({}).populate("user","username")

getData();