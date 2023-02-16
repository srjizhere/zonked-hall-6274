import React,{useState} from 'react'
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, useToast, VStack } from '@chakra-ui/react'
import axios from 'axios';
import {useHistory} from 'react-router-dom'
//https://api.cloudinary.com/v1_1/dbpt6np2b
const Signup = () => {
    const [show, setShow] = useState(false)
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [pic, setPic] = useState();
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const history = useHistory();

    const handleClick = ()=>setShow(!show)
    const submitHandler = async()=>{ 
        setLoading(true);
        if(!name || !email || !password || !confirmpassword){
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
        if(password !==confirmpassword){
              toast({
                title:"please pasword does not match",
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
                headers:{
                    "Content-type":"application/json",
                },
            };
            const {data} = await axios.post('/api/user',
            {name,email,password,pic},
            config
            );
                toast({
                title:"Regstration Successful",
                status:"success",
                duration:5000,
                isClosable:true,
                position:"bottom",
            });
            localStorage.setItem('userInfo',JSON.stringify(data));
            setLoading(false);
            history.pushState('/chats')
        }catch(error){
            console.log(error);
                   toast({
                title:"Error",
                description:error.response.data.message,
                status:"error",
                duration:5000,
                isClosable:true,
                position:"bottom",
            });
            setLoading(false)
        }

    }
    const postDetails = (pics)=>{
        setLoading(true);
        if(pics===undefined){
            toast({
                title:"Please Select an Image",
                status:"warning",
                duration:5000,
                isClosable:true,
                position:"bottom",
            });
            return;
        }
        if(pics.type==="image/jpeg" || pics.type ==="image/png"){
            const data =  new FormData();
            data.append('file',pics);
            data.append('upload_preset',"mychat");
            data.append('Cloud_name',"dbpt6np2b")
            fetch('https://api.cloudinary.com/v1_1/dbpt6np2b/image/upload',{
                method:'post',
                body:data
            }).then((res)=>res.json())
            .then(data=>{
                setPic(data.url.toString());
                console.log(data.url.toString());
                setLoading(false);
            })
            .catch(err=>{
                console.log(err);
                setLoading(false);
            });
        }else{
            toast({
                title:"Please Select an Image",
                status:"warning",
                duration:5000,
                isClosable:true,
                position:"bottom",
            });
            setLoading(false)
            return;
        }
    }


  return <VStack spacing='5px' color='black'>
    <FormControl id='first-name' isRequired="true"> 
        <FormLabel  >Name</FormLabel>
        <Input
        placeholder='Enter Your Name'
       onChange={(e)=>setName(e.target.value)}
       />
    </FormControl>
    <FormControl id='email' isRequired="true">
        <FormLabel>Email</FormLabel>
        <Input
        placeholder='Enter Your Email'
       onChange={(e)=>setEmail(e.target.value)}
       />
    </FormControl>
    <FormControl id='password' isRequired="true">
        <FormLabel>Password</FormLabel>
        <InputGroup>
        <Input
        type={show? "text":'password'}
        placeholder='Enter Password'
       onChange={(e)=>setPassword(e.target.value)}
       />
       <InputRightElement width='4.5rem'>
        <Button h="1.75rem" size='sm' onClick={handleClick}>
            {show ? 'Hide':'Show'}
        </Button>
       </InputRightElement>

       </InputGroup>
    </FormControl>
    <FormControl id='confirm_password' isRequired="true">
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
        <Input
        type={show? "text":'password'}
        placeholder='Confirm Password'
       onChange={(e)=>setConfirmpassword(e.target.value)}
       />
       <InputRightElement width='4.5rem'>
        <Button h="1.75rem" size='sm' onClick={handleClick}>
            {show ? 'Hide':'Show'}
        </Button>
       </InputRightElement>

       </InputGroup>
    </FormControl>
        <FormControl id='pic'>
        <FormLabel>Upload your Picture</FormLabel>
        <Input
        type='file'
        p={1.5}
        accept='image/*'
       onChange={(e)=>postDetails(e.target.files[0])}
       />
    </FormControl>
    <Button
    colorScheme='blue'
    width="100%"
    style={{marginTop:15}}
    onClick  = {submitHandler}
    isLoading ={loading}
    >
        Sign UP
    </Button>

</VStack>;
}
//https://api.cloudinary.com/v1_1/dbpt6np2b/images

export default Signup