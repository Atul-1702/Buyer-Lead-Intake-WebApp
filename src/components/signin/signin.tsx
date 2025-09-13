"use client";
import "./signin.scss";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useState } from "react";
import SignInModel from "@/models/signin";
import { setLoginStateUI } from "@/redux/ownerSlice";
import { useDispatch } from "react-redux";

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInModel>();

  const [passwordToggle, setPasswordToggle] = useState<boolean>(true);
  const dispatch = useDispatch();
  function onSubmit(data: SignInModel) {
    console.log(data);
  }

  function toggleAuthUI() {
    dispatch(setLoginStateUI(false));
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="signup-form-wrapper">
      <h3>Buyers Lead Intake Representative</h3>
      <h2>Login Form</h2>

      <div className="form-input-field-wrapper">
        <label htmlFor="email" className="form-input-label">
          Email<span>*</span>
        </label>
        <input
          className="form-input-field"
          type="email"
          id="email"
          placeholder="email..."
          {...register("email", {
            required: true,
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address",
            },
          })}
        />
        {errors.email && errors.email.type === "required" && (
          <p className="error-msg">Email is required.</p>
        )}
        {errors.email && errors.email.type === "pattern" && (
          <p className="error-msg">Invalid email.</p>
        )}
      </div>
      <div className="form-input-field-wrapper">
        <label htmlFor="password" className="form-input-label">
          Password<span>*</span>
        </label>
        <div className="password-eye">
          <input
            className="form-input-field"
            type={passwordToggle === true ? "password" : "text"}
            id="password"
            placeholder="password..."
            {...register("password", {
              required: true,
              minLength: 6,
              maxLength: 12,
            })}
          />
          <Image
            src={
              passwordToggle
                ? "/images/eye-icon.svg"
                : "/images/eye-icon-off.svg"
            }
            height={22}
            width={22}
            alt="eye-icon"
            onClick={() => setPasswordToggle(!passwordToggle)}
          />
        </div>
        {errors.password && errors.password.type === "required" && (
          <p className="error-msg">Password is required.</p>
        )}
        {errors.password && errors.password.type === "minLength" && (
          <p className="error-msg">Password should contain min 6 characters.</p>
        )}
        {errors.password && errors.password.type === "maxLength" && (
          <p className="error-msg">
            Password should contain max 12 characters.
          </p>
        )}
      </div>
      <button className="form-submit-button">
        <span>Login</span>
      </button>
      <p>
        Don't have an account?{" "}
        <button onClick={toggleAuthUI} type="button">
          Signup
        </button>
      </p>
    </form>
  );
}

export default SignIn;
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
