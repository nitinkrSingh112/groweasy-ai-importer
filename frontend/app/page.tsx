"use client";

import { useState } from "react";

import UploadBox from "../components/UploadBox";
import PreviewTable from "../components/PreviewTable";
import ResultTable from "../components/ResultTable";

import { processCSV } from "../services/api";

export default function Home() {

  const [preview, setPreview] =
    useState<any[]>([]);

  const [result, setResult] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [darkMode, setDarkMode] =
    useState(false);



  async function handleProcess() {

    try {

      setLoading(true);

      setError("");

      const data =
        await processCSV();

      setResult(data);

    }

    catch (err: any) {

      console.error(err);

      setError(
        err.message ||
        "AI processing failed"
      );

    }

    finally {

      setLoading(false);

    }

  }



  function handleUpload(
    data: any
  ) {

    setPreview(
      data.preview || []
    );

    setResult(null);

    setError("");

  }



  return (

    <main

      style={{

        minHeight: "100vh",

        padding: "40px",

        maxWidth: "1400px",

        margin: "auto",

        background:
          darkMode
            ? "#111827"
            : "#f8fafc",

        color:
          darkMode
            ? "#ffffff"
            : "#111827",

        transition: "all 0.3s ease"

      }}

    >


      <div

        style={{

          display: "flex",

          justifyContent: "space-between",

          alignItems: "center",

          marginBottom: "30px"

        }}

      >

        <div>

          <h1>
            GrowEasy AI CSV Importer
          </h1>

          <p>
            Upload any CSV file and convert it into GrowEasy CRM format using AI.
          </p>

        </div>


        <button

          onClick={() =>
            setDarkMode(!darkMode)
          }

          style={{

            padding: "10px 18px",

            borderRadius: "8px",

            border: "none",

            cursor: "pointer",

            fontWeight: "bold",

            background:
              darkMode
                ? "#fbbf24"
                : "#2563eb",

            color:
              darkMode
                ? "#111827"
                : "#ffffff"

          }}

        >

          {darkMode
            ? "☀️ Light Mode"
            : "🌙 Dark Mode"}

        </button>

      </div>



      <UploadBox

        darkMode={darkMode}

        onUploadSuccess={handleUpload}

      />



      {

        preview.length > 0 &&

        <>

          <PreviewTable

            rows={preview}

            darkMode={darkMode}

          />

          <br />

          <button

            onClick={handleProcess}

            disabled={loading}

            style={{

              padding: "12px 24px",

              border: "none",

              borderRadius: "8px",

              cursor: "pointer",

              fontWeight: "bold",

              background:
                loading
                  ? "#9ca3af"
                  : "#2563eb",

              color: "#ffffff"

            }}

          >

            {

              loading

                ?

                "AI is analyzing leads..."

                :

                "Confirm Import"

            }

          </button>

        </>

      }



      {

        error &&

        <p

          style={{

            color: "#ef4444",

            marginTop: "20px",

            fontWeight: "bold"

          }}

        >

          {error}

        </p>

      }



      {

        result &&

        <ResultTable

          result={result}

          darkMode={darkMode}

        />

      }


    </main>

  );

}