import { Box, Button, Tooltip,Text } from '@chakra-ui/react';
import React, { useState } from 'react'
const SideDrawer = () => {
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [loading, setLoading] = useState(false);
  const [loadingChat,setLoadingChat] = useState();
  return <>
  <Box>
    <Tooltip label='Search Users to chat'
     hasArrow 
     placement='bottom-end'>
      <Button variant='ghost' justifyContent={'space-around'}>

        <Text>Search</Text>
      <img  src="https://www.freepnglogos.com/uploads/search-png/search-icon-transparent-images-vector-15.png" 
      width={'18px'}></img>
      </Button>




    </Tooltip>

  </Box>
  
  
  
  </>
    
  
}

export default SideDrawer