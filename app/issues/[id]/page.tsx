import prisma from '@/prisma/client'
import { Box,Container,Flex,Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import React, { cache } from 'react'
import delay from 'delay'
import IssueDetail from './IssueDetail'
import EditButton from './EditButton'
import DeleteIssueButton from './DeleteIssueButton'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/auth/authOptions'
import AssigneeSelect from './AssigneeSelect'
interface Props{
    params:{id:string}
}
const fetchUser=cache((issueId:number)=>{ //use this to cache data so the second request will get the cached data (used when you have double or more findUnique statements here and metadata)
  return prisma.issue.findUnique({where:{id:issueId}}) 
})
const IssueDetailPage = async ({params}:Props) => {
  const session = await getServerSession(authOptions)
    const Issue= await fetchUser(parseInt(params.id))
    if(!Issue)
    notFound()
    await delay(2000)
  return (
    <Container>

    <Grid columns={{initial:'1',sm:'5'}} gap='5'>
    <Box className='md:col-span-4'>
    <IssueDetail issue={Issue}/>
    </Box>

      {session&&(
            <Box>
  <Flex direction='column' gap='4'>
    <AssigneeSelect issue={Issue}/>
  <EditButton id={Issue.id} />
  <DeleteIssueButton issueId={Issue.id}/>
  </Flex>
  </Box>
      )
      }
    </Grid>
    </Container>
  )
}
export async function generateMetadata({params}:Props) {
  const issue= await fetchUser(parseInt(params.id))
  return {
    title:issue?.title,
    description:'Details of issue' + issue?.id
  }
}


export default IssueDetailPage