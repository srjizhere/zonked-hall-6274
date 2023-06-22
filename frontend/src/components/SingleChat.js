import {
  Box,
  FormControl,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/button";
import { ArrowBackIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { ChatState } from "../context/chatprovider";
import { getSender, getSenderFull } from "../config/ChatLogics";
import ProfileModal from "./miscellaneous/ProfileModal";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
import axios from "axios";
import './style.css'
import ScrollableChat from "./ScrollableChat";
import io from 'socket.io-client';
//https://zonked-hall-6274-8wlvp84ul-srjizhere.vercel.app/
const ENDPOINT = "https://surajmernchat.adaptable.app";
var socket,SelectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setmessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false)
  const [typing,setTyping] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

  const toast = useToast()

  const { user, SelectedChat, setSelectedChat,notification,setNotification } = ChatState();
  const fetchMessages = async ()=>{
    if(!SelectedChat) return;
    try {
         const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },

        }
        setLoading(true)
         const { data } = await axios.get(
           `https://surajmernchat.adaptable.app/api/message/${SelectedChat._id}`,
           config
         );
           
            setmessages(data);
            setLoading(false);
            socket.emit('joinChat',SelectedChat._id);
        
    } catch (error) {
           toast({
          title: "Error Occured",
          description: "failed to load the chats",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "bottom-left",
        });
    }
  }
  
    const sendMessage = async (event) => {
      if (event.key === "Enter" && newMessage) {
        socket.emit("stop typing", SelectedChat._id);
        try {
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          };
          setNewMessage("");
          const { data } = await axios.post(
            "https://surajmernchat.adaptable.app/api/message",
            {
              content: newMessage,
              chatId: SelectedChat._id,
            },
            config
          );
          socket.emit("new message", data);
          setmessages([...messages, data]);
        } catch (error) {
          toast({
            title: "Error Occured",
            description: "failed to load the chats",
            status: "error",
            duration: 4000,
            isClosable: true,
            position: "bottom-left",
          });
        }
      }
    };
    useEffect(() => {
      socket = io(ENDPOINT);
      socket.emit("setup", user);
      socket.on("connected", () => setSocketConnected(true));
      socket.on("typing", () =>{ 
        setIsTyping(true)
      });
      socket.on("stop typing", () => setIsTyping(false));
      // eslint-disable-next-line
    },[]);
  
useEffect(()=>{
},[isTyping])
  useEffect(() => {
    fetchMessages();
    SelectedChatCompare = SelectedChat;
  },[SelectedChat]);

  useEffect(() => {
   socket.on("message recieved",(newMessageRecieved)=>{
    if(!SelectedChatCompare ||SelectedChatCompare._id!==newMessageRecieved.chat._id){
      //give notifications
      if(!notification.includes(newMessageRecieved)){
        setNotification([newMessageRecieved,...notification]);
        setFetchAgain(!fetchAgain);
      }

    }else{
      setmessages([...messages,newMessageRecieved])
    }
   })
  })
  
  







  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    // typing indicator logic
    if(!socketConnected) return;

    if(!typing){
      setTyping(true)
      socket.emit('typing',SelectedChat._id)
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 10000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", SelectedChat._id);
        setTyping(false);
      }
    }, timerLength);

  };

  return (
    <>
      {SelectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb="3"
            px="2"
            w="100%"
            fontFamily={"work sans"}
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {messages &&
              (!SelectedChat.isGroupChat ? (
                <>
                  {getSender(user, SelectedChat.users)}
                  <ProfileModal
                    user={getSenderFull(user, SelectedChat.users)}
                  />
                </>
              ) : (
                <>
                  {SelectedChat.chatName.toUpperCase()}
                  <UpdateGroupChatModal
                    fetchMessages={fetchMessages}
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                  />
                </>
              ))}
          </Text>
          <Box
            display={"flex"}
            flexDirection="column"
            justifyContent={"flex-end"}
            p={"3"}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius={"lg"}
            overflowY="hidden"
          >
            {loading ? (
              <Spinner
                size={"xl"}
                w={20}
                h={20}
                alignSelf="center"
                margin={"auto"}
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}
            <FormControl id="first-name" onKeyDown={sendMessage} isRequired mt={3}>
              {isTyping && <p>Still typing...</p>}
              <Input
                variant={"filled"}
                bg="white"
                placeholder="Enter a message..."
                onChange={typingHandler}
                value={newMessage}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display={"flex"}
          alignItems="center"
          justifyContent={"center"}
          h="100%"
        >
          <Text fontSize="3xl" pb={3} fontFamily="work sans"></Text>
          Click on a user to start Chatting
        </Box>
      )}
    </>
  );
};

export default SingleChat;