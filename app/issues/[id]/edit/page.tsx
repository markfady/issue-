import React from 'react'
import IssueForm from '../../_components/IssueForm'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'

interface Props{
    params:{id:string}
}
const EditIssuePage = async({params}:Props) => {
    const Issue=await prisma.issue.findUnique({
        where:{id:parseInt(params.id)}
    })
    if(!Issue) notFound()
  return (
   <IssueForm issue={Issue}/>
  )
}

export default EditIssuePage