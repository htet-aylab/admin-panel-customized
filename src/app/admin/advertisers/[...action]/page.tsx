'use client'

import { Box } from '@chakra-ui/react';
import React from 'react'
import AdvertiserForm from 'views/admin/advertisers/AdvertiserForm';

interface AdvertisersActionProps {
    params : any
}

const page = ({params}: AdvertisersActionProps) => {

  const [action = "create", id = 0] = params.action;

  return (
    <>
        <Box>
            <AdvertiserForm action={action} id={id} />
        </Box>
    </>
  )
}

export default page