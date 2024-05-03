'use client';

import Link from 'next/link';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';
import {
    Box,
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Icon,
    Input,
    InputGroup,
    InputRightElement,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'
import { ChangeEvent, FormEvent, useState } from 'react';
import { axiosPost } from 'utils/axios';
import { setLocalStorage } from 'utils/local-storage';
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";

export default function SignInPage(){

  const textColor = useColorModeValue('navy.700', 'white');
  const textColorSecondary = 'gray.400';
  const textColorBrand = useColorModeValue('brand.500', 'white');
  const brandStars = useColorModeValue('brand.500', 'brand.400');

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [inputs, setInputs] = useState({ email: "", password: "", accepted: false });
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

      if (!inputs.accepted) {
        throw new Error("Please select the terms and conditions");
      }

      await axiosPost(
        "auth/login",
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
  
  const handlerCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.checked });
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
                        <FormLabel
                        display="flex"
                        ms="4px"
                        fontSize="sm"
                        fontWeight="500"
                        color={textColor}
                        mb="8px"
                        >
                        Email<Text color={brandStars}>*</Text>
                        </FormLabel>
                        <Input
                        isRequired={true}
                        variant="auth"
                        fontSize="sm"
                        ms={{ base: '0px', md: '0px' }}
                        type="email"
                        name='email'
                        value={inputs?.email} 
                        onChange={handlerInputs}
                        placeholder="mail@simmmple.com"
                        mb="24px"
                        fontWeight="500"
                        size="lg"
                        />
                        <FormLabel
                        ms="4px"
                        fontSize="sm"
                        fontWeight="500"
                        color={textColor}
                        display="flex"
                        >
                        Password<Text color={brandStars}>*</Text>
                        </FormLabel>
                        <InputGroup size="md">
                        <Input
                            isRequired={true}
                            fontSize="sm"
                            placeholder="Min. 8 characters"
                            mb="24px"
                            size="lg"
                            name="password" 
                            value={inputs?.password} 
                            onChange={handlerInputs}
                            type={show ? 'text' : 'password'}
                            variant="auth"
                        />
                        <InputRightElement display="flex" alignItems="center" mt="4px">
                            <Icon
                            color={textColorSecondary}
                            _hover={{ cursor: 'pointer' }}
                            as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                            onClick={handleClick}
                            />
                        </InputRightElement>
                        </InputGroup>
                        <Flex justifyContent="space-between" align="center" mb="24px">
                        <FormControl display="flex" alignItems="center">
                            <Checkbox
                            id="remember-login"
                            colorScheme="brandScheme"
                            name="accepted" 
                            checked={inputs?.accepted} 
                            onChange={handlerCheckBox}
                            me="10px"
                            />
                            <FormLabel
                            htmlFor="remember-login"
                            mb="0"
                            fontWeight="normal"
                            color={textColor}
                            fontSize="sm"
                            >
                            Accept the terms and conditions
                            </FormLabel>
                        </FormControl>
                        <Link href="/auth/forgot-password">
                            <Text
                            color={textColorBrand}
                            fontSize="sm"
                            w="124px"
                            fontWeight="500"
                            >
                            Forgot password?
                            </Text>
                        </Link>
                        </Flex>
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
