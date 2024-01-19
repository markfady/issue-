import prisma from '@/prisma/client'
import { Box,Container,Flex,Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import React from 'react'
import delay from 'delay'
import IssueDetail from './IssueDetail'
import EditButton from './EditButton'
import DeleteIssueButton from './DeleteIssueButton'
interface Props{
    params:{id:string}
}

const IssueDetailPage = async ({params}:Props) => {
    const Issue= await prisma.issue.findUnique({ //Go to check the id of the issue with Prisma (DataBase)
        where:{id:parseInt(params.id)} 
    })
    if(!Issue)
    notFound()
    await delay(2000)
  return (
    <Container>

    <Grid columns={{initial:'1',sm:'5'}} gap='5'>
    <Box className='md:col-span-4'>
    <IssueDetail issue={Issue}/>
    </Box>
    <Box>
    <Flex direction='column' gap='4'>
    <EditButton id={Issue.id} />
    <DeleteIssueButton issueId={Issue.id}/>
    </Flex>
    </Box>
    </Grid>
    </Container>
  )
}

export default IssueDetailPage