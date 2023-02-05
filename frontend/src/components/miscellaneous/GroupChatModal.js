import { useDisclosure } from '@chakra-ui/hooks'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast,
  Input,
  Box,
} from '@chakra-ui/react'
import {FormControl} from '@chakra-ui/form-control'
import { useState } from 'react';
import {ChatState} from '../../context/chatprovider'
import UserListItem from  '../UserAvatar/UserListItem'
import axios from 'axios';
import UserBadgeItem from '../UserAvatar/UserBadgeItem';

const GroupChatModal = ({children}) => {
      const { isOpen, onOpen, onClose } = useDisclosure();
      const [groupChatName, setGroupChatName] = useState();
      const [selectedUsers,setselectedUsers] = useState([]);
      const [search, setSearch] = useState("");
      const [searchResult, setsearchResult] = useState([]);
      const [loading, setLoading] = useState();
     const toast =  useToast()

    const {user,chats,setChats}= ChatState();
    const handleSearch = async(query)=>{
      setSearch(query)
      if(!query){
        return;
      }
      try {
        setLoading(true);
        const config = {
          headers:{
            Authorization:`Bearer ${user.token}`,
          },
        };
        const {data} = await axios.get(`/api/user?search=${search}`,config)
        console.log(data);
        setLoading(false);
        setsearchResult(data)

      } catch (error) {
           toast({
        title: "Error Occured!",
        description: "failed to load Search Results",
        status: "Error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      }
    }
    const handleSubmit = async()=>{
        if(!groupChatName || !selectedUsers){
               toast({
        title: "Pleas Fill all the fields!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
        }
        try {
          const config = {
          headers:{
            Authorization:`Bearer ${user.token}`,
          },
        };
        const {data} = await axios.post(`/api/chat/group`,{
          name:groupChatName,
          users:JSON.stringify(selectedUsers.map((u)=>u._id)),
        },config
        );
        setChats([data,...chats])
        onClose();
     toast({
        title: "New Group Chat Created!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

        } catch (error) {
        toast({
        title: "Failed to Create the Chat!",
        description:error.response.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
        }
    }
    const handleDelete = (delUser)=>{
      setselectedUsers(selectedUsers.filter(sel=>sel._id!==delUser._id))
    }
    const handleGroup = (userToAdd)=>{
      if(selectedUsers.includes(userToAdd)){
               toast({
        title: "User Already added",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
      }
      setselectedUsers([...selectedUsers,userToAdd]);
    }

    return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
          fontSize={'35px'}
          fontFamily="work sans"
          display={'flex'}
          justifyContent='center'
          >
            Create Group Chat
             </ModalHeader>
          <ModalCloseButton />
          <ModalBody display={'flex'} flexDirection='column' alignItems={'center'}>
         <FormControl>
          <Input placeholder='Chat Name'mb={'3'}
          onChange={(e)=>setGroupChatName(e.target.value)}
          />
         </FormControl>
         <FormControl>
          <Input placeholder='Add Users eg. Jhon, piyush, Jane'mb={'1'}
          onChange={(e)=>handleSearch(e.target.value)}
          />
         </FormControl>
         <Box w ={'100%'} display='flex' flexWrap={'wrap'}>
         {selectedUsers.map(u=>(
          <UserBadgeItem key={user._id} user={u}
          handleFunction={()=>handleDelete(u)}
          />
         ))}
         </Box>
        {loading?(
          <div>loading</div>
          ):(
          searchResult
          ?.slice(0,4)
          .map((user)=>(
          <UserListItem key={user._id} 
          user={user} 
          handleFunction={()=>handleGroup(user)} 
          />
          ))
        )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue'  onClick={handleSubmit}>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}


export default GroupChatModal