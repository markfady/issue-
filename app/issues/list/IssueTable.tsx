import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import Link from "@/app/components/Link";
import { Table } from "@radix-ui/themes";
import NextLink from "next/link";
import { Issue, Status } from '@prisma/client';
import { ArrowUpIcon } from "@radix-ui/react-icons";


export interface IssueQuery{
    status: Status;
    orderBy: keyof Issue;
    order?: "asc" | "desc"; //Add order to asc and desc
    page:string
  }
interface Props {
    searchParams: IssueQuery,
    issues:Issue[]
  }


export const IssueTable = ({searchParams,issues}:Props) => {
    
  return (
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
  )
}
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
export const columnNames=columns.map(column=>column.value)