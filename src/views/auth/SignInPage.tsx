'use client';

import {
    Box,
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'
import { ChangeEvent, FormEvent, useState } from 'react';
import { axiosPost } from 'utils/axios';
import { setLocalStorage } from 'utils/local-storage';
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";
import TextField from 'components/inputs/TextField';
import PasswordField from 'components/inputs/PasswordField';

export default function SignInPage(){

  const textColor = useColorModeValue('navy.700', 'white');
  const textColorSecondary = 'gray.400';
  const brandStars = useColorModeValue('brand.500', 'brand.400');

  const [show, setShow] = useState(false);

  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const handlerInputs = (e : ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handlerForm = async (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    
    try {
      if (!inputs.email) {
        throw new Error("Please enter the email address");
      }

      if (!inputs.password) {
        throw new Error("Please enter the password");
      }

      await axiosPost(
        "admin/auth/login",
        { email: inputs.email, password: inputs.password },
        (res : any) => {
          setLocalStorage("token", res.token).then(() => {
            router.replace("/admin/dashboard");
          });
        },
        (err:any) => {
          throw new Error(err.message);
        },
      );
    } catch (err:any) {
      toast.error(err.message);
    }

    setLoading(false);
  };


  return (
    <>
        <Flex
            maxW={{ base: '100%', md: 'max-content' }}
            w="100%"
            mx={{ base: 'auto', lg: '0px' }}
            me="auto"
            h="100%"
            alignItems="start"
            justifyContent="center"
            mb={{ base: '30px', md: '60px' }}
            px={{ base: '25px', md: '0px' }}
            mt={{ base: '40px', md: '14vh' }}
            flexDirection="column">
            <Box me="auto">
            <Heading color={textColor} fontSize="36px" mb="10px">
                Sign In
            </Heading>
            <Text
                mb="36px"
                ms="4px"
                color={textColorSecondary}
                fontWeight="400"
                fontSize="md"
            >
                Enter your email and password to sign in!
            </Text>
            </Box>
            <form onSubmit={handlerForm}>
                <Flex
                    zIndex="2"
                    direction="column"
                    w={{ base: '100%', md: '420px' }}
                    maxW="100%"
                    background="transparent"
                    borderRadius="15px"
                    mx={{ base: 'auto', lg: 'unset' }}
                    me="auto"
                    mb={{ base: '20px', md: 'auto' }}>
                    
                    <FormControl>
                        
                        {/* Email */}
                        <TextField
                          name='email'
                          label='Email'
                          type='email'
                          isRequired={true}
                          placeholder='example@example.com'
                          value={inputs?.email} 
                          onChange={handlerInputs}
                        />
                        
                        {/* Password */}
                        <PasswordField
                          name='password'
                          label='Password'
                          type='password'
                          show={show}
                          setShow={setShow}
                          isRequired={true}
                          placeholder='Min 6. characters'
                          value={inputs?.password} 
                          onChange={handlerInputs}
                        />

                        <Button
                            fontSize="sm"
                            variant="brand"
                            fontWeight="500"
                            w="100%"
                            h="50"
                            mb="24px"
                            type="submit"
                            disabled={loading}
                        >
                          Sign In
                        </Button>
                    </FormControl>
                </Flex>
            </form>
        </Flex>
    </>
  )
}
