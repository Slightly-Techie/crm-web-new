"use client";
import dynamic from "next/dynamic";
import Team from "./components/team";

export default function TechiesList() {
  return (
    <div className="w-full h-full">
      <Team />
    </div>
  );
}
