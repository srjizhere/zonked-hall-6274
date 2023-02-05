import React from 'react'
import {ChatState} from '../context/chatprovider'
import {Box} from '@chakra-ui/react'
import SingleChat from './SingleChat';

// remember SelectedChat not selectedChat
const ChatBox = ({fetchAgain,setFetchAgain}) => {
  const {SelectedChat} = ChatState(); 
  return  <Box 
  display={{base:SelectedChat ? 'flex':'none',md:'flex'}}
  alignItems='center'
  flexDir= 'column'
  p={'3'}
  bg='white'
  w={{base:'100%' ,md:'68%'}}
  borderRadius='lg'
  borderWidth='1px'
  > 
    <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
     </Box>
}

export default ChatBox