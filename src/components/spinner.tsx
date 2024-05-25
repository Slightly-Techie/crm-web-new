"use client";
import React from "react";
import { RotatingLines } from "react-loader-spinner";

const Spinner = () => {
  return (
    <div className="w-full h-full grid place-content-center">
      <RotatingLines width={"24"} strokeWidth="2" strokeColor="#bcbdc0" />
    </div>
  );
};

export default Spinner;
