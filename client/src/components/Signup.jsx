import { Button, FormControl, FormLabel, Input, InputGroup, InputLeftElement, InputRightElement, VStack } from '@chakra-ui/react'
import React,{useState} from 'react'

const Signup = () => {

    //Show password state
    const [show,setShow] = useState(false);

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [pic,setPic]  = useState('');

    //HandleClick for showing password
    const handleClick = () => setShow(!show);

    //For pictures
    const postDetails = (pics)=>{

    }

    return (
        <VStack spacing='5px' color={'black'}>
            <FormControl id='name'>
                <FormLabel>Name</FormLabel>
                <Input placeholder='Enter Your Name' onChange={(e)=>setName(e.target.value)}/>
            </FormControl>
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

            <FormControl id='confirmPassword' pb={`2`}>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                    <Input type={show? 'text' : 'password'} placeholder='Re-enter your password' onChange={(e)=>setPassword(e.target.value)}/>
                    <InputRightElement width={'4.5rem'}>
                        <Button h='1.75rem' size={'sm'} onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <FormControl id='pic' pb={`2`}>
                <FormLabel>Upload a Picture</FormLabel>
                <Input type='file' accept='image/*' onChange={(e)=>postDetails(e.target.value[0])}/>
            </FormControl>

            <Button
                colorScheme='blue'
                width={`100%`}
                style={{marginTop:`15`}}
                // onClick={submitHandler}
            >Sign Up</Button>
        </VStack>
    )
}

export default Signup