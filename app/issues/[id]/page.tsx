import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import prisma from '@/prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import React from 'react'

interface Props{
    params:{id:string}
}

const IssueDetailPage = async ({params}:Props) => {
    const Issue= await prisma.issue.findUnique({ //Go to check the id of the issue with Prisma (DataBase)
        where:{id:parseInt(params.id)} 
    })
    if(!Issue)
    notFound()
  return (
<>

    <Heading>{Issue.title}</Heading>
    <Flex gap='5' my='3'>
    <IssueStatusBadge status={Issue.status}/>
    <Text>{Issue.createdAt.toDateString()}</Text>
    </Flex>
    <Card>
    <p>{Issue.description}</p>
    </Card>

</>
  )
}

export default IssueDetailPage