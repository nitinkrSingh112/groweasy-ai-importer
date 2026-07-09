import { Router } from "express";
import multer from "multer";

import {
  uploadCSV,
  processCSV
} from "../controllers/importController";


const router = Router();


const upload = multer({

  dest:"uploads/",

  fileFilter:(req,file,cb)=>{

    if(
      file.mimetype === "text/csv" ||
      file.originalname.endsWith(".csv")
    ){

      cb(null,true);

    }
    else{

      cb(
        new Error("Only CSV files are allowed")
      );

    }

  }

});



router.post(
  "/upload",
  upload.single("file"),
  uploadCSV
);



router.post(
  "/process",
  processCSV
);



export default router;