import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./Bill.css";
import Logo2 from "../../../assets/another logo.jpg";
import { useEffect } from "react";
import ReactToPrint from "react-to-print";

const Bill = () => {

  // ------------ Print --------

  const componentRef = useRef();

  // ----------End Print -------

  const userDataString = localStorage.getItem("userData");
  const formDataString = localStorage.getItem("formData");

  // Convert the stringified JSON back to objects
  const userInfo = JSON.parse(userDataString);
  const form = JSON.parse(formDataString);

  // Clear the data from localStorage once retrieved
  // useEffect(() => {
  //   localStorage.removeItem("userData");
  //   localStorage.removeItem("formData");
  // }, []);
  console.log(userInfo);
  console.log(form);


  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const id = localStorage.getItem("id");
  const handlePrint = () => {
    window.print();
  };

  // Get current date

  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };

  const formattedDate = new Date().toLocaleDateString(undefined, options);
  const formattedStartDate = new Date(form.startDate).toLocaleDateString(undefined, options);
  const formattedEndDate = new Date(form.endDate).toLocaleDateString(undefined, options);
  // -------------------------------------
  // Menbership Type : 
  const [membership, setMembership] = useState("");

  useEffect(() => {
    switch (form.membershiptype) {
      case "1MH":
        setMembership("1 Month (Hardcore)");
        break;
      case "3MH":
        setMembership("3 Months (Hardcore)");
        break;
      case "6MH":
        setMembership("6 Months (Hardcore)");
        break;
      case "12MH":
        setMembership("1 year (Hardcore)");
        break;
      case "3MHPC":
        setMembership("3 Months (Hardcore + PT + Cardio)");
        break;
      case "3MHC":
        setMembership("3 Months (Hardcore + Cardio)");
        break;
      case "6MHC":
        setMembership("6 Months (Hardcore + Cardio)");
        break;
      case "12MHC":
        setMembership("1 Year Months (Hardcore + Cardio)");
        break;
      default:
        break;
    }
  })

  if (token && id && role === "admin") {
    return (
      <div className="bill-body">
        <ReactToPrint
          trigger={() => <button className="btn btn-download">Print / Download </button>}
          content={() => componentRef.current}
        />
        <main className="bill-main" >
          <div className="to-print" ref={componentRef}>
          {/* Header */}
          <header className="bill-header">
            <div>
              <img className="bill-logo" src={Logo2} alt="" />
            </div>
            {/* <div className="bill-ul">
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
            </div> */}
          </header>
          {/* Header Close */}

          {/* Details */}
          <section className="cust-details">
            <h2>Royalty Fitness</h2>
            <p>Kharbi, Nagpur</p>
          </section>
          {/* End of Details */}

          {/* Client Details */}
          <section className="client-details">
            <h2>{userInfo.Name}</h2>
            <p>{userInfo.Address}</p>
          </section>
          {/* End of Client Details */}

          {/* Date */}
          <article className="bill-date">
            <ul>
              <li className="p-1">
                <span className="font-bold">Invoice Number: </span>1001
              </li>
              <li className="p-1 invoice-date">
                <span className="font-bold">Invoice Date: </span>{formattedDate}
                {/* <span className="font-bold">Invoice Date: </span>{currentDate.toLocaleDateString()} */}
              </li>
              <li className="p-1">
                <span className="font-bold">Due Date: </span>05-11-2023
              </li>
            </ul>
          </article>
          {/* End of Date */}

          {/* Table */}
          <div className="my-5 bill-table">
            <table width="100%">
              <thead style={{ backgroundColor: "#edf2f7" }}>
                <tr>
                  <th>Membership</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody style={{ textAlign: "center" }}>
                <tr>
                  <td>{membership}</td>
                  <td>{formattedStartDate}</td>
                  <td>{formattedEndDate}</td>
                  <td>{form.feespaid}</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* End of Table */}

          {/* Notes */}
          <section className="mb-5" style={{ marginTop: "2.5rem" }}>
            {/* Textarea */}
            <p>Notes to the client...</p>
          </section>
          {/* End of Notes */}

          {/* Footer */}
          <footer className="bill-footer">
            <ul>
              {/* <li>
                <span className="font-bold">Your Name: </span>dummy data
              </li>
              <li>
                {" "}
                <span className="font-bold">Address: </span>dummy data
              </li> */}
              <li>
                <span className="font-bold">Phone Number: </span>+91 96048 98705
              </li>
              <li>
                <span className="font-bold">Website: </span>royaltyfitness.mysubdomain
              </li>
            </ul>
          </footer>
          {/* End of Footer */}
          </div>
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
