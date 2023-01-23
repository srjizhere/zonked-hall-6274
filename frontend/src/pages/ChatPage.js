import React, { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react';
import SideDrawer from '../components/miscellaneous/SideDrawer';
import { ChatState } from '../context/chatprovider'
import MyChats from '../components/MyChats';
import ChatBox from '../components/ChatBox';
const ChatPage = () => {
    const {user} = ChatState();
  
    return <div style={{width:'100%'}}>
      {user && <SideDrawer />} 
      <Box
      d="flex"
      backgroundColor={'red'}
      flexDirection={'row'}
      justifyContent={'space-between'}
      w='100%'
      h='91.5vh'
      p='10px'>
        {user && <MyChats/>} 
         {user && <ChatBox/>} 
      </Box>
      </div>
    

}

export default ChatPage