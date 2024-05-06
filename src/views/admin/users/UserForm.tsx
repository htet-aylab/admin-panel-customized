'use client'

import { Box, Button, Card, CardBody, Flex, FormControl, FormLabel, Heading, Icon, Input, InputGroup, InputRightElement, Select, Text, useColorModeValue } from '@chakra-ui/react'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { axiosGet, axiosPatch, axiosPost } from 'utils/axios';
import { useRouter } from "next/navigation";
import TextField from 'components/inputs/TextField';
import PasswordField from 'components/inputs/PasswordField';

const UserForm = ({action = 'create', id = 0}) => {

  const textColor = useColorModeValue('navy.700', 'white');
  const [inputs, setInputs] = useState({ name: "", email: "", password: "", status: 0 });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlerForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);

      if (!inputs.name) {
        throw new Error("Please enter the username");
      }

      if (!inputs.email) {
        throw new Error("Please enter the email address");
      }

      if (!inputs.password && action != 'edit') {
        throw new Error("Please enter the password");
      }

      const { status, ...params } = inputs;

      if(action == 'create'){
        await axiosPost(
          "admin/users",
          params,
          (res) => {
            setLoading(false);
            toast.success("User Created Successfully !");
            router.push("/admin/users");
          },
          (err) => {
            throw new Error(err.message);
          },
        );
      }
      else{
        await axiosPatch(
          "admin/users/"+id,
          params,
          (res) => {
            setLoading(false);
            toast.success("User Updated Successfully !");
            router.push("/admin/users");
          },
          (err) => {
            throw new Error(err.message);
          },
        );
      }
    } catch (err : any) {
      setLoading(false);
      toast.error(err?.message);
    }
  }

  const handlerStatusUpdateForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      await axiosPatch(
        "admin/users/"+id+"/approve",
        {status: inputs?.status},
        (res) => {
          setLoading(false);
          toast.success("User Status Updated Successfully !");
          router.push("/admin/users");
        },
        (err) => {
          throw new Error(err.message);
        },
      );
    } catch (err : any) {
      setLoading(false);
      toast.error(err?.message);
    }
  }

  const handlerInputs = async (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const fetchUser = async () => {
    await axiosGet(`admin/users/${id}`, (res: any) => {
      setInputs({ ...inputs, name: res.name, email: res.email, password: '', status: res.status });
    });
  };

  useEffect(() => {
    if (action === "edit" || action === "view") {
      fetchUser();
    }
  }, []);

  return (
    <>
        <Flex
            maxW={{ base: '100%', md: '50%' }}
            w="100%"
            mx={{ base: 'auto', lg: 'auto' }}
            me="auto"
            h="100%"
            alignItems="center"
            justifyContent="center"
            mb={{ base: '30px', md: '60px' }}
            px={{ base: '25px', md: '0px' }}
            mt={{ base: '14vh', md: '14vh' }}
            flexDirection="column">

              <Card w={'100%'}>
                <CardBody w={'100%'} mx={'auto'}>
                  <Box me="auto">
                    <Heading color={textColor} fontSize="20px" mb="10px">
                        {action == 'create' ? 'Create' : 'Update'} Users
                    </Heading>
                  </Box>
                  <form onSubmit={handlerForm}>
                      <Flex
                          zIndex="2"
                          direction="column"
                          w={'100%'}
                          maxW="100%"
                          background="transparent"
                          borderRadius="15px"
                          mx={{ base: 'auto', lg: 'unset' }}
                          me="auto"
                          mb={{ base: '20px', md: 'auto' }}>
                          
                          <FormControl>

                              {/* Name */}
                              <TextField
                                name='name'
                                label='Name'
                                type='text'
                                isRequired={true}
                                placeholder='John Doe'
                                value={inputs?.name} 
                                onChange={handlerInputs}
                              />

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
                                {action == 'create' ? 'Create' : 'Update'}
                              </Button>
                              
                          </FormControl>
                      </Flex>
                  </form>
                </CardBody>
              </Card>
              
        </Flex>
    </>
  )
}

export default UserForm