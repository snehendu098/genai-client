"use client";

import TableDataShow from "@/components/ai-toolbox/dashboard/table-shower";
import { toast } from "@/components/ui/use-toast";
import { PrincipleChecklist } from "@/constants/dashboard";
import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";

const App = ({ params }: { params: { id: string } }) => {
  const [apiData, setData] = useState<PrincipleChecklist[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getResponse = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/ai/app3/${params.id}`);
      if (!data.success) toast({ title: "Error fetching response from AI" });

      setData(JSON.parse(data.data));
    } catch (error: any) {
      console.error(error);
      toast({ title: "Error Occurred", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    getResponse();
  }, [getResponse]);

  return loading ? (
    <h1>Api Response is loading</h1>
  ) : (
    apiData?.map((value, idx: number) => {
      return <TableDataShow idx={idx} key={idx} value={value} />;
    })
  );
};

export default App;
