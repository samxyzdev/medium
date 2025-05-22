"use client";
import { useRef } from "react";
import { PlusSVG } from "../app/Icon/PlusSVG";

export const TabBar = ({ tabName }: { tabName: string }) => {
  return <div className="text-slate-700 text-[16px]">{tabName}</div>;
};
