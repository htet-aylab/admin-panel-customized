'use client'

import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { BiEdit, BiTrash } from "react-icons/bi";

interface ActionProps{
    item: any,
    handleEdit?: (id : number) => void,
    handleDelete?: (id : number) => void,
    isEdit?: boolean,
    isDelete?: boolean,
}

const ActionCell = ({item , handleEdit , isEdit = false, isDelete = false , handleDelete} : ActionProps) => {
  return (
    <>
        <Flex gap={'5px'} alignItems={'center'} h={'100%'}>
            {
                isEdit && (
                    <Text onClick={() => handleEdit(item.id)} color='orange.500' fontSize={'23px'} cursor={'pointer'}><BiEdit /></Text>
                )
            }
            {
                isDelete && (
                    <Text onClick={() => handleDelete(item.id)} color='red.500' fontSize={'23px'} cursor={'pointer'}><BiTrash /></Text>
                )
            }
        </Flex>
    </>
  )
}

export default ActionCell