import React from "react";
import { Table } from "@radix-ui/themes";
import prisma from "@/prisma/client";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import delay from "delay";
import IssuesAction from "./IssuesAction";
import Link from "@/app/components/Link";
import { Issue, Status } from "@prisma/client";
import NextLink from 'next/link'
import { ArrowUpIcon } from "@radix-ui/react-icons";
interface Props{
  searchParams:{status:Status , orderBy:keyof Issue}
}
const IssuesPage = async ({searchParams}:Props) => {
  const columns:{label:string,value:keyof Issue,className?:string}[]=[
    {label:'Issue',value:'title', className:"sm:text-center md:text-left lg:text-left xl:text-left 2xl:text-left text-center"},
    {label:'status',value:'status',className:"hidden md:table-cell"},
    {label:'CreatedAt',value:'createdAt',className:"hidden md:table-cell"},
  ]
  const statuses=Object.values(Status) // method is used to get an array of the enum values.
  const status=statuses.includes(searchParams.status)? searchParams.status:undefined; //checks if the searchParams.status is a valid status by using the includes method on the statuses array

  const issues = await prisma.issue.findMany({ //uses Prisma to query the database and fetch a list of issues based on the specified status
    where:{
      status
    }
  });
 
  await delay(2000)
  return (
    <div>
     <IssuesAction/>
      <Table.Root variant="surface" className="mt-5 ">
        <Table.Header>
          <Table.Row>
            {columns.map((column)=>(
              <Table.ColumnHeaderCell key={column.value}>
                <NextLink href={
                  {query:{...searchParams,orderBy:column.value}}
                }>
                {column.label}
                </NextLink>
                {column.value===searchParams.orderBy&&<ArrowUpIcon className="inline"/>}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell className="sm:text-center md:text-left lg:text-left xl:text-left 2xl:text-left text-center">
                <Link href={`/issues/${issue.id}`}> 
                  {issue.title}
                  </Link>
                <div className="block md:hidden mt-2">
                  <IssueStatusBadge status={issue.status}/>
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
              <IssueStatusBadge status={issue.status}/>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default IssuesPage;
