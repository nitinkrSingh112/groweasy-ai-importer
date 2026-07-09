interface PreviewTableProps {
  rows: any[];
  darkMode: boolean;
}

export default function PreviewTable({
  rows,
  darkMode,
}: PreviewTableProps) {

  if (!rows || rows.length === 0) {
    return null;
  }

  const headers = Object.keys(rows[0]);

  return (

    <div
      style={{
        marginTop: "30px",
      }}
    >

      <h2>
        CSV Preview
      </h2>

      <p>
        Showing first {rows.length} uploaded records
      </p>

      <div
        style={{
          overflowX: "auto",
          overflowY: "auto",
          maxHeight: "400px",
          border: darkMode
            ? "1px solid #374151"
            : "1px solid #ddd",
          borderRadius: "10px",
          marginTop: "15px",
        }}
      >

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: "900px",
            background: darkMode
              ? "#1f2937"
              : "#ffffff",
            color: darkMode
              ? "#ffffff"
              : "#111827",
          }}
        >

          <thead>

            <tr>

              {headers.map((header) => (

                <th
                  key={header}
                  style={{
                    position: "sticky",
                    top: 0,
                    background: darkMode
                      ? "#111827"
                      : "#f8fafc",
                    color: darkMode
                      ? "#ffffff"
                      : "#111827",
                    padding: "12px",
                    textAlign: "left",
                    borderBottom: darkMode
                      ? "1px solid #374151"
                      : "1px solid #ddd",
                    zIndex: 10,
                    whiteSpace: "nowrap",
                  }}
                >
                  {header}
                </th>

              ))}

            </tr>

          </thead>

          <tbody>

            {rows.map((row, index) => (

              <tr
                key={index}
                style={{
                  background:
                    index % 2 === 0
                      ? darkMode
                        ? "#1f2937"
                        : "#ffffff"
                      : darkMode
                        ? "#111827"
                        : "#f9fafb",
                }}
              >

                {headers.map((header) => (

                  <td
                    key={header}
                    style={{
                      padding: "10px",
                      borderBottom: darkMode
                        ? "1px solid #374151"
                        : "1px solid #eee",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {row[header]
                      ? String(row[header])
                      : "-"}
                  </td>

                ))}

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}