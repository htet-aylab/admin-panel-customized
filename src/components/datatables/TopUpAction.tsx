'use client'

import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { BiCheckCircle, BiXCircle} from "react-icons/bi";

interface TopUpActionProps{
    item: any,
    handleApprove: (id : number) => void,
    handleDecline: (id : number) => void,
    isApproved ?: boolean
}

const TopUpAction = ({item , handleApprove,handleDecline, isApproved } : TopUpActionProps) => {
  return (
    <>
        <Flex gap={'5px'} alignItems={'center'} h={'100%'}>
            {
                !isApproved && (
                    <>
                        <Text onClick={() => handleApprove(item.id)} color='purple.500' fontSize={'23px'} cursor={'pointer'}><BiCheckCircle /></Text>
                        <Text onClick={() => handleDecline(item.id)} color='red.500' fontSize={'23px'} cursor={'pointer'}><BiXCircle /></Text>
                    </>
                )
            }
        </Flex>
    </>
  )
}

export default TopUpAction