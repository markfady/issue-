import prisma from "@/prisma/client";
import IssuesAction from "./IssuesAction";
import { Status } from "@prisma/client";
import Pagination from "@/app/components/Pagination";
import { IssueQuery, IssueTable } from "./IssueTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";

interface Props {
  searchParams: IssueQuery 
}
const IssuesPage = async ({ searchParams }: Props) => {
  console.log("searchParams"+searchParams)
  console.log(searchParams)

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
    <Flex direction="column" gap='3'>
      <IssuesAction />
      <IssueTable searchParams={searchParams} issues={issues}/>
      <Pagination
      pageSize={pageSize}
      currentPage={page}
      itemCount={IssueCount}
      />

    </Flex>
  );
};
export const metadata:Metadata={
  title:'Issue Tracker-Issue List',
  description:'View all project issues'
}

export default IssuesPage;
