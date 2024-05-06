'use client'

import { Box } from '@chakra-ui/react';
import React from 'react'
import UserForm from 'views/admin/users/UserForm';

interface UsersActionProps {
    params : any
}

const page = ({params}: UsersActionProps) => {

  const [action = "create", id = 0] = params.action;

  return (
    <>
        <Box>
            <UserForm action={action} id={id} />
        </Box>
    </>
  )
}

export default page