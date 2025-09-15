"use client";
import SignupModel from "@/models/signup";
import "./signup.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoginStateUI } from "@/redux/ownerSlice";
import toast from "react-hot-toast";
import { LoginUI } from "@/models/redux";

function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupModel>();

  const [passwordToggle, setPasswordToggle] = useState<boolean>(true);
  const [confirmPasswordToggle, setConfirmPasswordToggle] = useState<boolean>(
    true
  );
  const dispatch = useDispatch();

  async function onSubmit(data: SignupModel) {
    delete data["confirm-password"];
    let userData: any = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "api/users/signup",
      {
        method: "post",
        body: JSON.stringify(data),
        headers: {
          content: "application/json",
        },
      }
    );
    userData = await userData.json();
    if (userData.success === true) {
      toast.success(userData.message + ". Login");
      dispatch(setLoginStateUI(true));
    } else {
      toast.error("User account creation Falied");
    }
  }

  function toggleAuthUI() {
    dispatch(setLoginStateUI(true));
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="signup-form-wrapper">
      <h3>Buyers Lead Intake Representative</h3>
      <h2>Signup Form</h2>
      <div className="form-input-field-wrapper">
        <label htmlFor="userid" className="form-input-label">
          Userid<span>*</span>
        </label>
        <input
          className="form-input-field"
          type="text"
          id="userid"
          placeholder="userid..."
          {...register("userid", { required: true, minLength: 6 })}
        />
        {errors.userid && errors.userid.type === "required" && (
          <p className="error-msg">Userid is required.</p>
        )}
        {errors.userid && errors.userid.type === "minLength" && (
          <p className="error-msg">Userid min length should be 6.</p>
        )}
      </div>
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
      <div className="form-input-field-wrapper">
        <label htmlFor="confirm-password" className="form-input-label">
          Confirm Password<span>*</span>
        </label>
        <div className="password-eye">
          <input
            className="form-input-field"
            type={confirmPasswordToggle === true ? "password" : "text"}
            id="confirm-password"
            placeholder="confirm-password..."
            {...register("confirm-password", { required: true })}
          />
          <Image
            src={
              confirmPasswordToggle
                ? "/images/eye-icon.svg"
                : "/images/eye-icon-off.svg"
            }
            height={22}
            width={22}
            alt="eye-icon"
            onClick={() => setConfirmPasswordToggle(!confirmPasswordToggle)}
          />
        </div>
        {errors?.["confirm-password"] &&
          errors?.["confirm-password"].type === "required" && (
            <p className="error-msg">Confirm password is required.</p>
          )}
        {watch("confirm-password") !== "" &&
          watch("password") !== watch("confirm-password") && (
            <p className="error-msg">
              Password and confirm password must be same.
            </p>
          )}
      </div>
      <button disabled={isSubmitting} className="form-submit-button">
        {isSubmitting && (
          <Image
            src="/images/loader.webp"
            alt="loader"
            width={25}
            height={25}
          />
        )}{" "}
        <span>Submit</span>
      </button>
      <p>
        Already have an account?{" "}
        <button onClick={toggleAuthUI} type="button">
          Login
        </button>
      </p>
    </form>
  );
}

export default Signup;
