"use client";
import React, { useEffect, useMemo } from "react";
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
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { Checkbox } from "@/components/ui/checkbox";
import { IExcelProcessingData, useAppContext } from "@/context/app-provider";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { extractData } from "@/helpers/data-processing";

// Mock data for demonstration
const mockData = [
  [
    "New York",
    "Sales",
    "Revenue",
    "USD",
    "2024",
    1431,
    2341,
    1567,
    1987,
    2198,
    2456,
    2789,
    3012,
    3211,
    3412,
    3613,
    3814,
  ],
  [
    "Los Angeles",
    "Marketing",
    "Expenses",
    "EUR",
    "2023",
    1000,
    2000,
    3000,
    4000,
    5000,
    6000,
    7000,
    8000,
    9000,
    10000,
    11000,
    12000,
  ],
  [
    "Chicago",
    "Operations",
    "Profit",
    "GBP",
    "2022",
    500,
    1000,
    1500,
    2000,
    2500,
    3000,
    3500,
    4000,
    4500,
    5000,
    5500,

    6500,
  ],
  [
    "Houston",
    "Finance",
    "Loss",
    "JPY",
    "2021",
    200,
    400,
    600,
    800,
    1000,
    1200,
    1400,
    1600,
    1800,

    2200,
    2400,
    2600,
  ],
  [
    "Phoenix",
    "HR",
    "Assets",
    "CNY",
    "2020",
    100,
    200,
    300,
    500,
    600,
    700,
    800,
    900,
    1000,
    1100,
    1200,
    1300,
  ],
  [
    "New York",
    "Sales",
    "Revenue",
    "USD",
    "2024",
    1431,
    2341,
    1567,
    1987,
    2198,
    2456,
    2789,
    3012,
    3211,
    3412,
    3613,
    3814,
  ],
  [
    "Los Angeles",
    "Marketing",
    "Expenses",
    "EUR",
    "2023",
    1000,
    2000,
    3000,
    4000,
    5000,
    6000,
    7000,
    8000,
    9000,
    10000,
    11000,
    12000,
  ],
  [
    "Chicago",
    "Operations",
    "Profit",
    "GBP",
    "2022",
    500,
    1000,
    1500,
    2000,
    2500,
    3000,
    3500,
    4000,
    4500,
    5000,
    5500,

    6500,
  ],
  [
    "Houston",
    "Finance",
    "Loss",
    "JPY",
    "2021",
    200,
    400,
    600,
    800,
    1000,
    1200,
    1400,
    1600,
    1800,

    2200,
    2400,
    2600,
  ],
  [
    "Phoenix",
    "HR",
    "Assets",
    "CNY",
    "2020",
    100,
    200,
    300,
    500,
    600,
    700,
    800,
    900,
    1000,
    1100,
    1200,
    1300,
  ],
  [
    "New York",
    "Sales",
    "Revenue",
    "USD",
    "2024",
    1431,
    2341,
    1567,
    1987,
    2198,
    2456,
    2789,
    3012,
    3211,
    3412,
    3613,
    3814,
  ],
  [
    "Los Angeles",
    "Marketing",
    "Expenses",
    "EUR",
    "2023",
    1000,
    2000,
    3000,
    4000,
    5000,
    6000,
    7000,
    8000,
    9000,
    10000,
    11000,
    12000,
  ],
  [
    "Chicago",
    "Operations",
    "Profit",
    "GBP",
    "2022",
    500,
    1000,
    1500,
    2000,
    2500,
    3000,
    3500,
    4000,
    4500,
    5000,
    5500,

    6500,
  ],
  [
    "Houston",
    "Finance",
    "Loss",
    "JPY",
    "2021",
    200,
    400,
    600,
    800,
    1000,
    1200,
    1400,
    1600,
    1800,

    2200,
    2400,
    2600,
  ],
  [
    "Phoenix",
    "HR",
    "Assets",
    "CNY",
    "2020",
    100,
    200,
    300,
    500,
    600,
    700,
    800,
    900,
    1000,
    1100,
    1200,
    1300,
  ],
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

type OperableData = {
  type: "gaps" | "duplicates" | "anomalies";
  data: any[][];
  count: number;
  foreGroundText: string;
};

// const operableData: OperableData[] = [
//   {
//     type: "gaps",
//     data: [
//       [
//         "New York",
//         "Sales",
//         "Revenue",
//         "USD",
//         "2024",
//         1431,
//         1567,
//         1987,
//         2198,
//         2456,
//         2789,
//         3012,
//         3211,
//         3412,
//         3613,
//         3814,
//         4015,
//       ],
//       [
//         "Chicago",
//         "IT",
//         "Profit",
//         "GBP",
//         "2026",
//         1298,
//         1421,
//         1549,
//         1682,
//         1821,
//         1966,
//         2274,
//         2437,
//         2606,
//         2781,
//         2962,
//         3151,
//       ],
//       [
//         "Houston",
//         "Finance",
//         "Growth",
//         "JPY",
//         "2027",
//         2119,
//         2293,
//         2473,
//         2661,
//         2857,
//         3063,
//         3505,
//         3743,
//         3993,
//         4255,
//         4529,
//         4817,
//       ],
//       [
//         "Seattle",
//         "HR",
//         "Loss",
//         "CNY",
//         "2023",
//         1567,
//         1712,
//         1863,
//         2022,
//         2191,
//         2369,
//         2557,
//         2756,
//         2967,
//         3191,
//         3682,
//         3951,
//       ],
//     ],
//     count: 4,
//     foreGroundText: "GAPS",
//   },
//   {
//     type: "duplicates",
//     data: [
//       [
//         "Seattle",
//         "HR",
//         "Loss",
//         "CNY",
//         "2023",
//         1567,
//         1712,
//         1863,
//         2191,
//         2369,
//         2557,
//         2756,
//         2967,
//         3191,
//         3429,
//         3682,
//         3951,
//       ],
//     ],
//     count: 1,
//     foreGroundText: "DUPLICATES",
//   },
//   {
//     type: "anomalies",
//     data: [
//       [
//         "New York",
//         "Sales",
//         "Revenue",
//         "USD",
//         "2024",
//         1431,
//         2341,
//         1987,
//         2198,
//         2456,
//         2789,
//         3012,
//         3211,
//         3412,
//         3613,
//         3814,
//         4015,
//       ],
//       [
//         "Los Angeles",
//         "Marketing",
//         "Expenses",
//         "EUR",
//         "2025",
//         1876,
//         2012,
//         2145,
//         2289,
//         2434,
//         2581,
//         2732,
//         3041,
//         3201,
//         3364,
//         3529,
//         3697,
//       ],
//       [
//         "Chicago",
//         "IT",
//         "Profit",
//         "GBP",
//         "2026",
//         1298,
//         1421,
//         1549,
//         1682,
//         1821,
//         2117,
//         2274,
//         2437,
//         2606,
//         2781,
//         2962,
//         3151,
//       ],
//     ],
//     count: 3,
//     foreGroundText: "ANOMALIES",
//   },
// ];

export default function Component({ params }: { params: { id: string } }) {
  const [completeData, setCompleteData] = useState(mockData);
  const [startDate, setStartDate] = React.useState<Date>();
  const [endDate, setEndDate] = React.useState<Date>();
  const [operableData, setOperableData] = useState<OperableData[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ModalProps>({
    title: "",
    data: [],
    actions: [],
  });

  const { excelProcessedData }: { excelProcessedData: IExcelProcessingData } =
    useAppContext();

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

  useEffect(() => {
    if (operableData.length === 0) {
      const anomalies = extractData(
        excelProcessedData.data,
        excelProcessedData.anomalies
      );
      const gaps = extractData(
        excelProcessedData.data,
        excelProcessedData.gaps
      );
      const duplicates = extractData(
        excelProcessedData.data,
        excelProcessedData.duplicates
      );

      setOperableData([
        {
          type: "gaps",
          data: gaps,
          count: gaps.length,
          foreGroundText: "GAPS",
        },
        {
          type: "duplicates",
          data: duplicates,
          count: duplicates.length,
          foreGroundText: "DUPLICATES",
        },
        {
          type: "anomalies",
          data: anomalies,
          count: anomalies.length,
          foreGroundText: "ANOMALIES",
        },
      ]);
    }
  }, [operableData]);

  return (
    <ScrollArea className="w-full h-[calc(100vh-4rem)]">
      <div className="container p-4 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label>START DATE</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "max-w-[280px] w-full justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? (
                    format(startDate, "PPP")
                  ) : (
                    <span>START DATE</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>END DATE</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "max-w-[280px] w-full justify-start text-left font-normal",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "PPP") : <span>START DATE</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>LOCATION</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                {Array.from(
                  new Set(
                    excelProcessedData.data.map((item) => item[0].toString())
                  )
                ).map((item) => {
                  const slugify = (str: string) =>
                    str.toLowerCase().replace(/\s+/g, "-");
                  return <SelectItem value={slugify(item)}>{item}</SelectItem>;
                })}
                {/* <SelectItem value="los-angeles">Los Angeles</SelectItem> */}
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
                {Array.from(
                  new Set(
                    excelProcessedData.data.map((item) => item[1].toString())
                  )
                ).map((item) => {
                  const slugify = (str: string) =>
                    str.toLowerCase().replace(/\s+/g, "-");
                  return (
                    <SelectItem key={item} value={slugify(item)}>
                      {item}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* cards  */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {operableData.map((item, index) => (
            <SingleCard
              key={index}
              openModal={openModal}
              cardItem={item}
              inputNumber={excelProcessedData.data.length}
            />
          ))}
        </div>

        <div className="overflow-x-auto">
          {renderTable(excelProcessedData.data, [])}
        </div>

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
    </ScrollArea>
  );
}

const renderTable = (
  data: any[],
  actions: Action[],
  showActions = false,
  main = false
) => {
  const { handleDataContext, setHandleDataContext, excelProcessedData } =
    useAppContext();

  useEffect(() => {
    if (data.length > 0) {
      data.forEach((_, idx) => {
        setHandleDataContext((prevHandleDataContext: any) => ({
          ...prevHandleDataContext,
          [idx]: null,
        }));
      });
    }
  }, [data, setHandleDataContext]);

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
            // onClick={() => console.log(excelProcessedData.data.indexOf(row))}
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

                    onCheckedChange={(check) => {
                      setHandleDataContext({
                        ...handleDataContext,
                        [index]: check ? index : null,
                      });
                      // console.log(handleDataContext);
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

type Params = {
  name: string;
  foreGroundText: string;
  actions: Action[];
};

const SingleCard = ({
  openModal,
  cardItem,
  inputNumber,
}: {
  openModal: any;
  cardItem: OperableData;
  inputNumber?: number;
}) => {
  const [params, setParams] = useState<Params | null>(null);

  useEffect(() => {
    switch (cardItem.type) {
      case "gaps":
        setParams({
          name: "Data Gaps",
          foreGroundText: "DATA GAPS",
          actions: [
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
          ],
        });
        break;

      case "duplicates":
        setParams({
          name: "Duplicates",
          foreGroundText: "DUPLICATES",
          actions: [
            {
              name: "Drop",
              action: () => console.log("drop"),
            },
          ],
        });
        break;

      default:
        setParams({
          name: "Anomalies",
          foreGroundText: "ANOMALIES",
          actions: [
            {
              name: "Drop",
              action: () => console.log("drop"),
            },
          ],
        });
        break;
    }
  }, [cardItem]);

  return (
    <Card
      onClick={() =>
        openModal("Data Gaps", cardItem.data, params?.actions || [])
      }
      className="hover:bg-muted/15 cursor-pointer"
    >
      <CardHeader>
        <CardTitle>{params?.name || ""}</CardTitle>
      </CardHeader>
      <CardContent>
        <Progress
          className="w-full mb-4"
          value={Math.floor((cardItem.count / (inputNumber || 100)) * 100)}
        />
        <div className="flex items-center mb-4 justify-between">
          <p className="text-sm text-muted-foreground">
            {params?.foreGroundText || ""}: {cardItem.count}
          </p>
          <p className="text-sm text-muted-foreground">
            INPUT DATA: {inputNumber || "100"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
