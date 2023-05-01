import React,{useState} from 'react'
import { VStack,FormControl,FormLabel, Input, InputGroup,InputRightElement, Button } from '@chakra-ui/react'

const Login = () => {

    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [show,setShow] = useState(false);
    
    const handleClick = () => setShow(!show);
  return (
    <VStack>
         <FormControl id='email'>
                <FormLabel>Email</FormLabel>
                <Input placeholder='Enter Your Email' onChange={(e)=>setEmail(e.target.value)}/>
            </FormControl>

            <FormControl id='password' pb={`2`}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input type={show? 'text' : 'password'} placeholder='Enter your password' onChange={(e)=>setPassword(e.target.value)}/>
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
                style={{marginTop:`15`}}
                // onClick={submitHandler}
            >Login</Button>

            <Button
                colorScheme='red'
                width={`100%`}
                style={{marginTop:`15`}}
                // onClick={submitHandler}
            >Create an Account</Button>
    </VStack>
  )
}

export default Login