"use client";
import { useState } from "react";
import "./page.scss";
import toast from "react-hot-toast";
import Image from "next/image";
import { success } from "zod";

function Page() {
  const [file, setFile] = useState<File | null>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const [rowError, setRowError] = useState([]);
  function onFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      toast.success("File uploaded successfully.");
    }
  }

  async function validateData() {
    setLoader(true);
    if (!file) {
      setTimeout(() => {
        setLoader(false);
      }, 500);

      toast.error("Please upload file first.");
    } else {
      const formData = new FormData();
      formData.append("file", file);

      let response: any = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "api/buyers/csv-import",
        {
          method: "post",
          body: formData,
        }
      );
      response = await response.json();
      if (response.success === true) {
        setRowError(response.errors);
        toast.success(
          response.message +
            ".\nInserted:" +
            response.inserted +
            ".Failed:" +
            response.errors.length
        );
      } else {
        toast.error(response.message);
      }
      setTimeout(() => {
        setLoader(false);
      }, 1000);
    }
  }

  return (
    <>
      {loader && (
        <div className="image-loader">
          <Image
            src="/images/loader.webp"
            width={200}
            height={200}
            alt="loader"
          />
        </div>
      )}
      <main className="csv-import-page">
        <h1>CSV Import</h1>

        <section className="upload-section">
          <label htmlFor="csvFile" className="file-label">
            <span>Select CSV File</span>
            <input
              type="file"
              id="csvFile"
              accept=".csv"
              onChange={(e) => onFileUpload(e)}
            />
          </label>
          <p className="note">
            Max 200 rows. Required headers must be present.
          </p>
        </section>

        <div className="action-buttons">
          <button
            className="btn btn-success"
            id="importBtn"
            onClick={validateData}
          >
            Validate & Import
          </button>
        </div>

        <section className="error-section">
          <h2>Validation Errors</h2>
          <table className="error-table">
            <thead>
              <tr>
                <th>Row #</th>
                <th>Error Message</th>
              </tr>
            </thead>
            <tbody>
              {rowError?.map((err: { row: number; message: string }) => (
                <tr>
                  <td>{err.row}</td>
                  <td>{err.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
}

export default Page;
