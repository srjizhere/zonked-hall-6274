import { Box, Button, Tooltip,Text, Menu, MenuButton, Avatar, MenuList, MenuItem, MenuDivider } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react'
import { BellIcon, ChevronDownIcon, Search2Icon } from "@chakra-ui/icons";
import { ChatState } from '../../context/chatprovider';
import ProfileModal from './ProfileModal';

const SideDrawer = () => {
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [loading, setLoading] = useState(false);
  const [loadingChat,setLoadingChat] = useState();
   const {user} = ChatState();
  return <>
  <Box
       display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px">
    <Tooltip label='Search Users to chat'
     hasArrow 
     placement='bottom-end'>
      <Button > 
                    <Search2Icon/>
  <Text display={{ base: "none", md: "flex" }} px={4}>
              Search User
            </Text>
      </Button>
    </Tooltip>
    <Text fontSize={'2xl'} fontFamily='Work sans'>Talk-A-Tive</Text>
    <div>
      <Menu>
         <MenuButton p={1}>
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
      </Menu>
      <Menu>
        <MenuButton
         as={Button} 
         rightIcon={<ChevronDownIcon />}
         >
          <Avatar
           size='sm' 
           cursor='pointer' 
           name={user.name}
           src={user.pic} />
         </MenuButton>
         <MenuList>
          <ProfileModal>
                  
          </ProfileModal>
          <MenuDivider />
          <MenuItem>Logout</MenuItem>
         </MenuList>
      
      </Menu>
    </div>
  </Box>
  
  
  </>
    
    
  }
  
  export default SideDrawer
  {/* <img  src="https://www.freepnglogos.com/uploads/search-png/search-icon-transparent-images-vector-15.png" 
      width={'18px'}></img> */}