import "./page.scss";

function Page() {
  return (
    <>
      <main className="csv-import-page">
        <h1>CSV Import</h1>

        <section className="upload-section">
          <label htmlFor="csvFile" className="file-label">
            <span>Select CSV File</span>
            <input type="file" id="csvFile" accept=".csv" />
          </label>
          <p className="note">
            Max 200 rows. Required headers must be present.
          </p>
        </section>

        <div className="action-buttons">
          <button className="btn btn-primary" id="validateBtn">
            Validate
          </button>
          <button className="btn btn-success" id="importBtn" disabled>
            Import
          </button>
        </div>

        <section className="error-section">
          <h2>Validation Errors</h2>
          <table className="error-table">
            <thead>
              <tr>
                <th>Row #</th>
                <th>Error Message</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>3</td>
                <td>Phone number should be 10–15 digits</td>
              </tr>
              <tr>
                <td>5</td>
                <td>Unknown propertyType: "FLAT"</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
}

export default Page;
