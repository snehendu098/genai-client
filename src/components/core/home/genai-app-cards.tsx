"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";

export default function GenAiAppCard(props: {
  title: String;
  description: String;
  link: String;
}) {
  return (
    <Link href={`${props.link}`}>
      {" "}
      <CardContainer className="inter-var">
        <CardBody className="bg-gray-200 relative  dark:hover:shadow-2xl dark:hover:shadow-white/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-xl p-6 border  ">
          <CardItem
            translateZ="50"
            className="text-xl font-bold text-neutral-600 dark:text-white"
          >
            {props.title}
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
          >
            {props.description}
          </CardItem>
        </CardBody>
      </CardContainer>
    </Link>
  );
}
