"use client";
import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

// Mock data for demonstration
const mockData = [
  [
    "New York",
    "Sales",
    "Revenue",
    "USD",
    "2023",
    "1000",
    "1200",
    "1100",
    "1300",
    "1400",
    "1500",
    "1600",
    "1700",
    "1800",
    "1900",
    "2000",
    "2100",
  ],
  [
    "Los Angeles",
    "Marketing",
    "Clicks",
    "Count",
    "2023",
    "500",
    "600",
    null,
    "700",
    "750",
    "800",
    "850",
    "900",
    "950",
    "1000",
    "1050",
    "1100",
  ],
  // Add more mock data as needed
];

export default function Component({ params }: { params: { id: string } }) {
  const [completeData] = useState(mockData);
  const [gapsData] = useState([
    ...mockData,
    [
      "Chicago",
      "Support",
      "Tickets",
      "Count",
      "2023",
      "100",
      "120",
      "",
      "130",
      "140",
      "150",
      "160",
      "170",
      "180",
      "190",
      "200",
      "210",
    ],
  ]);
  const [duplicatesData] = useState([
    ...mockData,
    [
      "New York",
      "Sales",
      "Revenue",
      "USD",
      "2023",
      "1000",
      "1200",
      "1100",
      "1300",
      "1400",
      "1500",
      "1600",
      "1700",
      "1800",
      "1900",
      "2000",
      "2100",
    ],
  ]);
  const [anomaliesData] = useState([
    ...mockData,
    [
      "San Francisco",
      "Sales",
      "Revenue",
      "USD",
      "2023",
      "1000",
      "1200",
      "1100",
      "1300",
      "1400",
      "15000",
      "1600",
      "1700",
      "1800",
      "1900",
      "2000",
      "2100",
    ],
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", data: [] });

  const openModal = (title: any, data: any) => {
    setModalContent({ title, data });
    setModalOpen(true);
  };

  const renderTable = (data: any, showActions = false) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Location</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Unit</TableHead>
          <TableHead>Year</TableHead>
          <TableHead>Jan</TableHead>
          <TableHead>Feb</TableHead>
          <TableHead>Mar</TableHead>
          <TableHead>Apr</TableHead>
          <TableHead>May</TableHead>
          <TableHead>Jun</TableHead>
          <TableHead>Jul</TableHead>
          <TableHead>Aug</TableHead>
          <TableHead>Sep</TableHead>
          <TableHead>Oct</TableHead>
          <TableHead>Nov</TableHead>
          <TableHead>Dec</TableHead>
          {showActions && (
            <>
              <TableHead>Action 1</TableHead>
              <TableHead>Action 2</TableHead>
            </>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row: any, index: number) => (
          <TableRow key={index}>
            {row.map((cell: any, cellIndex: number) => (
              <TableCell key={cellIndex}>{cell}</TableCell>
            ))}
            {showActions && (
              <>
                <TableCell>
                  <Button variant="outline" size="sm">
                    Action 1
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    Action 2
                  </Button>
                </TableCell>
              </>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="container mx-auto p-4 space-y-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label>START DATE</Label>
          <Input type="date" placeholder="Start Date" />
        </div>

        <div className="space-y-2">
          <Label>END DATE</Label>
          <Input type="date" placeholder="End Date" />
        </div>

        <div className="space-y-2">
          <Label>LOCATION</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new-york">New York</SelectItem>
              <SelectItem value="los-angeles">Los Angeles</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>CATEGORIES</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sales">Sales</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Data Gaps</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={() => openModal("Data Gaps", gapsData)}>
              View Data Gaps
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Duplicates</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={() => openModal("Duplicates", duplicatesData)}>
              View Duplicates
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Anomalies</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={() => openModal("Anomalies", anomaliesData)}>
              View Anomalies
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="overflow-x-auto">{renderTable(completeData)}</div>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-[90vw] w-full">
          <DialogHeader>
            <DialogTitle>{modalContent.title}</DialogTitle>
          </DialogHeader>
          <div className="overflow-x-auto">
            {renderTable(modalContent.data, true)}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
