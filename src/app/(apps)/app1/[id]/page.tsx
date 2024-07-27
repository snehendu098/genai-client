"use client";

import AppLayouts from "@/components/dashboard/app-layout";
import { toast } from "@/components/ui/use-toast";
import { TopicAssessment } from "@/constants/dashboard";
import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";

const App = ({ params }: { params: { id: string } }) => {
  const [apiData, setData] = useState<TopicAssessment | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getResponse = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/ai/app1/${params.id}`);
      if (!data.success) throw new Error("Error fetching response from AI");
      setData(JSON.parse(data.data));
    } catch (error) {
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
  );
};

export default App;
