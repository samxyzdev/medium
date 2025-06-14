import { jwtDecode } from "jwt-decode";

interface MyTokenPayload {
  username: string;
  // include other fields if needed
}

export const extractInitialsFromToken = async () => {
  const token = localStorage.getItem("token");
  console.log(token);

  if (!token) return "";
  try {
    const decoded = jwtDecode<MyTokenPayload>(token);
    console.log(decoded);

    const username = decoded.username;
    const initial = username ? username[0]?.toUpperCase() : "";
    console.log(`HELLO HOW ARE YOU ${initial}`);
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
