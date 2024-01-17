import { createIssueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  //Validate the title and description as schema You want the data shape
  const body = await request.json();
  const validation = createIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });
  //Check if Issue with id found or not
  const Issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  //if Not return error
  if (!Issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });
  //if found update the given id with the found id in DB with the new Data
  const updatedIssue = await prisma.issue.update({
    where: { id: Issue.id },
    data: {
      title: body.title,
      description: body.description,
    },
  });
  //Send the updated data to the server
  return NextResponse.json(updatedIssue);
}
