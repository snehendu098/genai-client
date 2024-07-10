"use client";

import AppLayouts from "@/components/dashboard/app-layout";
import { toast } from "@/components/ui/use-toast";
import { TopicAssessment } from "@/constants/dashboard";
import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";

const App = ({
  params,
  children,
}: {
  params: { id: string };
  children: React.ReactNode;
}) => {
  const [apiData, setData] = useState<TopicAssessment | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string>("");

  const getDoc = useCallback(async () => {
    try {
      const { data } = await axios.get(`/api/docs/${params.id}`);
      if (!data.success) throw new Error("Error fetching document");
      setPdfUrl(data.data.url || "");
    } catch (error: any) {
      toast({ title: error.message });
    }
  }, [params.id]);

  useEffect(() => {
    getDoc();
  }, [getDoc]);

  return <AppLayouts pdfLink={pdfUrl}>{children} </AppLayouts>;
};

export default App;
