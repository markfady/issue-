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
    //We check with this issue Props in the IssueForm Page , if it's found send patch request to server (cause this mean the id of issue is found to be edited) 
    //if not send new Issue Button and post to server in (New Issue page)
   <IssueForm issue={Issue}/>
  )
}

export default EditIssuePage