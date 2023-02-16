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

const ENDPOINT = "http://localhost:5000"
var socket,SelectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setmessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false)

  const toast = useToast()

  const { user, SelectedChat, setSelectedChat } = ChatState();
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
         const { data } = await axios.get( `/api/message/${SelectedChat._id}`,
            config
            );
            console.log(messages);
            console.log(data,"dsfas");
            setmessages(data)
            setLoading(false)
        
    } catch (error) {
           toast({
          title: "Error Occured",
          description: "failed to load the chats",
          status: "Error",
          duration: 4000,
          isClosable: true,
          position: "bottom-left",
        });
    }
  }

  useEffect(() => {
    fetchMessages();
    // eslint-disable-next-line
  },[SelectedChat])
  

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
             setNewMessage("");
        const { data } = await axios.post( "/api/message",{
            content: newMessage,
            chatId: SelectedChat._id,
          },
          config
        );
        console.log(data);
   
        setmessages([...messages, data]);
      } catch (error) {
        toast({
          title: "Error Occured",
          description: "failed to load the chats",
          status: "Error",
          duration: 4000,
          isClosable: true,
          position: "bottom-left",
        });
      }
    }
  };
  useEffect(() => {
   socket = io(ENDPOINT)
   socket.emit("setup",user);
   socket.on("connection",()=>{
    setSocketConnected(true)
   })
  }, [])
  





  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    // typing indicator logic
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
            {!SelectedChat.isGroupChat ? (
              <>
                {getSender(user, SelectedChat.users)}
                <ProfileModal user={getSenderFull(user, SelectedChat.users)} />
              </>
            ) : (
              <>
                {SelectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessages = {fetchMessages}

                />
              </>
            )}
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
              <div className="messages" >
            <ScrollableChat  messages = {messages} />
              </div>
            )}
            <FormControl onKeyDown={sendMessage} isRequired mt={3}>
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
