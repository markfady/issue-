import { Flex, Card } from '@radix-ui/themes'
import React from 'react'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const LoadingIssueDetails = () => {

  return (
    <div className='max-w-xl'>
     <Skeleton/>
    <Flex gap='5' my='3'>
    <Skeleton width="5rem"/>
    <Skeleton width="5rem"/>
    </Flex>
    <Card className='prose' mt='4'>
    <Skeleton/>
    </Card>

    </div>
  )
}

export default LoadingIssueDetails