import { useToast } from '@chakra-ui/toast';
import axios from 'axios';
import { useEffect, useState } from 'react'
import { ChatState } from '../context/chatprovider'

const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState();
  const {selectedChat,setSelectedChat,user,chats,setChats} = ChatState()

  const toast = useToast();

  const fetchChats = async()=>{
    try {
      const config = {
        headers:{
          Authorization:`Bearer ${user.token}`,
        },
      }
      const {data} = await axios.get("/api/chat",config);
      console.log(data);
      setChats(data);
    } catch (error) {
          toast({
      title:"Error Occured",
      description:"failed to load the chats",
      status:"Error",
      duration:4000,
      isClosable:true,
      position:'bottom-left',
       });
    }
  }

useEffect(() => {
 setLoggedUser(JSON.parse(localStorage.getItem("userInfo")))
 fetchChats();
}, [])

  return  <div>MyChats</div>
  
}

export default MyChats