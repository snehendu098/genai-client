"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function GenAiAppCard({
  title,
  description,
  link,
  desc2,
}: {
  title: String;
  description: String;
  link: String;
  desc2?: String | null;
}) {
  return (
    <Link href={`${link}`}>
      <Card className="min-h-80 bg-primary-foreground">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mt-6">{description}</p>
          <br />
          <br />
          <p>{desc2}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
