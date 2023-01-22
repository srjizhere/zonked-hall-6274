import React from 'react'
import {Container,Box,Text,Tabs,Tab,TabList,TabPanel,TabPanels} from "@chakra-ui/react"
import Login from '../components/authentication/login';
import Signup from '../components/authentication/signup';
const Homepage = () => {
  return <Container maxW='xl' centerContent>
    <Box
     d="flex"
    justifyContent='center'
    textAlign={"center"}
    p={3}
    bg={"white"}
    w='100%'
    m='40px 0 15px 0'
    borderRadius='lg'
    borderWidth='1px'
    >
    <Text fontSize='4xl' fontFamily='Work sans' color='black'>Talk-E-Tive</Text>
    </Box>
  <Box bg='white' w='100%' p={4} borderRadius='lg' borderWidth='1px' color='black'>
  <Tabs variant='soft-rounded' >
  <TabList mb='1em'>
    <Tab width={"50%"}>Login</Tab>
    <Tab width={"50%"}>Sign Up</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>{<Login/>}</TabPanel>
    <TabPanel>{<Signup/>} </TabPanel>
  </TabPanels>
</Tabs>

  </Box>









  </Container>
}

export default Homepage