import React, { useState } from 'react'
import axios from 'axios';
import { VStack, FormControl, FormLabel, Input, InputGroup, InputRightElement, Button, Toast, useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);


    //toast and navigate
    const toast = useToast();
    const navigate = useNavigate();

    const handleClick = () => setShow(!show);

    const submitHandler = () => {
        setLoading(true);
        if (!email || !password) {
            toast({
                title: "Please Fill all the Fields",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }
        try {
             axios.post('http://localhost:8070/api/user/login', { email, password }).then((res) => {
                console.log(res.data);
                setLoading(false);
                toast({
                    title: "Login Successful",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
                localStorage.setItem("userInfo", JSON.stringify(res.data));
                //console.log(localStorage.getItem("userInfo"));
                setLoading(false);
                navigate('/chats');

            })
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    return (
        <VStack>
            <FormControl id='email'>
                <FormLabel>Email</FormLabel>
                <Input placeholder='Enter Your Email' onChange={(e) => setEmail(e.target.value)} />
            </FormControl>

            <FormControl id='password' pb={`2`}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input type={show ? 'text' : 'password'} placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} />
                    <InputRightElement width={'4.5rem'}>
                        <Button h='1.75rem' size={'sm'} onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <Button
                colorScheme='blue'
                width={`100%`}
                style={{ marginTop: `15` }}
                onClick={submitHandler}
            >Login</Button>
        </VStack>
    )
}

export default Login;