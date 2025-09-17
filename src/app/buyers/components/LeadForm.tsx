"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import buyersSchema from "@/models/buyers";
import "./LeadForm.scss";
import toast from "react-hot-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type BuyerForm = z.infer<typeof buyersSchema>;

function LeadForm({ buyerDetails }: { buyerDetails?: BuyerForm }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BuyerForm>({
    resolver: zodResolver(buyersSchema),
  });

  const router = useRouter();

  async function onFormSubmitted(data: BuyerForm) {
    console.log("Form Submitted");
    if (!(data.propertyType === "APARTMENT" || data.propertyType === "VILLA")) {
      delete data.bhk;
    }

    if (buyerDetails) {
      if (buyerDetails == data) {
        toast.success("Record updated successfully.");
      } else {
        let updatedData: any = await fetch(
          process.env.NEXT_PUBLIC_BASE_URL + "api/buyers",
          {
            method: "put",
            body: JSON.stringify({ buyersData: data, id: buyerDetails.id }),
            headers: {
              content: "application/json",
            },
          }
        );
        updatedData = await updatedData.json();
        if (updatedData.success === true) {
          toast.success("Record updated successfully");
          router.push("/buyers");
        } else {
          toast.error("Record updation failed.");
        }
      }
      await fetch(process.env.NEXT_PUBLIC_BASE_URL + "api/buyers", {
        method: "patch",
      });
    } else {
      let buyerData: any = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "api/buyers",
        {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            content: "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      buyerData = await buyerData.json();

      if (buyerData.success === true) {
        toast.success(buyerData.message);
        router.push("/buyers");
      } else {
        toast.error("Buyer is not added successfully");
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onFormSubmitted)}
      className="lead-form-wrapper"
    >
      <h1>Create Lead</h1>

      <div className="form-control-single-col">
        <label htmlFor="fullName">Fullname*</label>
        <input
          type="text"
          id="fullName"
          placeholder="fullname..."
          defaultValue={buyerDetails?.fullName}
          {...register("fullName")}
        />
        {errors.fullName && <p className="error">{errors.fullName.message}</p>}
      </div>

      <div className="form-control-two-col">
        <div className="form-control-first-col">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            placeholder="email..."
            defaultValue={buyerDetails?.email}
            {...register("email")}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>
        <div className="form-control-second-col">
          <label htmlFor="phone">Phone*</label>
          <input
            type="text"
            id="phone"
            placeholder="phone..."
            defaultValue={buyerDetails?.phone}
            {...register("phone")}
          />
          {errors.phone && <p className="error">{errors.phone.message}</p>}
        </div>
      </div>

      <div className="form-control-two-col">
        <div className="form-control-first-col">
          <label htmlFor="city">City*</label>
          <select
            id="city"
            {...register("city")}
            defaultValue={buyerDetails?.city}
          >
            <option value="CHANDIGARH">Chandigarh</option>
            <option value="MOHALI">Mohali</option>
            <option value="ZIRKAPUR">Zirakpur</option>
            <option value="PANCHKULA">Panchkula</option>
            <option value="OTHER">Other</option>
          </select>
        </div>
        <div className="form-control-second-col">
          <label htmlFor="property_type">Property Type*</label>
          <select
            id="property_type"
            {...register("propertyType")}
            defaultValue={buyerDetails?.propertyType}
          >
            <option value="APARTMENT">Apartment</option>
            <option value="VILLA">Villa</option>
            <option value="PLOT">Plot</option>
            <option value="OFFICE">Office</option>
            <option value="RETAIL">Retail</option>
          </select>
        </div>
      </div>

      <div className="form-control-two-col">
        <div className="form-control-first-col">
          <label htmlFor="bhk">BHK</label>
          <select
            id="bhk"
            {...register("bhk")}
            disabled={
              !(
                watch("propertyType") === "APARTMENT" ||
                watch("propertyType") === "VILLA"
              )
            }
          >
            <option value="ONE">One</option>
            <option value="TWO">Two</option>
            <option value="THREE">Three</option>
            <option value="FOUR">Four</option>
            <option value="STUDIO">Studio</option>
          </select>
          {errors.bhk && <p className="error">{errors.bhk.message}</p>}
        </div>
        <div className="form-control-second-col">
          <label htmlFor="purpose">Purpose</label>
          <select
            id="purpose"
            {...register("purpose")}
            defaultValue={buyerDetails?.purpose}
          >
            <option value="BUY">Buy</option>
            <option value="RENT">Rent</option>
          </select>
        </div>
      </div>

      <div className="form-control-two-col">
        <div className="form-control-first-col">
          <label htmlFor="budget_min">Budget Min</label>
          <input
            type="text"
            id="budget_min"
            placeholder="budget min..."
            {...register("budgetMin")}
            defaultValue={buyerDetails?.budgetMin}
          />
        </div>
        <div className="form-control-second-col">
          <label htmlFor="budget_max">Budget Max</label>
          <input
            type="text"
            id="budget_max"
            placeholder="budget max..."
            {...register("budgetMax")}
            defaultValue={buyerDetails?.budgetMax}
          />
          {errors.budgetMax && (
            <p className="error">{errors.budgetMax.message}</p>
          )}
        </div>
      </div>

      <div className="form-control-two-col">
        <div className="form-control-first-col">
          <label htmlFor="timeline">Timeline</label>
          <select
            id="timeline"
            {...register("timeline")}
            defaultValue={buyerDetails?.timeline}
          >
            <option value="M_0_3">0 - 3 Months</option>
            <option value="M_3_6">3 - 6 Months</option>
            <option value="GT6M">&gt; 6 Months</option>
            <option value="EXPLORING">Exploring</option>
          </select>
        </div>
        <div className="form-control-second-col">
          <label htmlFor="source">Source</label>
          <select
            id="source"
            {...register("source")}
            defaultValue={buyerDetails?.source}
          >
            <option value="WEBSITE">Website</option>
            <option value="REFERRAL">Referral</option>
            <option value="WALK_IN">Walk In</option>
            <option value="CALL">Call</option>
            <option value="OTHER">Other</option>
          </select>
        </div>
      </div>

      <div className="form-control-single-col">
        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          {...register("notes")}
          defaultValue={buyerDetails?.notes}
        ></textarea>
      </div>

      <div className="form-control-single-col">
        <label htmlFor="tags">Tags</label>
        <input
          type="text"
          id="tags"
          placeholder="add multiple tags sep by comma..."
          {...register("tags")}
          defaultValue={buyerDetails?.tags}
        />
      </div>

      <button type="submit" className="form-button">
        {isSubmitting && (
          <Image
            src="/images/loader.webp"
            width={22}
            height={22}
            alt="Loader"
          />
        )}
        Submit
      </button>
    </form>
  );
}

export default LeadForm;
