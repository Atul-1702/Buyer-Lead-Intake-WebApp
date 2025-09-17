"use client";
import { useEffect, useState } from "react";
import "./buyers-component.scss";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

function BuyersComponent({ filterData, totalRecords }) {
  const [city, setCity] = useState("all");
  const [timeline, setTimeline] = useState("all");
  const [propertyType, setPropertyType] = useState("all");
  const router = useRouter();
  const [filteredData, setFilteredData] = useState([...filterData]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [ownerId, setOwnerId] = useState<string | null>();
  const [role, setRole] = useState<string | null>();
  useEffect(() => {
    router.push(
      `/buyers?city=${city}&timeline=${timeline}&propertyType=${propertyType}&page=${page}&limit=10`
    );

    setOwnerId(localStorage.getItem("ownerId"));
    setRole(localStorage.getItem("role"));
  }, [city, timeline, propertyType, page]);
  useEffect(() => {
    setFilteredData(filterData);
    setTotalPage(Math.ceil(totalRecords / 10));
  }, [filterData]);

  function debouncedSearch(e) {
    let timeDuration;
    let searchString = e.target.value;
    if (timeDuration) {
      clearTimeout(timeDuration);
    }
    timeDuration = setTimeout(() => {
      const data = filterData.filter((buyer) => {
        if (
          buyer.fullName.startsWith(searchString) ||
          buyer.phone.startsWith(searchString) ||
          buyer.email.startsWith(searchString)
        ) {
          return true;
        }
        return false;
      });

      setTotalPage(Math.ceil(data.length / 10));
      setPage(1);
      setFilteredData(data);
    }, 500);
  }
  async function downloadCSV() {
    toast.loading("Downloading CSV File...");
    try {
      const filterQuery = [];
      if (city !== "all") {
        filterQuery.push({ city });
      }
      if (propertyType !== "all") {
        filterQuery.push({ propertyType });
      }
      if (timeline != "all") {
        filterQuery.push({ timeline });
      }
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "api/buyers/csv-export",
        {
          method: "POST",
          body: JSON.stringify(filterQuery),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to download CSV");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "buyers_dataset.csv"; // file name
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      toast.dismiss();
    } catch (error) {
      toast.dismiss();
      toast.error("Downloading Failed...");
    }
  }
  return (
    <div className="leads-page">
      <div className="filters">
        <select id="filter-city" onChange={(e) => setCity(e.target.value)}>
          <option value="all">All Cities</option>
          <option value="CHANDIGARH">Chandigarh</option>
          <option value="MOHALI">Mohali</option>
          <option value="ZIRKAPUR">Zirakpur</option>
          <option value="PANCHKULA">Panchkula</option>
          <option value="OTHER">Other</option>
        </select>

        <select
          id="filter-propertyType"
          onChange={(e) => setPropertyType(e.target.value)}
        >
          <option value="all">All Property Types</option>
          <option value="APARTMENT">Apartment</option>
          <option value="VILLA">Villa</option>
          <option value="PLOT">Plot</option>
          <option value="OFFICE">Office</option>
          <option value="Retail">Retail</option>
        </select>

        <select
          id="filter-timeline"
          onChange={(e) => setTimeline(e.target.value)}
        >
          <option value="all">All Timelines</option>
          <option value="M_0_3">0–3 Months</option>
          <option value="M_3_6">3–6 Months</option>
          <option value="GT6M">6+ Months</option>
          <option value="EXPLORING">Exploring</option>
        </select>

        <input
          type="text"
          id="search-input"
          placeholder="Search by name, phone, or email"
          onChange={debouncedSearch}
        />

        <button className="download-btn" onClick={downloadCSV}>
          Download CSV
        </button>
      </div>

      <div className="table-wrapper">
        <table className="leads-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>City</th>
              <th>Property Type</th>
              <th>Budget</th>
              <th>Timeline</th>
              <th>Status</th>
              <th>Updated At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.map((buyer) => {
              return (
                <tr key={buyer.id}>
                  <td>{buyer.fullName}</td>
                  <td>{buyer.phone}</td>
                  <td>{buyer.city}</td>
                  <td>{buyer.propertyType}</td>
                  <td>{`₹${buyer.budgetMin ? buyer.budgetMin : 0} – ₹${
                    buyer.budgetMax ? buyer.budgetMax : "NA"
                  }`}</td>
                  <td>{buyer.timeline}</td>
                  <td>
                    <span className="badge status-new">{buyer.status}</span>
                  </td>
                  <td>
                    {new Date(buyer.updatedAt).toLocaleString("en-IN", {
                      timeZone: "Asia/Kolkata",
                    })}
                  </td>
                  <td>
                    {(role === "ADMIN" || ownerId === buyer.ownerId) && (
                      <button
                        className="btn-action"
                        onClick={() => router.push("/buyers/" + buyer.id)}
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button
          className="page-btn"
          disabled={page === 1 ? true : false}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span className="page-info">{`Page ${page} of ${totalPage}`}</span>
        <button
          className="page-btn"
          disabled={page === totalPage ? true : false}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default BuyersComponent;
