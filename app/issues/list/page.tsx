import React from "react";
import { Table } from "@radix-ui/themes";
import prisma from "@/prisma/client";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import IssuesAction from "./IssuesAction";
import Link from "@/app/components/Link";
import { Issue, Status } from "@prisma/client";
import NextLink from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from "@/app/components/Pagination";
interface Props {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
    order?: "asc" | "desc";
    page:string
  }; //Add order to asc and desc
}
const IssuesPage = async ({ searchParams }: Props) => {
  console.log("searchParams"+searchParams)
  console.log(searchParams)
  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    {
      label: "Issue",
      value: "title",
      className:
        "sm:text-center md:text-left lg:text-left xl:text-left 2xl:text-left text-center",
    },
    { label: "status", value: "status", className: "hidden md:table-cell" },
    {
      label: "CreatedAt",
      value: "createdAt",
      className: "hidden md:table-cell",
    },
  ];
  const statuses = Object.values(Status); // method is used to get an array of the enum values.

  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined; //checks if the searchParams.status is a valid status by using the includes method on the statuses array

    const page=parseInt(searchParams.page) ||1;
    const pageSize=10;
  const issues = await prisma.issue.findMany({
    //uses Prisma to query the database and fetch a list of issues based on the specified status
    where: {
      status,
    },
    orderBy: { [searchParams.orderBy]: searchParams.order }, // The Prisma query uses the orderBy option to sort the fetched issues,
    skip:(page-1)*pageSize,//number of record to skip(so it goes to database and switch the next items)
    take:pageSize //number of records to fetch
  });
const IssueCount=await prisma.issue.count({where: {status}}) //take count of issues from the DataBase
  return (
    <div>
      <IssuesAction />
      <Table.Root variant="surface" className="mt-5 ">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell key={column.value} className={column.className}>
                {/*The sorting logic is implemented using the NextLink components, which generate links to update the query parameters  */}
                <NextLink
                  href={{
                    query: {
                      ...searchParams,
                      orderBy: column.value,
                      order:
                        column.value === searchParams.orderBy
                          ? searchParams.order === "asc"
                            ? "desc"
                            : "asc"
                          : "asc",
                    },
                  }}
                >
                  {column.label}
                </NextLink>
                {/* if searchParams.order is equal to "asc". The class rotate-180 is often used to visually represent that something is rotated by 180 degrees.*/}
                {column.value === searchParams.orderBy && (
                  <ArrowUpIcon
                    className={`inline ${
                      searchParams.order === "asc" ? "rotate-180" : ""
                    }`}
                  />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {/*The sorted issues are then mapped to table rows */}
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell className="sm:text-center md:text-left lg:text-left xl:text-left 2xl:text-left text-center">
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden mt-2">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination
      pageSize={pageSize}
      currentPage={page}
      itemCount={IssueCount}
      />

    </div>
  );
};

export default IssuesPage;
