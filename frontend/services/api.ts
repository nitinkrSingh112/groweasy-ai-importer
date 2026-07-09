const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api/import";


export async function uploadCSV(
  file: File
) {

  const formData =
    new FormData();


  formData.append(
    "file",
    file
  );


  console.log(
    "API URL:",
    API_URL
  );


  const response =
    await fetch(
      `${API_URL}/upload`,
      {
        method: "POST",
        body: formData,
      }
    );


  const data =
    await response.json();


  if (!response.ok) {

    throw new Error(
      data.message ||
      "CSV upload failed"
    );

  }


  return data;

}



export async function processCSV(){

  const response =
    await fetch(
      `${API_URL}/process`,
      {
        method:"POST",
      }
    );


  const data =
    await response.json();


  if(!response.ok){

    throw new Error(
      data.message ||
      "AI processing failed"
    );

  }


  return data;

}