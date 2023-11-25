import React from "react";
import { Link } from "react-router-dom";
import "./Bill.css";
const Bill = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const id = localStorage.getItem("id");
  const handlePrint = () => {
    window.print();
  };

  if (token && id && role === "admin") {
    return (
      <div className="bill-body">
        <main className="bill-main">
          {/* Header */}
          <header className="bill-header">
            <div>
              <h1>Invoicer</h1>
            </div>
            <div className="bill-ul">
              <ul>
                <li>
                  <button className="btn-print " onClick={handlePrint}>
                    Print
                  </button>
                </li>
                <li>
                  <button className="btn btn-download">Download</button>
                </li>
                <li>
                  <button className="btn btn-send">Send</button>
                </li>
              </ul>
            </div>
          </header>
          {/* Header Close */}

          {/* Details */}
          <section className="cust-details">
            <h2>Royalty Fitness
              
            </h2>
            <p>Your Address</p>
          </section>
          {/* End of Details */}

          {/* Client Details */}
          <section className="client-details">
            <h2>Cleint`s Name</h2>
            <p>Client`s Addess</p>
          </section>
          {/* End of Client Details */}

          {/* Date */}
          <article className="bill-date">
            <ul>
              <li className="p-1">
                <span className="font-bold">Invoice Number:</span>1001
              </li>
              <li className="p-1 invoice-date">
                <span className="font-bold">Invoice Date:</span>05-11-2023
              </li>
              <li className="p-1">
                <span className="font-bold">Due Date:</span>05-11-2023
              </li>
            </ul>
          </article>
          {/* End of Date */}

          {/* Table */}
          <div className="my-5">
            <table width="100%">
              <thead style={{backgroundColor:"#edf2f7"}}>
                <tr>
                  <th>Membership</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody style={{textAlign:"center"}}>
                <tr>
                  <td>3 Months membership</td>
                  <td>30-12-2023</td>
                  <td>30-03-2024</td>
                  <td>3000</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* End of Table */}

          {/* Notes */}
          <section className="mb-5" style={{marginTop:"2.5rem"}}>
            {/* Textarea */}
            <p>Notes to the client...</p>
            
          </section>
          {/* End of Notes */}

          {/* Footer */}
          <footer className="bill-footer">
            <ul>
              <li>
                <span className="font-bold">Your Name: </span>dummy data
              </li>
              <li>
              {" "}<span className="font-bold">Address: </span>dummy data
              </li>
              <li>
                <span className="font-bold">Phone Number: </span>dummy data
              </li>
              <li>
                <span className="font-bold">Website: </span>dummy data
              </li>
            </ul>
          </footer>
          {/* End of Footer */}
        </main>
      </div>
    );
  } else {
    return (
      <>
        <h1 style={{ textAlign: "center" }}>
          You are not authorized
          <br />
          <Link to="/">Go to Home</Link>
        </h1>
      </>
    );
  }
};
export default Bill;
