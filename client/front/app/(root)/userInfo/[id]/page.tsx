"use client";

import Header from "@/app/components/Header";
import UserInfo from "@/app/components/UserInfo";
import { GET_USER_BY_ID } from "@/graphql/actions/getUserById.action";
import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

const Page = ({ params }: { params: { id: string } }) => {
  const userInfo = params;

  const { data, loading, error } = useQuery(GET_USER_BY_ID, {
    variables: { id: userInfo.id },
  });

  const userData = {
    id: data?.getUserById.id || "",
    name: data?.getUserById.name || "",
    emergency_contact: data?.getUserById.emergency_contact || "",
    emergency_number: data?.getUserById.emergency_number || "",
    blood_type: data?.getUserById.blood_type || "",
    image: data?.getUserById.image || "",
  };

  return (
    <>
      <Header />
      <UserInfo userData={userData} />
    </>
  );
};

export default Page;
