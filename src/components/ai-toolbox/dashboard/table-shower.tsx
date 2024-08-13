"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PrincipleChecklist } from "@/constants/dashboard";
import { usePageContext } from "@/context/pdf-page-provider";

const TableDataShow = ({
  key,
  value,
  idx,
}: {
  key: any;
  value: PrincipleChecklist;
  idx: number;
}) => {
  const { setPage } = usePageContext();

  return (
    <div
      className="flex flex-col my-4 p-4 py-6 rounded-md bg-yellow-950/15"
      key={key}
    >
      <h1 className="mb-4">Principles {idx + 1}</h1>
      <p className="text-xl font-semibold">BRSR Principles</p>
      <p className="text-sm text-muted-foreground">{value.brsr}</p>
      <p className="text-xl font-semibold mt-4">SDG Goals</p>
      <p className="text-sm text-muted-foreground">{value.sdg}</p>
      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead>Indicators</TableHead>
            <TableHead>Gri Mapping</TableHead>
            <TableHead>Assessment</TableHead>
            <TableHead>Pages</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {value.indicator_gri_and_assessment.length > 0 &&
            value.indicator_gri_and_assessment.map((value, idx: number) => (
              <TableRow key={idx}>
                <TableCell>{value.ind}</TableCell>
                <TableCell>{value.gri}</TableCell>
                <TableCell>{value.assessment}</TableCell>
                <TableCell className="flex space-x-2">
                  {(value.pages &&
                    value.pages.map((item) => (
                      <p
                        onClick={() => setPage(item - 1)}
                        className="cursor-pointer hover:text-blue-400"
                      >
                        {item}
                      </p>
                    ))) || <p>0</p>}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableDataShow;
