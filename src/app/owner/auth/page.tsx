"use client";
import SignIn from "@/components/signin/signin";
import Signup from "@/components/signup/signup";
import { LoginUI } from "@/models/redux";
import { useSelector } from "react-redux";

function OwnerAuth() {
  const isLoginUIState = useSelector((state: LoginUI) => {
    return state.OwnerSlice.isLoginUI;
  });

  return <main>{isLoginUIState ? <SignIn></SignIn> : <Signup></Signup>}</main>;
}

export default OwnerAuth;
