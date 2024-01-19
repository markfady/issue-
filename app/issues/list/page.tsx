import React from "react";
import { Table } from "@radix-ui/themes";
import prisma from "@/prisma/client";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import delay from "delay";
import IssuesAction from "./IssuesAction";
import Link from "@/app/components/Link";
const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();
  await delay(2000)
  return (
    <div>
     <IssuesAction/>

      <Table.Root variant="surface" className="mt-5 ">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell className="sm:text-center md:text-left lg:text-left xl:text-left 2xl:text-left text-center">
              Issue
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              createdAt
            </Table.ColumnHeaderCell>
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
