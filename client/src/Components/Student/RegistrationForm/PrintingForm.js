import React, { useEffect, useState } from "react";
import "../printingform.css";
import { useNavigate } from "react-router-dom";

function PrintingForm({ email }) {
  //middleware
  const navigate = useNavigate();

  const callMiddleware = async () => {
    try {
      const res = await fetch("/m1", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);

      setStudent({
        name: data.name,
        email: data.email,

        fathersName: data.fathersName,
        mothersName: data.mothersName,
        gender: data.gender,
        nationality: data.nationality,
        domicile: data.domicile,
        address: data.address,
        coaddress: data.coaddress,
        pinCode: data.pinCode,
        aadhaarNo: data.aadhaarNo,
        phoneNo: data.phoneNo,
        sociallyChallenged: data.sociallyChallenged,
        economicallyBackward: data.economicallyBackward,
        year: data.year,
        semester: data.semester,
        branch: data.branch,
        section: data.section,
        batch: data.batch,
        rollNo: data.rollNo,
        enRollNo: data.enRollNo,
        jeeRank: data.jeeRank,
        reapRank: data.reapRank,
        other: data.other,
        feeWaiver: data.feeWaiver,
        accHolder: data.accHolder,
        accountNo: data.accountNo,

        ifsc: data.ifsc,
        bankBranch: data.bankBranch,
        branchAddress: data.branchAddress,

        feeStatus: "",
      });

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      navigate("/Student/StudentLogin");
    }
  };

  useEffect(() => {
    callMiddleware();
  }, []);

  const [student, setStudent] = useState({
    name: "",
    email: "",

    fathersName: "",
    mothersName: "",
    gender: "",
    nationality: "",
    domicile: "",
    address: "",
    coaddress: "",
    pinCode: "",
    aadhaarNo: "",
    phoneNo: "",
    sociallyChallenged: "",
    economicallyBackward: "",
    year: "",
    semester: "",
    branch: "",
    section: "",
    batch: "",
    rollNo: "",
    enRollNo: "",
    jeeRank: "",
    reapRank: "",
    other: "",
    feeWaiver: "",
    accHolder: "",
    accountNo: "",

    ifsc: "",

    feeStatus: "",
  });
  // fetching data
  const PartiallyFilled = async () => {
    // console.log(email);

    const res = await fetch("/student/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    console.log(data);
  };

  useEffect(() => {
    PartiallyFilled();
  }, []);

  return (
    <div className="printform">
      <div className="pageHeading">
        <h1>Registration Details</h1>
      </div>
      <div className="pageContent">
        <div className="PrintRegistrationDetails">
          <div className="personalDetails">
            <p className="formHeading">Personal Details</p>
            <div className="personalDetailsContent">
              <label>Name: </label>
              <span className="input">{student.name}</span>
              <label>Email:</label>
              <span className="input"></span>
              <label>Father's Name: </label>
              <span className="input">{student.fathersName}</span>
              <label>Mother's Name: </label>
              <span className="input">{student.mothersName}</span>
              <label>Gender: </label>
              <span className="input">{student.gender}</span>
              <label>Nationality: </label>
              <span className="input">{student.nationality}</span>
              <label>Domicile: </label>
              <span className="input">{student.domicile}</span>
              <label>Permanent Address: </label>
              <span className="input">{student.address}</span>
              <label>Correspondence Address: </label>
              <span className="input">{student.coaddress}</span>
              <label>Pin Code: </label>
              <span className="input">{student.pinCode}</span>
              <label>Aadhaar No.: </label>
              <span className="input">{student.aadhaarNo}</span>
              <label>Phone No.: </label>
              <span className="input">{student.phoneNo}</span>
              <label>Socially Challenged: </label>
              <span className="input">{student.sociallyChallenged}</span>
              <label>Economically Backward: </label>
              <span className="input">{student.economicallyBackward}</span>
            </div>
          </div>
          {/* Academic Details */}
          <div className="academicDetails">
            <p className="formHeading">Academic Details </p>
            <div className="academicDetailsContent">
              <label>Year:</label>
              <span className="input">{student.year}</span>
              <label>Semester:</label>
              <span className="input">{student.semester}</span>
              <label>Branch:</label>
              <span className="input">{student.branch}</span>
              <label>Batch:</label>
              <span className="input">{student.batch}</span>
              <label>Section:</label>
              <span className="input">{student.section}</span>
              <label>Roll No.:</label>
              <span className="input">{student.rollNo}</span>
              <label>Enroll No.:</label>
              <span className="input">{student.enRollNo}</span>
              <label>JEE Rank:</label>
              <span className="input">{student.jeeRank}</span>
              <label>Reap Rank:</label>
              <span className="input">{student.reapRank}</span>
              <label>Others:</label>
              <span className="input">{student.other}</span>
              <label>Opted for TFWS:</label>
              <span className="input">{student.feeWaiver}</span>
            </div>
          </div>
          {/* BAnk Details */}
          <div className="bankDetails">
            <p className="formHeading">Bank Details</p>
            <div className="bankDetailsContent">
              <label>Account Holder:</label>
              <span className="input">{student.accHolder}</span>
              <label>Account No.:</label>
              <span className="input">{student.accountNo}</span>
              <label>IFSC:</label>
              <span className="input">{student.ifsc}</span>
              <label>Branch Name:</label>
              <span className="input">{student.bankBranch}</span>
              <label>Branch Address:</label>
              <span className="input">{student.branchAddress}</span>
            </div>
          </div>
          {/* Fee Details */}
          <div className="feeDetails">
            <p className="formHeading">Fee Details</p>
            <div className="feeDetailsContent">
              <label>Challan No.: </label>
              <span className="input">{student.feeStatus}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrintingForm;
