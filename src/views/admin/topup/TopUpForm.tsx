'use client'

import { Box, Button, Card, CardBody, Flex, FormControl, Heading,  Select, Text, useColorModeValue } from '@chakra-ui/react'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { axiosGet, axiosPost } from 'utils/axios';
import { useRouter } from "next/navigation";
import SelectInputField from 'components/inputs/SelectInputField';
import NumberField from 'components/inputs/NumberField';

const TopUpForm = ({action = 'create', id = 0}) => {

  const textColor = useColorModeValue('navy.700', 'white');
  const [inputs, setInputs] = useState({ advertiser_id: "", amount: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [advertisers, setAdvertisers] = useState([]);
  const [page, setPage] = useState(1);

  const handlerForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);

      if (!inputs.advertiser_id) {
        throw new Error("Please enter advertiser");
      }

      if (!inputs.amount) {
        throw new Error("Please enter the amount");
      }

      await axiosPost(
        "admin/topup",
        inputs,
        (res) => {
          setLoading(false);
          toast.success("Top Up Successfully !");
          router.push("/admin/topup");
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

  const fetchAdvertisers = async () => {
    await axiosGet(`admin/advertisers?page=${page}&limit=10`, (res: any) => {
      if(page == 1){
        setAdvertisers(res.data);
      }
      else{
        setAdvertisers(prev => {
          if(prev.length == res.total_count){
            return prev;
          }
          return [...prev,...res.data];
        });
      }
    });
  };

  useEffect(() => {
    fetchAdvertisers()
  },[page])

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
                        Top Up
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

                            {/* Advertisers */}
                            <SelectInputField
                                name='advertiser_id'
                                value={inputs.advertiser_id}
                                label='Select Advertisers'
                                placeholder='Select Advertisers'
                                onChange={handleSelectChange}
                                options={advertisers}
                                disabled={action == 'edit'}
                            />
                            <Text onClick={() => setPage(page+1)} color={'brand.500'} mb={'24px'} cursor={'pointer'}>Load More</Text>

                            <NumberField
                                  type={'number'}
                                  name='amount'
                                  label='Amount'
                                  placeholder='$ 100'
                                  min={0}
                                  max={100000}
                                  value={inputs?.amount} 
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
                                Top Up
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

export default TopUpForm