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
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { Checkbox } from "@/components/ui/checkbox";
import { useAppContext } from "@/context/pdf-page-provider";

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

interface Action {
  name: string | null;
  action: any | null;
}

type ModalProps = {
  title: string;
  data: any[];
  actions: Action[];
};

export default function Component({ params }: { params: { id: string } }) {
  const [completeData, setCompleteData] = useState(mockData);
  const [gapsData, setGapsData] = useState([
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
  const [duplicatesData, setDuplicatesData] = useState([
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
  const [anomaliesData, setAnomaliesData] = useState([
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

  const [loading, setLoading] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ModalProps>({
    title: "",
    data: [],
    actions: [],
  });

  const openModal = (title: any, data: any, actions: Action[]) => {
    setModalContent({ title, data, actions });
    setModalOpen(true);
  };

  const handleAction1Click = async (type: number, row_index: any) => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/app5/");
      switch (type) {
        case 1:
          // data gap handling
          break;

        case 2:
          // duplicates handling
          break;

        case 3:
          // anomalies handling
          break;

        default:
          break;
      }
    } catch (err) {
      console.log(err);
      toast({
        title: "Error while handling data manipulation events",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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
            <Button
              onClick={() =>
                openModal("Data Gaps", gapsData, [
                  {
                    name: "Drop",
                    action: () => console.log("drop"),
                  },
                  { name: "Mean", action: () => console.log("mean") },
                  { name: "Median", action: () => console.log("median") },
                  { name: "Mode", action: () => console.log("mode") },
                  {
                    name: "Placeholder",
                    action: () => console.log("placeholder"),
                  },
                ])
              }
            >
              View Data Gaps
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Duplicates</CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() =>
                openModal("Duplicates", duplicatesData, [
                  { name: "Drop", action: () => console.log("drop") },
                ])
              }
            >
              View Duplicates
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Anomalies</CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() =>
                openModal("Anomalies", anomaliesData, [
                  { name: "Drop", action: () => console.log("drop") },
                ])
              }
            >
              View Anomalies
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="overflow-x-auto">{renderTable(completeData, [])}</div>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-[90vw] w-full">
          <DialogHeader>
            <DialogTitle>{modalContent.title}</DialogTitle>
          </DialogHeader>
          <div className="overflow-x-auto">
            {renderTable(modalContent.data, modalContent.actions, true)}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const renderTable = (data: any, actions: Action[], showActions = false) => {
  const { handleDataContext, setHandleDataContext } = useAppContext();

  return (
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
          {showActions &&
            actions.length > 0 &&
            actions.map((item, index) => (
              <TableHead key={index}>{item.name}</TableHead>
            ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row: any, index: number) => (
          <TableRow
            onClick={() => console.log(index, handleDataContext[index])}
            key={index}
          >
            {row.map((cell: any, cellIndex: number) => (
              <TableCell key={cellIndex}>{cell}</TableCell>
            ))}

            {showActions &&
              actions.length > 0 &&
              actions.map((item, actionIndex: number) => (
                <TableCell className="text-center" key={actionIndex}>
                  <Checkbox
                    // disabled function check
                    disabled={
                      handleDataContext && handleDataContext[index] && true
                    }
                    onCheckedChange={(check) => {
                      setHandleDataContext({
                        ...handleDataContext,
                        [index]: check ? index : null,
                      });
                      console.log(handleDataContext);
                    }}
                  />
                </TableCell>
              ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
