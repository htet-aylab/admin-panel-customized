'use client'
import { Button, Flex, Heading, Link, Text } from '@chakra-ui/react'
import React from 'react'

const NotFound = () => {
  return (
    <div>
        <Flex justifyContent={'center'} alignItems={'center'} w={'100%'} minH={'100vh'} flexDirection={'column'} gap={'20px'}>
            <Heading fontWeight={'bold'} fontSize={{ base: '30px', md: "60px", lg: '120px' }}>
              404
            </Heading>
            <Text>Dude ! You are looking for doesn't exist</Text>
            <Link href='/admin/dashboard'>
              <Button variant='brand'>Go Back</Button>
            </Link>
        </Flex>
    </div>
  )
}

export default NotFound