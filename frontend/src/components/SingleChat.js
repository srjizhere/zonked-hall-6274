import { Box, Text } from '@chakra-ui/react';
import {IconButton} from '@chakra-ui/button';
import { ArrowBackIcon } from '@chakra-ui/icons';
import React from 'react'
import { ChatState } from '../context/chatprovider'
import { getSender ,getSenderFull} from '../config/ChatLogics';
import ProfileModal from './miscellaneous/ProfileModal';
import UpdateGroupChatModal from './miscellaneous/UpdateGroupChatModal';

const SingleChat = ({fetchAgain,setFetchAgain}) => {
    const {user,SelectedChat,setSelectedChat} = ChatState()
    return(
     <>{
    
    SelectedChat?(
        <>
        <Text
        fontSize={{base:'28px',md:'30px'}}
        pb='3'
        px='2'
        w='100%'
        fontFamily={'work sans'}
        display='flex'
        justifyContent= {{ base:'space-between'}}
        alignItems='center'
        > 
        <IconButton
        display={{base:'flex',md:'none'}}
        icon={<ArrowBackIcon/>}
        onClick={()=>setSelectedChat('')}   
      />
      {!SelectedChat.isGroupChat?(
        <>
        {getSender(user,SelectedChat.users)}
        <ProfileModal user =   {getSenderFull(user,SelectedChat.users)} />
        </>
      ):(
        <>
            {SelectedChat.chatName.toUpperCase()}
            <UpdateGroupChatModal
            fetchAgain={fetchAgain}
            setFetchAgain={setFetchAgain}
            />
            </>
      )}
        </Text>
        <Box
        display={'flex'}
        flexDirection='column'
        justifyContent={'flex-end'}
        p={'3'}
        bg='#E8E8E8'
        w='100%'
        h='100%'
        borderRadius={'lg'}
        overflowY='hidden'
        >
            {/* messages here  */}
        </Box>
        </>
    ):(
        <Box display={'flex'} alignItems='center' justifyContent={'center'}
        h='100%'>
            <Text  fontSize='3xl' pb={3} fontFamily="work sans" ></Text>
            Click on a user to start Chatting
        </Box>
    )
}
    </>
    
    );
}

export default SingleChat