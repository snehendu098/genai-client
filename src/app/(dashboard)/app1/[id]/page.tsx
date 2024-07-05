"use client";

import AppLayouts from "@/components/dashboard/app-layout";
import { toast } from "@/components/ui/use-toast";
import { TopicAssessment } from "@/constants/dashboard";
import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";

const App = ({ params }: { params: { id: string } }) => {
  const [apiData, setData] = useState<TopicAssessment | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const getDoc = useCallback(async () => {
    try {
      const { data } = await axios.get(`/api/docs/${params.id}`);
      if (!data.success) throw new Error("Error fetching document");
      setPdfUrl(data.data.url || "");
    } catch (error: any) {
      toast({ title: error.message });
    }
  }, [params.id]);

  const getResponse = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/ai/app1/${params.id}`);
      if (!data.success) throw new Error("Error fetching response from AI");
      setData(data.data);
    } catch (error) {
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
        apiData &&
        Object.keys(apiData).map((key, idx) => (
          <div key={idx}>
            <h1>{key}</h1>
            {Object.keys(apiData[key]).map((subhead, subIdx) => (
              <div
                key={subIdx}
                className="flex flex-col p-8 bg-yellow-950/15 rounded-md shadow-white my-4"
              >
                <p className="text-xl">{subhead}</p>
                {apiData[key][subhead].map((point, pointIdx) => (
                  <p
                    key={pointIdx}
                    className="text-sm my-2 text-muted-foreground"
                  >
                    {point}
                  </p>
                ))}
              </div>
            ))}
          </div>
        ))
      )}
    </AppLayouts>
  );
};

export default App;
