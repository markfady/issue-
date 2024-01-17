import React from "react";
import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import prisma from "@/prisma/client";
const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();
  return (
    <div>
      <div>
        <Button>
          <Link href="issues/new">New Issue</Link>
        </Button>
      </div>

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
                {issue.title}
                <div className="block md:hidden mt-2">{issue.status}</div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.status}
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
