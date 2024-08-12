import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TableDataShow = ({
  key,
  value,
  idx,
}: {
  key: any;
  value: any;
  idx: number;
}) => {
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {value.indicator_gri_and_assessment.length > 0 &&
            value.indicator_gri_and_assessment.map(
              (value: any, idx: number) => (
                <TableRow key={idx}>
                  <TableCell>{value.ind}</TableCell>
                  <TableCell>{value.gri}</TableCell>
                  <TableCell>{value.assessment}</TableCell>
                </TableRow>
              ),
            )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableDataShow;
