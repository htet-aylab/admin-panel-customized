'use client'

import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { BiCheckCircle, BiXCircle} from "react-icons/bi";

interface TopUpActionProps{
    item: any,
    handleStatusUpdate: (id : number, status: number) => void,
    isApproved ?: boolean
}

const TopUpAction = ({item , handleStatusUpdate, isApproved } : TopUpActionProps) => {
  return (
    <>
        <Flex gap={'5px'} alignItems={'center'} h={'100%'}>
            {
                !isApproved && (
                    <>
                        <Text onClick={() => handleStatusUpdate(item.id,1)} color='purple.500' fontSize={'23px'} cursor={'pointer'}><BiCheckCircle /></Text>
                        <Text onClick={() => handleStatusUpdate(item.id,2)} color='red.500' fontSize={'23px'} cursor={'pointer'}><BiXCircle /></Text>
                    </>
                )
            }
        </Flex>
    </>
  )
}

export default TopUpAction