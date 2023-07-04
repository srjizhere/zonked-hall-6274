import {
  Box,
  Button,
  Tooltip,
  Text,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  MenuDivider,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Input,
  useToast,
} from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/spinner";
import axios from "axios";
import React, { useState } from "react";
import { BellIcon, ChevronDownIcon, Search2Icon } from "@chakra-ui/icons";
import { ChatState } from "../../context/chatprovider";
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/hooks";
import ChatLoading from "../ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";
import { getSender } from "../../config/ChatLogics";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const {
    user,
    setSelectedChat,
    chats,
    setChats,
    notification,
    setNotification,
  } = ChatState();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };
  const toast = useToast()

  const handelSearch = async()=>{

    if(!search){
       toast({
      title:"Please Enter something in search",
      status:"warning",
      duration:4000,
      isClosable:true,
      position:'top-left',
       });
       return;
    }
    try {
      setLoading(true);
      const config = {
        headers:{
          Authorization:`Bearer ${user.token}`
        },
      };
      const { data } = await axios.get(
        `api/user?search=${search}`,
        config
      );
      setLoading(false);
      setSearchResult(data)
    } catch (error) {
        toast({
      title:"Error Occured!",
      status:"error",
      duration:5000,
      isClosable:true,
      position:'bottom-left',
       });
    }
  };

  const accessChat = async (userId)=>{
    try {
      setLoadingChat(true);
         const config = {
        headers:{
          "Content-type":"application/json",
          Authorization:`Bearer ${user.token}`
        },
      };

      const { data } = await axios.post(
        "api/chat",
        { userId },
        config
      );
      if(!chats.find((c)=>c._id===data.id)) setChats([data,...chats])

      setSelectedChat(data)
      setLoadingChat(false);
      onClose();

    }catch(error) {
          toast({
      title:"Error fetching the chat",
      description:error.message,
      status:"error",
      duration:4000,
      isClosable:true,
      position:'bottom-left',
       });
    }

  }

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <Search2Icon />
            <Text display={{ base: "none", md: "flex" }} px={"4"}>
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize={"2xl"} fontFamily="Work sans">
          Talk-A-Tive
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize="2xl" m={1} color="red.500" />
            </MenuButton>
            <MenuList pl={2}>
              {!notification.length && "No New messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}></ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" padding={"2"}>
              <Input
                placeholder="Search name or email"
                mr={"2"}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handelSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" display={"flex"} />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};


export default SideDrawer;
{
  /* <img  src="https://www.freepnglogos.com/uploads/search-png/search-icon-transparent-images-vector-15.png" 
      width={'18px'}></img> */
}
