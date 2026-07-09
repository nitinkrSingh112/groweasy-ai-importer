import { Request, Response } from "express";
import fs from "fs/promises";

import { parseCSV } from "../services/csvService";
import { extractCRM } from "../services/aiService";


let csvRows:any[] = [];


// ===============================
// Upload CSV
// ===============================

export async function uploadCSV(
  req: Request,
  res: Response
) {

  try {

    if (!req.file) {

      return res.status(400).json({
        message:"No CSV file uploaded"
      });

    }


    const filePath =
      req.file.path;



    csvRows =
      await parseCSV(filePath);



    // delete uploaded CSV
    await fs.unlink(filePath);



    return res.json({

      message:
        "CSV uploaded successfully",

      preview:
        csvRows.slice(0,10),

      totalRows:
        csvRows.length

    });



  }

  catch(error:any){

    console.error(
      "Upload error:",
      error
    );


    return res.status(500).json({

      message:
        "CSV upload failed",

      error:
        error.message

    });

  }

}




// ===============================
// Process CSV with AI
// ===============================


export async function processCSV(
  req:Request,
  res:Response
){

  try {


    if(
      !csvRows.length
    ){

      return res.status(400).json({

        message:
          "No CSV data available. Upload CSV first."

      });

    }



    const result =
      await extractCRM(csvRows);



    // clear memory after processing
    csvRows = [];



    return res.json(result);



  }


  catch(error:any){


    console.error(
      "Processing error:",
      error
    );


    return res.status(500).json({

      message:
        "AI processing failed",

      error:
        error.message

    });


  }

}