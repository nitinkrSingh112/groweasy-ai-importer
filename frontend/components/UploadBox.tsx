"use client";

import { useState } from "react";
import { uploadCSV } from "../services/api";

interface UploadBoxProps {
  onUploadSuccess: (data: any) => void;
  darkMode: boolean;
}

export default function UploadBox({
  onUploadSuccess,
  darkMode,
}: UploadBoxProps) {

  const [loading, setLoading] = useState(false);
  const [drag, setDrag] = useState(false);

  async function upload(file: File) {

    if (!file.name.toLowerCase().endsWith(".csv")) {
      alert("Please upload a valid CSV file.");
      return;
    }

    try {

      setLoading(true);

      const result = await uploadCSV(file);

      onUploadSuccess(result);

    } catch (error: any) {

      console.error(error);

      alert(
        error.message ||
        "CSV upload failed"
      );

    } finally {

      setLoading(false);

    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {

    const file = e.target.files?.[0];

    if (file) {
      upload(file);
    }

  }

  function handleDrop(
    e: React.DragEvent<HTMLDivElement>
  ) {

    e.preventDefault();

    setDrag(false);

    const file = e.dataTransfer.files[0];

    if (file) {
      upload(file);
    }

  }

  return (

    <div

      onDragOver={(e) => {

        e.preventDefault();

        setDrag(true);

      }}

      onDragLeave={() => setDrag(false)}

      onDrop={handleDrop}

      style={{

        border: `2px dashed ${drag ? "#3b82f6" : "#2563eb"}`,

        padding: "40px",

        borderRadius: "12px",

        textAlign: "center",

        marginBottom: "30px",

        transition: "all 0.3s ease",

        background: drag
          ? "#dbeafe"
          : darkMode
            ? "#1f2937"
            : "#ffffff",

        color: darkMode
          ? "#ffffff"
          : "#111827",

        boxShadow: drag
          ? "0 0 20px rgba(37,99,235,0.3)"
          : "0 2px 10px rgba(0,0,0,0.08)"

      }}

    >

      <h2
        style={{
          marginBottom: "15px"
        }}
      >
        📂 Upload CSV
      </h2>

      <p>
        Drag & Drop your CSV here
      </p>

      <p
        style={{
          margin: "15px 0",
          fontWeight: "bold"
        }}
      >
        OR
      </p>

      <label
        style={{

          display: "inline-block",

          padding: "10px 22px",

          background: "#2563eb",

          color: "#ffffff",

          borderRadius: "8px",

          cursor: loading ? "not-allowed" : "pointer",

          fontWeight: 600,

          transition: "0.2s"

        }}
      >

        Choose CSV

        <input

          type="file"

          accept=".csv"

          disabled={loading}

          onChange={handleChange}

          style={{
            display: "none"
          }}

        />

      </label>

      {loading && (

        <p
          style={{
            marginTop: "20px",
            color: "#2563eb",
            fontWeight: "bold"
          }}
        >
          ⏳ Uploading CSV...
        </p>

      )}

    </div>

  );

}