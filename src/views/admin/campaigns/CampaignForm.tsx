'use client'

import { Box, Button, Card, CardBody, Flex, FormControl, FormLabel, Grid, GridItem, Heading, Icon, Input, InputGroup, InputRightElement, Select, SelectField, Text, useColorModeValue } from '@chakra-ui/react'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { axiosGet, axiosPatch, axiosPost } from 'utils/axios';
import { useRouter } from "next/navigation";
import TextField from 'components/inputs/TextField';
import { OPTIONS_PURPOSE } from 'utils/campaigns';
import SelectInputField from 'components/inputs/SelectInputField';
import NumberField from 'components/inputs/NumberField';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import moment from "moment";
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import Link from 'next/link';
import { dateTimeDiffinDays } from 'utils/date-format';
import { numberFormat } from 'utils/number-format';
registerPlugin(FilePondPluginImagePreview);

const DEFAULT_INPUTS = { 
  name: "",
  description: "",
  bidding_method: 2,
  advertiser_id: 0,
  purpose: 0,
  duration: "",
  start_date: new Date(),
  end_date: "",
  total_budget: 0,
  max_bid: 4,
  creative_type: 1,
  creative_img: "",
  creative_base64: true,
  call_to_action: "",
};

const CampaignForm = ({action = 'create', id = 0}) => {

  const textColor = useColorModeValue('navy.700', 'white');
  const [inputs, setInputs] = useState<any>(DEFAULT_INPUTS);
  const [loading, setLoading] = useState(false);
  const [advertisers, setAdvertisers] = useState([]);
  const router = useRouter();
  const [estimatedImpression, setEstimatedImpression] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(null);

  const handlerCreateForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);

      const name = moment().format("YYYY-MM-DDTHH:mm:ss");
      const description = `campaign-description-${name}`;
      const start_date = moment().format();
      const end_date = moment().add(inputs.duration, "days").format();

      const params = {
        ...inputs,
        name,
        description,
        start_date,
        end_date,
      };

      delete params.duration;
      delete params.creative_base64;

      if (params.max_bid > 0) {
        if (params.max_bid < 2) {
          throw new Error("Maximum Bid should be less then 2");
        }
      }

      if (!params.creative_img) {
        throw new Error("Please update your creative banner");
      }

      if (!params.call_to_action) {
        throw new Error("Please enter the landing page link");
      }

      await axiosPost(
        "admin/campaigns",
        params,
        (res) => {
          setLoading(false);
          toast.success("Campaign Created Successfully !");
          router.push("/admin/campaigns");
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

  const handlerEditForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);

      const start_date = moment(inputs.start_date).format();
      const end_date = moment(start_date).add(inputs.duration, "days").endOf("day").format();
      const params = {
        ...inputs,
        start_date,
        end_date,
      };

      if (!params.creative_base64) {
        delete params.creative_img;
      }

      delete params.name;
      delete params.description;
      delete params.bidding_method;
      delete params.duration;
      delete params.advertiser_id;
      delete params.creative_type;
      delete params.creative_base64;

      if (params.max_bid > 0) {
        if (params.max_bid < 2) {
          throw new Error("Maximum Bid should be less then 2");
        }
      }

      if (!params.call_to_action) {
        throw new Error("Please enter the landing page link");
      }

      await axiosPatch(
        `admin/campaigns/${id}`,
        params,
        () => {
          setLoading(false);
          toast.success("Campaign updated successfully!");
          router.push("/admin/campaigns");
        },
        (err) => {
          throw new Error(err.message);
        },
      );
    } catch (err:any) {
      setLoading(false);
      toast.error(err.message);
    }
  }

  const handlerStatusUpdateForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      await axiosPatch(
        "admin/campaigns/"+id+"/approve",
        {status: inputs?.status},
        (res) => {
          setLoading(false);
          toast.success("Campaign Status Updated Successfully !");
          router.push("/admin/campaigns");
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

  const fetchCampaign = async () => {
    await axiosGet(`admin/campaigns/${id}`, (res: any) => {
      const duration = dateTimeDiffinDays(res.start_date, res.end_date);

      setInputs({
        ...inputs,
        name: res.name,
        description: res.description,
        advertiser_id: res.advertiser_id,
        bidding_method: res.bidding_method,
        purpose: res.purpose,
        duration,
        start_date: res.start_date,
        end_date: res.end_date,
        total_budget: res.total_budget,
        max_bid: res.max_bid,
        creative_type: 1,
        creative_img: res.creative_img,
        creative_base64: false,
        call_to_action: res.call_to_action,
      });
    });
  };

  const fetchAdvertisers = async () => {
    await axiosGet(`admin/advertisers`, (res: any) => {
      setAdvertisers(res);
    });
  };

  useEffect(() => {
    fetchAdvertisers()
    if (action === "edit") {
      fetchCampaign();
    }
  }, []);

  const calculateEstimateImpression = () => {
    if (inputs.total_budget > 0 && inputs.max_bid > 0) {
      setEstimatedImpression((inputs.total_budget / inputs.max_bid) * 1000);
    }
  };

  useEffect(() => {
    calculateEstimateImpression();
  }, [inputs.total_budget, inputs.max_bid]);


  const handleFileUpload = (file: any) => {
    console.log("hi")
    if (!file) {
      setFileUploadError('Please select an image file.');
      return;
    }
  
    const allowedTypes = ['image/jpeg', 'image/png'];
    const maxSize = 150 * 1024; // 150 KB
  
    if (!allowedTypes.includes(file.type)) {
      setFileUploadError('Only PNG or JPG files are allowed.');
      return;
    }
  
    if (file.size > maxSize) {
      setFileUploadError('File size must be 150 KB or less.');
      return;
    }
  
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      setInputs((prevInputs:any) => ({
        ...prevInputs,
        creative_img: base64String,
      }));
      setFileUploadError(null);
      toast.success('Image uploaded successfully!');
    };
  
    reader.onerror = () => {
      setFileUploadError('Failed to read file.');
    };
  
    reader.readAsDataURL(file);
  };

  return (
    <>
        <Flex
            maxW={{ base: '100%', md: '80%' }}
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
                        {action == 'create' ? 'Create' : 'Update'} Campaign
                    </Heading>
                  </Box>
                  <form onSubmit={action == 'create' ? handlerCreateForm : handlerEditForm}>
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
                            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={3}>

                              {/* Purpose */}
                              <GridItem>
                                <SelectInputField 
                                  name='purpose'
                                  value={inputs.purpose}
                                  label='Select Purpose'
                                  placeholder='Select Purpose'
                                  onChange={handleSelectChange}
                                  options={OPTIONS_PURPOSE}
                                />
                              </GridItem>

                              {/* Advertisers */}
                              <GridItem>
                                <SelectInputField 
                                  name='advertiser_id'
                                  value={inputs.advertiser_id}
                                  label='Select Advertisers'
                                  placeholder='Select Advertisers'
                                  onChange={handleSelectChange}
                                  options={advertisers}
                                  disabled={action == 'edit'}
                                />
                              </GridItem>

                              {/* Budget */}
                              <GridItem>
                                <Card>
                                  <CardBody>
                                      <Text fontWeight={'bold'} fontSize={'20px'}>
                                        Ads Budget
                                      </Text>
                                      <Text fontWeight={'400'} fontSize={'16px'}>
                                        ${numberFormat(inputs.total_budget, 0)} over {inputs.duration} day(s)
                                      </Text>
                                  </CardBody>
                                </Card>
                              </GridItem>

                              {/* Estimated Impression */}
                              <GridItem>
                                <Card>
                                  <CardBody>
                                      <Text fontWeight={'bold'} fontSize={'20px'}>
                                        Est. impressions
                                      </Text>
                                      <Text fontWeight={'400'} fontSize={'16px'}>
                                        {estimatedImpression}
                                      </Text>
                                  </CardBody>
                                </Card>
                              </GridItem>

                              {/* Ads Budget */}
                              <GridItem>
                                <NumberField
                                  type={'number'}
                                  name='total_budget'
                                  label='Daily Budget'
                                  placeholder='$ 100'
                                  min={100}
                                  max={100000}
                                  value={inputs?.total_budget} 
                                  onChange={handlerInputs}
                                />
                              </GridItem>
                              
                              {/* Day Duration */}
                              <GridItem>
                                <NumberField 
                                  name='duration'
                                  label='Duration'
                                  type='number'
                                  isRequired={true}
                                  min={1}
                                  max={100}
                                  placeholder='10 Day(s)'
                                  value={inputs?.duration} 
                                  onChange={handlerInputs}
                                />
                              </GridItem>

                              {/* Call to action */}
                              <GridItem colSpan={2}>
                                {
                                  inputs.purpose == 2 ?
                                  (
                                    <Flex flexDirection={'column'} mb={'10px'}>
                                      <TextField 
                                        name='call_to_action'
                                        label='Twitter UserName'
                                        type='text'
                                        isRequired={true}
                                        placeholder='@username'
                                        value={inputs?.call_to_action} 
                                        onChange={handlerInputs}
                                      />  
                                      <Link style={{ margin: '0px 15px', color: "#2762c8" }} href={`https://twitter.com/intent/follow?screen_name=${inputs.call_to_action}`} target="_blank">
                                        {`https://twitter.com/intent/follow?screen_name=${inputs.call_to_action}`}
                                      </Link>
                                    </Flex>  
                                  ) : (
                                    <>
                                      <TextField 
                                        name='call_to_action'
                                        label='Landing page link (Website or social media link)'
                                        type='text'
                                        isRequired={true}
                                        placeholder='https://platform.aylab.io'
                                        value={inputs?.call_to_action} 
                                        onChange={handlerInputs}
                                      />  
                                    </>        
                                  )
                                }
                              </GridItem>

                              {/* Creative Image */}
                              <GridItem colSpan={2}>
                                <FormLabel>Upload Image</FormLabel>
                                <FilePond
                                  allowMultiple={false}
                                  maxFiles={1}
                                  labelIdle="Drop an image file here or click to browse"
                                  onupdatefiles={(fileItems) => {
                                    const file = fileItems && fileItems.length > 0 ? fileItems[0].file : null;
                                    handleFileUpload(file);
                                  }}
                                  acceptedFileTypes={['image/jpeg', 'image/png']}
                                />
                                {fileUploadError && (
                                  <Box color="red.500" fontSize="sm" mt={1}>
                                    {fileUploadError}
                                  </Box>
                                )}
                              </GridItem>

                            </Grid>
                              
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
                          Update Campaign Status
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
                                <option value='1'>Active</option>
                                <option value='0'>InActive</option>
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

export default CampaignForm