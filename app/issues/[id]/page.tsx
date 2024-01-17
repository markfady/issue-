import prisma from '@/prisma/client'
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
    <p>{Issue.id}</p>
    <p>{Issue.title}</p>
    <p>{Issue.description}</p>
    <p>{Issue.status}</p>
    <p>{Issue.createdAt.toDateString()}</p>
</>
  )
}

export default IssueDetailPage