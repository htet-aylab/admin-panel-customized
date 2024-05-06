'use client'
import { Badge, Card, CardBody, CardHeader, Flex, Heading, Image, Link, Text } from '@chakra-ui/react';
import DetailSkeleton from 'components/loading/DetailSkeleton';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { axiosDelete, axiosGet } from 'utils/axios';
import {
    ListItem,
    UnorderedList,
  } from '@chakra-ui/react'
import { BiEdit, BiTrash } from 'react-icons/bi';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

const CampaignDetails = ({id}:{id:number|string}) => {
    const [campaign, setCampaign] = useState<any>({})
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const fetchCampaign = async () => {
        try {
            setLoading(true)
            await axiosGet(`admin/campaigns/${id}`, (res: any) => {
                setCampaign(res)
                setLoading(false)
            });
        } catch (error:any) {
            toast.error(error.message)
        }
    };

    useEffect(() => {
    fetchCampaign();
    }, [id]);

    const handleDelete = async (id : any) => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            await axiosDelete(
              `admin/campaigns/${id}`,
              (res : any) => {
                toast.success(res.message);
              },
              (res : any) => {
                router.push('/admin/campaigns')
                toast.success(res.message);
              },
            );
          }
        });
      }

    if(loading){
        return (
            <DetailSkeleton />
        )
    }

  return (
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
            
            <CardHeader>
                <Flex alignItems={'center'} justifyContent={'space-between'}>
                    <Flex alignItems={'center'} gap={'10px'}>
                        <Text fontWeight={'600'} fontSize={'20px'}>
                            {campaign?.name}
                        </Text>
                        {
                            campaign.status == 0 ?
                            <Badge colorScheme='red'>InActive</Badge> :
                            <Badge colorScheme='green'>Active</Badge>
                        }
                    </Flex>
                    <Flex alignItems={'center'} gap={'10px'}>
                        <Link href={'/admin/campaigns/edit/'+campaign.id}>
                            <Text color='dark.500' fontSize={'23px'} cursor={'pointer'}><BiEdit /></Text>
                        </Link>
                        <Text onClick={() => handleDelete(campaign.id)} color='dark.500' fontSize={'23px'} cursor={'pointer'}><BiTrash /></Text>
                    </Flex>
                </Flex>
            </CardHeader>

            <CardBody w={'100%'}>
            <UnorderedList styleType="none" padding="0">
                <ListItem borderBottom="1px solid #ccc" paddingBottom="10px" marginBottom="10px">
                    <Text>
                        <strong>Advertiser Id :</strong> {campaign.advertiser_id}
                    </Text>
                </ListItem>
                <ListItem borderBottom="1px solid #ccc" paddingBottom="10px" marginBottom="10px">
                    <Text>
                        <strong>Balance:</strong> $ {campaign.balance}
                    </Text>
                </ListItem>
                <ListItem borderBottom="1px solid #ccc" paddingBottom="10px" marginBottom="10px">
                    <Text>
                        <strong>Total Budget:</strong> $ {campaign.total_budget}
                    </Text>
                </ListItem>
                <ListItem borderBottom="1px solid #ccc" paddingBottom="10px" marginBottom="10px">
                    <Text>
                        <strong>Purpose:</strong> {campaign.purpose}
                    </Text>
                </ListItem>
                <ListItem borderBottom="1px solid #ccc" paddingBottom="10px" marginBottom="10px">
                    <Text>
                        <strong>Left Balance:</strong> $ {campaign.left_balance}
                    </Text>
                </ListItem>
                <ListItem borderBottom="1px solid #ccc" paddingBottom="10px" marginBottom="10px">
                    <Text>
                        <strong>Start Date:</strong> {campaign.start_date}
                    </Text>
                </ListItem>
                {
                    !campaign.no_end_date && (
                        <ListItem borderBottom="1px solid #ccc" paddingBottom="10px" marginBottom="10px">
                            <Text>
                                <strong>End Date:</strong> {campaign.end_date}
                            </Text>
                        </ListItem>
                    )
                }
                <ListItem borderBottom="1px solid #ccc" paddingBottom="10px" marginBottom="10px">
                    {
                        campaign.purpose == 2 ?
                        <Text>
                            <strong>Call To action:</strong> 
                            <Link style={{ margin: '0px 15px', color: "#2762c8" }} href={`https://twitter.com/intent/follow?screen_name=${campaign.call_to_action}`} target="_blank">
                                {`https://twitter.com/intent/follow?screen_name=${campaign.call_to_action}`}
                            </Link>
                        </Text> :
                        <Text>
                            <strong>Call To action:</strong> 
                            <Link style={{ margin: '0px 15px', color: "#2762c8" }} href={campaign.call_to_action} target="_blank">
                                {campaign.call_to_action}
                            </Link>
                        </Text>
                    }
                </ListItem>
                <Text fontWeight={'bold'} my={'10px'}>Creative Image</Text>
                <Image src={campaign.creative_img} alt='Ads Platform' />
            </UnorderedList>
            </CardBody>
        </Card>
    </Flex>
  )
}

export default CampaignDetails