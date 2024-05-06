'use client'

import { Box } from '@chakra-ui/react';
import React from 'react'
import CampaignDetails from 'views/admin/campaigns/CampaignDetails';
import CampaignForm from 'views/admin/campaigns/CampaignForm';

interface CampaignActionProps {
    params : any
}

const page = ({params}: CampaignActionProps) => {

  const [action = "view", id = 0] = params.action;

  if(action == 'view') {
    return (
        <>
          <CampaignDetails id={id} />
        </>
    )
  }

  return (
    <>
        <Box>
            <CampaignForm action={action} id={id} />
        </Box>
    </>
  )
}

export default page