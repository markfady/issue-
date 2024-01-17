import { Table } from "@radix-ui/themes";
import React from "react";
import IssueStatusBadge from "../components/IssueStatusBadge";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import IssuesAction from "./IssuesAction";
const LoadingIssuePage = () => {
  const issues = [1, 2, 3, 4, 5];
  return (
    <>
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
          <Table.Row key={issue}>
            <Table.Cell className="sm:text-center md:text-left lg:text-left xl:text-left 2xl:text-left text-center">
              <Skeleton />
              <div className="block md:hidden mt-2">
                <Skeleton />
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <Skeleton />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <Skeleton />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
    </>
  );
};

export default LoadingIssuePage;
