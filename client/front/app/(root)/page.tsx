"use client";
import React from "react";
import SignupForm from "../components/SignupForm";
import { useState } from "react";
import Verification from "../components/Verification";
import LoginForm from "../components/LoginForm";

const Page = () => {
  const [activeState, setActiveState] = useState("Login");

  return (
    <div>
      {activeState === "Login" && <LoginForm setActiveState={setActiveState} />}
      {activeState === "Signup" && (
        <SignupForm setActiveState={setActiveState} />
      )}
      {activeState === "Verification" && (
        <Verification setActiveState={setActiveState} />
      )}
    </div>
  );
};

export default Page;
