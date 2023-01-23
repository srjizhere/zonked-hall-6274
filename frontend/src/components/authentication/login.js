import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import {useToast} from "@chakra-ui/react";
import  axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const [show, setShow] = useState(false)
    const [email, setEmail] = useState();
        const [password, setPassword] = useState();
        const [loading, setLoading] = useState(false)
        
        const toast = useToast();
        const history = useHistory()
        const handleClick = ()=>setShow(!show);

    const submitHandler = async () => { 
        setLoading(true);
        if(!email || !password){
                toast({
                title:"please fill all the fields",
                status:"warning",
                duration:5000,
                isClosable:true,
                position:"bottom",
            });
            setLoading(false);
            return;
        }
        try{
            const config = {
                header:{
                    'Content-type':"application/json",
                },
            };
            const {data} = await axios.post(
                "/api/user/login",
                {email,password},
                config
            );
               toast({
                title:"Login Successfull",
                status:"success",
                duration:5000,
                isClosable:true,
                position:"bottom",
            });
            localStorage.setItem('userInfo',JSON.stringify(data));
            setLoading(false);
            history.push('/chats')

        }catch(error){
               toast({
                title:"Error Occured",
                description:error.response.data.message,
                status:"error",
                duration:5000,
                isClosable:true,
                position:"bottom",
            });
            setLoading(false);
        }

    }
    
   return <VStack spacing='5px' color='black'>
    <FormControl id='email' isRequired="true">
        <FormLabel>Email</FormLabel>
        <Input
        placeholder='Enter Your Email'
        value={email}
       onChange={(e)=>setEmail(e.target.value)}
       />
    </FormControl>
    <FormControl id='password' isRequired="true">
        <FormLabel>Password</FormLabel>
        <InputGroup>
        <Input
        type={show? "text":'password'}
        placeholder='Enter Password'
        value={password}
       onChange={(e)=>setPassword(e.target.value)}
       />
       <InputRightElement width='4.5rem'>
        <Button h="1.75rem" size='sm' onClick={handleClick}>
            {show ? 'Hide':'Show'}
        </Button>
       </InputRightElement>

       </InputGroup>
    </FormControl>
    <Button
    colorScheme='blue'
    width="100%"
    style={{marginTop:15}}
    onClick  = {submitHandler}
    isLoading={loading}
    >
        Login
    </Button>
    <Button
    variant='solid'
    colorScheme='red'
    width="100%"
    onClick = {()=>{
        setEmail('guest@example.com')
        setPassword('123456')
    }}
    >
        Get Guest User Credendtials
    </Button>

</VStack>;
}

export default Login