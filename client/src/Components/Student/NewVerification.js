import React, { useState, useEffect } from "react";

const NewVerification = () => {
  console.log("say something ");
  const dataToVerify = JSON.parse(localStorage.getItem("verificationData"));

  console.log(dataToVerify);

  const { email, phoneNo } = dataToVerify;

  console.log(email, phoneNo);

  const [otp, setOtp] = useState({ emailOtp: "" });

  let nameotp, value;

  const [verifying, setVerifying] = useState(false);

  const handleotp = (e) => {
    e.preventDefault();

    nameotp = e.target.name;
    value = e.target.value;

    setOtp({ ...otp, [nameotp]: value });
  };

  // email otp generation

  // phone no otp generation

  // const bottomClick = async () => {
  //   const res = await fetch("/mobilegenerate-otp", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       phoneNo: phoneNo,
  //     }),
  //   });

  //   // const data = await res.json();
  // };

  //email otp verification

  let emailConfirmation, phoneConfirmation;

  const verifyEmail = async () => {
    const res = await fetch("/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        otp: otp.emailOtp,
      }),
    });

    // console.log(otp.emailOtp);

    const emaildata = await res.json();

    if (emaildata.message === "Verification successful") {
      window.location.href = "/Student/StudentLogin";
    }
  };

  //   const verifyPhone = async () => {
  //     const res = await fetch("/mobileverify-otp", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         phoneNo: phoneNo,
  //         otp: otp.phoneOtp,
  //       }),
  //     });

  //     phonedata = await res.json();
  //     phoneConfirmation = phonedata.message;

  //     // setVerifying(false);
  //   };

  // function cverify() {
  //   if (
  //     emailConfirmation === "Verification successful" &&
  //     phoneConfirmation === "Verification successful"
  //   ) {
  //     window.alert("Succesfully Registered");
  //     window.location.href = "/Student/StudentLogin";

  //     seding registration details

  //     const data = res.json();
  //     if (!data) {
  //     window.alert("INvalid Registration");
  //       console.log("registration failed");
  //     }
  //   } else {
  //     window.alert("INvalid Registration");
  //     window.alert("OTP input was incorrect Try again with GET OTP");
  //   }
  // }

  // bottomClick();

  return (
    <div className="verificationBlock">
      <div className="verifyText">
        <div className="emailText">
          <h2
            style={{
              margin: 20 + "px",
              marginTop: 0 + "px",
              marginBottom: 30 + "px",
            }}
          >
            Verify Your Email
          </h2>
          <p style={{ margin: 20 + "px" }}>
            We have sent a code on your e-mail.
          </p>
          <p style={{ margin: 20 + "px" }}>
            Please check your inbox for verfication code.
          </p>
        </div>
        <div
          className="phoneText"
          style={{ display: "flex", alignItems: "start" }}
        >
          <h2 style={{ margin: 20 + "px", marginBottom: 30 + "px" }}>
            Verify Your Phone
          </h2>
          <p style={{ margin: 20 + "px", marginTop: 10 + "px" }}>
            We have sent a code on your Phone.
          </p>
          <p style={{ margin: 20 + "px", marginTop: 10 + "px" }}>
            Please check your SMS for verfication code.
          </p>
          <a
            style={{ margin: 20 + "px", marginTop: 30 + "px" }}
            href="/Student/StudentRegistration"
          >
            Back
          </a>
        </div>
      </div>

      <div className="verifyInput">
        <div className="emailInput">
          <input
            name="emailOtp"
            placeholder="email verification"
            value={otp.emailOtp}
            onChange={handleotp}
            style={{ maxWidth: 200 + "px" }}
          />
          <p>
            <button
              type="button"
              name="verifying"
              onClick={() => {
                verifyEmail();
              }}
              style={{ margin: 0, width: 200 + "px", flexGrow: 1 }}
            >
              verify
            </button>
          </p>
          <a
            onClick={(e) => {
              e.preventDefault();

              // buttonClick(email);
            }}
            style={{ color: "blue", textDecoration: "underline" }}
          >
            resend otp
          </a>
        </div>

        <div className="phoneInput">
          <input
            name="phoneOtp"
            placeholder="phone no. verification"
            value={otp.phoneOtp}
            onChange={handleotp}
          ></input>

          <button
            type="button"
            name="verifying"
            onClick={() => {
              //   verifyPhone();
              // cverify();
            }}
            style={{ maxWidth: 200 + "px" }}
          >
            verify
          </button>
          <a
            onClick={(e) => {
              e.preventDefault();

              // bottomClick(phoneNo);
            }}
            style={{
              marginTop: 10 + "px",
              color: "blue",
              textDecoration: "underline",
            }}
          >
            resend otp
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewVerification;
