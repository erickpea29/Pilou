"use client";

import Header from "@/app/components/Header";
import Table from "@/app/components/Table";
import React from "react";
import { NextUIProvider } from "@nextui-org/react";

const page = () => {
  return (
    <div>
      <NextUIProvider>
        <Header />
        <Table />
      </NextUIProvider>
    </div>
  );
};

export default page;
