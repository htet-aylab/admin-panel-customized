'use client'

import { Flex, Text } from '@chakra-ui/react'
import Link from 'next/link';
import React from 'react'
import { BiEdit, BiTrash } from "react-icons/bi";
import { FaEye } from "react-icons/fa6";

interface ActionProps{
    item: any,
    handleDelete?: (id : number) => void,
    isEdit?: boolean,
    isView?: boolean,
    isDelete?: boolean,
    editLink?: string,
    viewLink?: string,
}

const ActionCell = ({item , isEdit = false,isView = false, editLink= '',viewLink= '', isDelete = false , handleDelete} : ActionProps) => {
  return (
    <>
        <Flex gap={'5px'} alignItems={'center'} h={'100%'}>
            {
                isEdit && (
                    <Link href={editLink}>
                        <Text color='orange.500' fontSize={'23px'} cursor={'pointer'}><BiEdit /></Text>
                    </Link>
                )
            }
            {
                isView && (
                    <Link href={viewLink}>
                        <Text color='purple.500' fontSize={'23px'} cursor={'pointer'}><FaEye /></Text>
                    </Link>
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