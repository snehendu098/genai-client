"use client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {
  TopicAssessment,
  topicAssessmentDummyData,
} from "@/constants/dashboard";
import { usePageContext } from "@/context/pdf-page-provider";
import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";

const App = ({ params }: { params: { id: string } }) => {
  const [apiData, setData] = useState<TopicAssessment | null>(null);
  // const apiData = topicAssessmentDummyData;
  const [loading, setLoading] = useState<boolean>(false);
  const { setPage } = usePageContext();

  const getResponse = useCallback(async () => {
    setLoading(true);

    try {
      const { data } = await axios.get(`/api/ai/app1/${params.id}`);
      if (!data.success) throw new Error("Error fetching response from AI");
      setData(JSON.parse(data.data));
    } catch (error: any) {
      console.error(error);

      toast({
        title: "Error Occurred",
        variant: "destructive",
        description: error?.response?.data?.message,
      });
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
              {apiData[key][subhead]["content"].map((point, pointIdx) => (
                <p
                  key={pointIdx}
                  className="text-sm my-2 text-muted-foreground"
                >
                  {point}
                </p>
              ))}
              {apiData[key][subhead]["pages"] &&
                apiData[key][subhead]["pages"].length > 0 && (
                  <div className="flex space-x-4 mt-3">
                    {apiData[key][subhead]["pages"].map((item, idx) => (
                      <div
                        className="p-2 px-4 cursor-pointer bg-yellow-200/15 hover:bg-yellow-200/40 "
                        key={idx}
                        onClick={() => {
                          setPage(item - 1);
                        }}
                      >
                        Page: {item}
                      </div>
                    ))}
                  </div>
                )}
            </div>
          ))}
        </div>
      ))
  );
};

export default App;
