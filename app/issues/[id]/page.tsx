import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import prisma from '@/prisma/client'
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import delay from 'delay'
import { Pencil2Icon } from '@radix-ui/react-icons'
import Link from 'next/link'
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
<>
    <Grid columns={{initial:'1',md:'2'}} gap='5'>
    <Box>
    <Heading>{Issue.title}</Heading>
    <Flex gap='5' my='3'>
    <IssueStatusBadge status={Issue.status}/>
    <Text>{Issue.createdAt.toDateString()}</Text>
    </Flex>
    <Card className='prose' mt='4'>
    <ReactMarkdown>{Issue.description}</ReactMarkdown>
    </Card>
    </Box>
    <Box>
      <Button>
        <Pencil2Icon/>
        <Link href={`/issues/${Issue.id}/edit`}>Edit Issue </Link>
      </Button>
      
    </Box>
    </Grid>
</>
  )
}

export default IssueDetailPage