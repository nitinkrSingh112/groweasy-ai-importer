import { crmPrompt } from "../prompts/crmPrompt";
import { createBatches } from "../utils/batch";


let aiClient: any = null;


async function getAIClient() {

  if (!aiClient) {

    const { GoogleGenAI } =
      await import("@google/genai");


    aiClient =
      new GoogleGenAI({
        apiKey:
          process.env.GEMINI_API_KEY!,
      });

  }


  return aiClient;

}



async function processBatch(
  rows:any[]
) {


  const ai =
    await getAIClient();



  const response =
    await ai.models.generateContent({

      model:"gemini-2.5-flash",

      contents:`

${crmPrompt}


CSV DATA:

${JSON.stringify(rows)}


Return only valid JSON.
No markdown.
No explanations.

`

    });



  const content =
    response.text || "";



  const cleaned =
    content
      .replace(/```json/g,"")
      .replace(/```/g,"")
      .trim();



  console.log(
    "GEMINI RESPONSE:",
    cleaned
  );



  return JSON.parse(cleaned);

}





export async function extractCRM(
  rows:any[]
) {


  const batches =
    createBatches(
      rows,
      20
    );


  let records:any[] = [];

  let skipped = 0;



  for(
    const batch of batches
  ) {


    try {


      const result =
        await processBatch(
          batch
        );


      records.push(
        ...(result.records || [])
      );


      skipped +=
        result.skipped || 0;


    }


    catch(error) {


      console.error(
        "Gemini batch failed:",
        error
      );


      skipped +=
        batch.length;

    }

  }



  return {

    records,

    totalImported:
      records.length,

    totalSkipped:
      skipped

  };

}