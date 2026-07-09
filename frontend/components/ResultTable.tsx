interface ResultTableProps {
  result: any;
  darkMode: boolean;
}


export default function ResultTable({
  result,
  darkMode,
}: ResultTableProps) {


  if (!result) {
    return null;
  }



  const records =
    result.records || [];



  const columns = [

    "created_at",

    "name",

    "email",

    "country_code",

    "mobile_without_country_code",

    "company",

    "city",

    "state",

    "country",

    "lead_owner",

    "crm_status",

    "crm_note",

    "data_source",

    "possession_time",

    "description"

  ];



  return (

    <div

      style={{

        marginTop:"40px"

      }}

    >


      <h2>
        Imported CRM Records
      </h2>



      <div

        style={{

          overflowX:"auto",

          overflowY:"auto",

          maxHeight:"500px",

          border:
            darkMode
            ?
            "1px solid #374151"
            :
            "1px solid #ddd",

          borderRadius:"10px",

          marginTop:"15px"

        }}

      >


        <table

          style={{

            width:"100%",

            minWidth:"1200px",

            borderCollapse:"collapse",

            background:
              darkMode
              ?
              "#1f2937"
              :
              "#ffffff",

            color:
              darkMode
              ?
              "#ffffff"
              :
              "#111827"

          }}

        >



          <thead>

            <tr>


              {
                columns.map(
                  (column)=>(


                    <th

                      key={column}

                      style={{

                        position:"sticky",

                        top:0,

                        zIndex:10,


                        background:
                          darkMode
                          ?
                          "#111827"
                          :
                          "#f8fafc",


                        color:
                          darkMode
                          ?
                          "#ffffff"
                          :
                          "#111827",


                        padding:"12px",


                        textAlign:"left",


                        whiteSpace:"nowrap",


                        borderBottom:
                          darkMode
                          ?
                          "1px solid #374151"
                          :
                          "1px solid #ddd"

                      }}

                    >

                      {column}

                    </th>


                  )
                )
              }


            </tr>


          </thead>





          <tbody>


            {

              records.length === 0

              ?

              (

                <tr>

                  <td

                    colSpan={columns.length}

                    style={{

                      padding:"20px",

                      textAlign:"center"

                    }}

                  >

                    No records imported

                  </td>


                </tr>

              )


              :


              records.map(
                (
                  record:any,
                  index:number
                )=>(


                  <tr

                    key={index}

                    style={{

                      background:

                        index % 2 === 0

                        ?

                        (

                          darkMode
                          ?
                          "#1f2937"
                          :
                          "#ffffff"

                        )

                        :

                        (

                          darkMode
                          ?
                          "#111827"
                          :
                          "#f9fafb"

                        )

                    }}

                  >



                    {

                      columns.map(
                        (column)=>(


                          <td

                            key={column}

                            style={{

                              padding:"10px",

                              whiteSpace:"nowrap",

                              borderBottom:

                                darkMode

                                ?

                                "1px solid #374151"

                                :

                                "1px solid #eee"

                            }}

                          >

                            {

                              record[column]

                              ?

                              String(record[column])

                              :

                              "-"

                            }


                          </td>


                        )
                      )

                    }



                  </tr>


                )

              )

            }


          </tbody>


        </table>


      </div>





      <div

        style={{

          display:"flex",

          gap:"20px",

          marginTop:"25px",

          flexWrap:"wrap"

        }}

      >


        <div

          style={{

            padding:"15px 25px",

            borderRadius:"10px",

            background:
              darkMode
              ?
              "#064e3b"
              :
              "#dcfce7",

            color:
              darkMode
              ?
              "#ffffff"
              :
              "#166534"

          }}

        >

          <strong>
            Total Imported:
          </strong>

          {" "}

          {result.totalImported || 0}


        </div>





        <div

          style={{

            padding:"15px 25px",

            borderRadius:"10px",

            background:
              darkMode
              ?
              "#7f1d1d"
              :
              "#fee2e2",

            color:
              darkMode
              ?
              "#ffffff"
              :
              "#991b1b"

          }}

        >

          <strong>
            Total Skipped:
          </strong>

          {" "}

          {result.totalSkipped || 0}


        </div>


      </div>


    </div>

  );

}