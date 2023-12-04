"use client";

import CreateUserForm from "@/app/components/CreateUserForm";
import Header from "@/app/components/Header";
import { NextUIProvider } from "@nextui-org/react";
import React from "react";

const Page = () => {
  return (
    <div>
      <NextUIProvider>
        <Header />
        <CreateUserForm />
      </NextUIProvider>
    </div>
  );
};

export default Page;
