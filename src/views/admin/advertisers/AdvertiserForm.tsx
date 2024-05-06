'use client'

import { Box, Button, Card, CardBody, Flex, FormControl, FormLabel, Heading, Icon, Input, InputGroup, InputRightElement, Select, Text, useColorModeValue } from '@chakra-ui/react'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { axiosGet, axiosPatch, axiosPost } from 'utils/axios';
import { useRouter } from "next/navigation";
import TextField from 'components/inputs/TextField';
import PasswordField from 'components/inputs/PasswordField';

const AdvertiserForm = ({action = 'create', id = 0}) => {

  const textColor = useColorModeValue('navy.700', 'white');
  const textColorSecondary = 'gray.400';
  const brandStars = useColorModeValue('brand.500', 'brand.400');
  const [inputs, setInputs] = useState({ name: "", email: "", password: "", status: 0 });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [show, setShow] = useState(false);

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
          "admin/advertisers",
          params,
          (res) => {
            setLoading(false);
            toast.success("Advertiser Created Successfully !");
            router.push("/admin/advertisers");
          },
          (err) => {
            throw new Error(err.message);
          },
        );
      }
      else{
        await axiosPatch(
          "admin/advertisers/"+id,
          params,
          (res) => {
            setLoading(false);
            toast.success("Advertiser Updated Successfully !");
            router.push("/admin/advertisers");
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
        "admin/advertisers/"+id+"/approve",
        {status: inputs?.status},
        (res) => {
          setLoading(false);
          toast.success("Advertiser Status Updated Successfully !");
          router.push("/admin/advertisers");
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

  const fetchAdvertiser = async () => {
    await axiosGet(`admin/advertisers/${id}`, (res: any) => {
      setInputs({ ...inputs, name: res.name, email: res.email, password: '', status: res.status });
    });
  };

  useEffect(() => {
    if (action === "edit" || action === "view") {
      fetchAdvertiser();
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
                        {action == 'create' ? 'Create' : 'Update'} Advertisers
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
              
              {/* Status Update */}
              {
                action == 'edit' && (
                <Card w={'100%'} mt={'25px'}>
                  <CardBody w={'100%'} mx={'auto'}>
                    <Box me="auto">
                      <Heading color={textColor} fontSize="20px" mb="10px">
                          Update Advertisers Status
                      </Heading>
                    </Box>
                    <form onSubmit={handlerStatusUpdateForm}>
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

                              <Select 
                                placeholder='Select Status' 
                                value={inputs.status} 
                                name='status' 
                                variant="auth"
                                fontSize="sm"
                                mb="24px"
                                size="lg"
                                ms={{ base: '0px', md: '0px' }}
                                onChange={handleSelectChange}>
                                <option value='1'>Approved</option>
                                <option value='0'>Not Approved</option>
                              </Select>
                                
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
                                Update
                              </Button>
                            </FormControl>
                        </Flex>
                    </form>
                  </CardBody>
                </Card>
                )
              }
        </Flex>
    </>
  )
}

export default AdvertiserForm