import React from 'react'
import { Box, Flex, Skeleton, SkeletonCircle, SkeletonText, Stack } from '@chakra-ui/react'

const DetailSkeleton = () => {
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
        <Stack>
            <Skeleton height='20px' />
            <Skeleton height='20px' />
            <Skeleton height='20px' />
        </Stack>
        <Box padding='6' boxShadow='lg' bg='white'>
            <SkeletonCircle size='10' />
            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
        </Box>
    </Flex>
    </>
  )
}

export default DetailSkeleton