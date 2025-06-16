"use client";

import { jwtDecode } from "jwt-decode";

interface MyTokenPayload {
  username: string;
}

export const extractInitialsFromToken = async () => {
  const token = localStorage.getItem("token");
  console.log(token);
  if (!token) return "";
  try {
    const decoded = jwtDecode<MyTokenPayload>(token);
    const username = decoded.username;
    const initial = username ? username[0]?.toUpperCase() : "";
    if (!initial) {
      return;
    }
    localStorage.setItem("initial", initial);
    return initial;
  } catch (error) {
    console.error("Failed to decode token", error);
    return "";
  }
};
