import fs from "fs";
import csv from "csv-parser";


export function parseCSV(
  filePath: string
): Promise<any[]> {


  return new Promise(
    (resolve, reject) => {


      const rows:any[] = [];


      fs.createReadStream(
        filePath,
        {
          encoding:"utf-8"
        }
      )

      .pipe(
        csv()
      )


      .on(
        "data",
        (data)=>{


          const cleanedRow:any = {};


          Object.keys(data)
            .forEach((key)=>{


              cleanedRow[key.trim()] =
                typeof data[key] === "string"
                ?
                data[key].trim()
                :
                data[key];


            });



          // ignore completely empty rows
          const hasValue =
            Object.values(cleanedRow)
            .some(
              value =>
              value !== ""
              &&
              value !== null
              &&
              value !== undefined
            );


          if(hasValue){

            rows.push(cleanedRow);

          }


        }
      )


      .on(
        "end",
        ()=>{


          resolve(rows);


        }
      )


      .on(
        "error",
        (error)=>{


          reject(error);


        }
      );


    }
  );

}



