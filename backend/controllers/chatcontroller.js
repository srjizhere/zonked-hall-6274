const AsyncHandler = require("express-async-handler");
const Chat = require("../models/chat.model");
const User = require("../models/user.model");



const accessChat = AsyncHandler(async(req,res)=>{
     const {userId}  = req.body;
     if(!userId){
        console.log('UserId param not sent with the request');
        return res.sendStatus(400);
     }
     var isChat = await Chat.find({
        isGroupChat:false,
        $and:[
            {users:{$elemMatch:{$eq:req.user._id}}},
            {users:{$elemMatch:{$eq:userId}}},
        ]
     }).populate('users',"-password").populate("latestMessage")

     isChat = await User.populate(isChat,{
        path:"latestMessage.sender",
        select:"name pic email",
     })
     if(isChat.length>0){
        res.send(isChat[0])
     }else{
        var chatData  = {
            chatName:"sender",
            isGroupChat:false,
            users: [req.user._id,userId],
        };
        try{
            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({_id:createdChat._id}).populate(
                "users",
                "-password"
            );
            res.status(200).send(FullChat)
        }catch(error){
            res.status(400);
            throw new Error(error.message)
        }
     }
});

const fetchchats = AsyncHandler(async (req,res)=>{
    try{
        Chat.find({users:{$elemMatch:{$eq:req.user._id}}})
        .populate("users","-password")
        .populate("groupAdmin","-password")
        .populate("latestMessage")
        .sort({updatedAt:-1})
        .then(async(results)=>{
            results = await User.populate(results,{
                path:"latestMessage.sender",
                select:"name pic email"
            })
             res.status.send(results)
        })
    }catch(error){
        console.log(error);
        res.status(400);
        throw new Error(error.message)
    }
})

const createGroupChat = AsyncHandler(async(req,res)=>{
    if(!req.body.users || !req.body.name){
        return res.status(400).send({message:"Please fill all the fields"});
    }
    var users = JSON.parse(req.body.users);
    if(users.length<2){
        return res.status(400).send("More than 2 users are required to form a group chat")

    }
    users.push(req.user);

    try {
        const groupChat = await Chat.create({
            chatName:req.body.name,
            users:users,
            isGroupChat:true,
            groupAdmin:req.user,
        })
    } catch (error) {
        
    }

});


module.exports = {accessChat,fetchchats,createGroupChat}