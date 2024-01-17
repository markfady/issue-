import prisma from '@/prisma/client'
import { Box,Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import React from 'react'
import delay from 'delay'
import IssueDetail from './IssueDetail'
import EditButton from './EditButton'
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
    <Grid columns={{initial:'1',md:'2'}} gap='5'>
    <Box>
    <IssueDetail issue={Issue}/>
    </Box>
    <Box>
    <EditButton id={Issue.id} />
    </Box>
    </Grid>
  )
}

export default IssueDetailPage