import { useDisclosure } from '@chakra-ui/hooks';
import { ViewIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import React from 'react'

const ProfileModal = ({user,children}) => {
 const {isOpen,onOpen,onClose} = useDisclosure()
  return(
   <>

  {
    children?(<span onClick={onOpen}>{children}</span>)
    :(<IconButton
    display={{base:"flex"}}
    icon={<ViewIcon/>}
    onClick={onOpen}
    />)
  }
  
  </>
  )
};

export default ProfileModal