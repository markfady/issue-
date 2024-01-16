
import { NextRequest, NextResponse } from "next/server";
import {z} from 'zod'
import prisma from "@/prisma/client";
const  createIssueSchema=z.object({ //define the shape of body of the request
    title:z.string().min(1,'Title is required').max(255),
    description:z.string().min(1,'description is required')
})
export async function POST(request:NextRequest){
  const body=  await request.json();
 const validation= createIssueSchema.safeParse(body)
 if(!validation.success)
    return NextResponse.json(validation.error.format(),{status:400}) /*use format() to make it simpler in error handler */
 
 const newIssue= await prisma.issue.create({
    data:{title: body.title,description: body.description}
 })
 return NextResponse.json(newIssue,{status:201})
}