"use client";

import AppLayouts from "@/components/dashboard/app-layout";
import TableDataShow from "@/components/dashboard/table-shower";
import { toast } from "@/components/ui/use-toast";
import { PrincipleChecklist } from "@/constants/dashboard";
import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";

const App = ({ params }: { params: { id: string } }) => {
  const [apiData, setData] = useState<PrincipleChecklist[] | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const getDoc = useCallback(async () => {
    try {
      const { data } = await axios.get(`/api/docs/${params.id}`);
      if (!data.success) throw new Error("Error fetching document");
      setPdfUrl(data.data.url || "");
    } catch (error: any) {
      toast({ title: error.message, variant: "destructive" });
    }
  }, [params.id]);

  const getResponse = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/ai/app2/${params.id}`);
      if (!data.success) throw new Error("Error fetching response from AI");
      setData(data.data);
    } catch (error: any) {
      console.error(error);
      toast({ title: "Error Occurred", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    getDoc();
    getResponse();
  }, [getDoc, getResponse]);

  return (
    <AppLayouts pdfLink={pdfUrl}>
      {loading ? (
        <h1>Api Response is loading</h1>
      ) : (
        apiData?.map((value, idx: number) => {
          console.log("id", idx);
          return <TableDataShow idx={idx} key={idx} value={value} />;
        })
      )}
    </AppLayouts>
  );
};

export default React.memo(App);
