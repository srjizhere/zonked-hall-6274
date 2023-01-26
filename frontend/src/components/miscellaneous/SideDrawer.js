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
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { BellIcon, ChevronDownIcon, Search2Icon } from "@chakra-ui/icons";
import { ChatState } from "../../context/chatprovider";
import ProfileModal from "./ProfileModal";
import { useHistory } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/hooks";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const { user } = ChatState();
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  const handelSearch = ()=>{
    if(!search){
      
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
            <Text display={{ base: "none", md: "flex" }} px={4}>
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
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
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
          <Box display='flex' padding={2}>
              <Input
                placeholder="Search name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
               <Button 
               onClick={handelSearch}
               
               >Go</Button>
          </Box>
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
