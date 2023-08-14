import React, { useEffect, useState, useRef } from "react";
import { Select } from "@mantine/core";
import { Box, Text, TextInput, Button } from "@mantine/core";
import PrintingForm from "./PrintingForm";
import moment from "moment";

import Navbar from "../../Navbar";
import { DatePicker } from "react-responsive-datepicker";
import "react-responsive-datepicker/dist/index.css";

import { Stepper, Group } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const Header = () => {
  return (
    <>
      <Navbar />
    </>
  );
};

const Body = () => {
  const [checked, setChecked] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [bankDetails, setBankDetails] = useState({
    bankBranch: "",
    branchAddress: "",
  });

  const [student, setStudent] = useState({
    name: "",
    email: "",
    fathersName: "",
    mothersName: "",
    gender: "",
    dob: "",
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
    bankBranch: "",
    branchAddress: "",
    feeStatus: "",
  });

  const [sendData, setSendData] = useState({
    name: "",
    email: "",
    fathersName: "",
    mothersName: "",
    gender: "",
    dob: "",
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
    bankBranch: "",
    branchAddress: "",
    feeStatus: "",
  });

  const [step, setStep] = useState(1);

  // Stepper
  const [active, setActive] = useState(0);
  const Demo = () => {
    //middleware

    // const navigate = useNavigate();

    // const callMiddleware = async () => {
    //   try {
    //     const res = await fetch("/m1", {
    //       method: "GET",
    //       headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //       },
    //       credentials: "include",
    //     });
    //     const data = await res.json();
    //     console.log(data);

    //     if (!res.status === 200) {
    //       const error = new Error(res.error);
    //       throw error;
    //     }
    //   } catch (err) {
    //     console.log(err);
    //     navigate("/Student/StudentLogin");
    //   }
    // };

    // useEffect(() => {
    //   callMiddleware();
    // }, []);

    // const nextStep = () =>

    // const prevStep = () =>

    return (
      <>
        <Stepper active={active} onStepClick={setActive} breakpoint="sm">
          <Stepper.Step
            label="Registration Details"
            description="Create an account"
            style={{ color: "white" }}
            onChange={nextStep}
          >
            Step 1 content: Create an account
          </Stepper.Step>
          <Stepper.Step
            label="Personal Details"
            description="Verify email"
            style={{ color: "white" }}
            onChange={nextStep}
          >
            Step 2 content: Verify email
          </Stepper.Step>
          <Stepper.Step
            label="Academic Details"
            description="Get full access"
            style={{ color: "white" }}
            onChange={nextStep}
          >
            Step 3 content: Get full access
          </Stepper.Step>
          <Stepper.Step
            label="Bank Details"
            description="Get full access"
            style={{ color: "white" }}
            onChange={nextStep}
          >
            Step 4 content: Get full access
          </Stepper.Step>
          <Stepper.Step
            label="Fee Details"
            description="Get full access"
            style={{ color: "white" }}
            onChange={nextStep}
          >
            Step 5 content: Get full access
          </Stepper.Step>
          <Stepper.Completed>
            Completed, click back button to get to previous step
          </Stepper.Completed>
        </Stepper>

        <Group position="center" mt="xl">
          {/* <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button onClick={nextStep}>Next step</Button> */}
        </Group>
      </>
    );
  };

  // for next part of form

  function nextStep() {
    setActive((current) => (current < 5 ? current + 1 : current));
    setStep(step + 1);
    console.log(step);
  }

  //for prev part of form

  function prevStep() {
    setActive((current) => (current > 0 ? current - 1 : current));
    setStep(step - 1);

    console.log(step);
  }

  //handling inputs

  let name, value;

  const handleChange = (e) => {
    e.preventDefault();
    name = e.target.name;
    value = e.target.value;

    console.log(value);
    setStudent((prevStudent) => {
      const updatedStudent = { ...prevStudent, [name]: value };
      console.log(updatedStudent);
      Update(updatedStudent);
      return updatedStudent;
    });
  };

  // Getting ifsc data

  async function GetBankDetails(ifsc) {
    console.log(ifsc);

    const res = await fetch("/ifsc", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ ifsc: ifsc }),
    });

    const data = await res.json();

    // setStudent({ ...student, [branchAddress]: data.Address });

    // console.log(data);
    // setBankDetails({
    //   bankBranch: data.BANK,
    //   branchAddress: data.ADDRESS,
    // });

    return data;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storeData = localStorage.getItem("studentuserData");
    const email = JSON.parse(storeData);

    try {
      const result = await fetch("/active/student", {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!result.ok) {
        throw new Error("Registration failed"); // Handle the error case
      }

      const data = await result.json();

      if (data.message === "Registration completed") {
        window.alert("Profile completed");
        // window.print();
        window.location.href = "/Student/StudentHome";
      }
    } catch (error) {
      console.error(error);
      // Handle the error case, display an error message, etc.
    }
  };

  // useEffect(() => {
  //   Update();
  // }, [bankDetails]);

  const Update = async (student) => {
    const {
      name,
      fathersName,
      mothersName,
      gender,
      dob,
      nationality,
      domicile,
      address,
      coaddress,
      pinCode,
      aadhaarNo,
      phoneNo,
      sociallyChallenged,
      economicallyBackward,
      year,
      semester,
      branch,
      section,
      batch,
      rollNo,
      enRollNo,
      jeeRank,
      reapRank,
      other,
      feewaiver,
      accHolder,
      accountNo,

      ifsc,
      bankBranch,
      branchAddress,

      feeStatus,
    } = student;

    const storeData = localStorage.getItem("studentuserData");
    const email = JSON.parse(storeData);

    console.log(email);

    // setSendData({...student , []})

    const res = await fetch("/profile/student/edit", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        fathersName,
        mothersName,
        gender,
        dob,
        nationality,
        domicile,
        address,
        coaddress,
        pinCode,
        aadhaarNo,
        phoneNo,
        sociallyChallenged,
        economicallyBackward,
        year,
        semester,
        branch,
        section,
        batch,
        rollNo,
        enRollNo,
        jeeRank,
        reapRank,
        other,
        feewaiver,
        accHolder,
        accountNo,

        ifsc,
        bankBranch,
        branchAddress,

        feeStatus,
      }),
    });
    console.log(student);
  };

  const PartiallyFilled = async () => {
    const storeData = localStorage.getItem("studentuserData");
    const email = JSON.parse(storeData);

    // console.log(email);

    const res = await fetch("/student/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
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
    // console.log(data);

    // console.log(prevData);
  };

  useEffect(() => {
    PartiallyFilled();
  }, []);

  useEffect(() => {}, [step]);

  // console.log(prevData);

  // Simple GET request using fetch

  switch (step) {
    case 1:
      return (
        <>
          <div className="helpinghand">
            <h1
              style={{
                textAlign: "center",
                color: "white",
              }}
            >
              Complete Your Profile
            </h1>

            <Demo />
            <div
              method="PUT"
              className="FormRegistrationDetails"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <h1 className="registerHome">Registration Details</h1>
              <TextInput
                placeholder="Full Name"
                required
                name="name"
                value={student.name}
                onClick={handleChange}
                className="textinput"
                onChange={handleChange}
                withAsterisk
              />

              <TextInput
                required
                type="email"
                name="email"
                placeholder="email"
                value={student.email}
                onClick={handleChange}
                className="textinput"
                onChange={handleChange}
              ></TextInput>

              <Button
                onClick={() => {
                  nextStep();
                }}
              >
                Next
              </Button>
            </div>
          </div>
        </>
      );

    case 2:
      return (
        <>
          <div className="helpinghand"></div>
          <Demo />
          <div className="PersonalDetailId" style={{ display: "grid" }}>
            <h1 className="personalHome">Personal Details</h1>
            <TextInput
              name="fathersName"
              placeholder="Father's Name"
              value={student.fathersName}
              onClick={handleChange}
              className="textinput"
              onChange={handleChange}
            ></TextInput>
            <TextInput
              name="mothersName"
              placeholder="Mother's Name"
              value={student.mothersName}
              onClick={handleChange}
              className="textinput"
              onChange={handleChange}
            ></TextInput>

            <TextInput
              placeholder="gender"
              name="gender"
              value={student.gender}
              onClick={handleChange}
              className="textinput"
              onChange={handleChange}
            />

            <div style={{ zIndex: 100 }}>
              <TextInput
                onClick={() => {
                  setIsOpen(true);
                }}
                value={student.dob}
                placeholder="date"
              />
              <DatePicker
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                defaultValue={new Date(2023, 0, 0)}
                minDate={new Date(1950, 10, 10)}
                maxDate={new Date(moment().format("yy"), 0, 10)}
                headerFormat="DD, MM dd"
                onChange={(date) => {
                  {
                    console.log(date);
                    setStudent({ ...student, dob: date });
                  }
                }}
              />
            </div>

            <TextInput
              placeholder="nationality"
              name="nationality"
              value={student.nationality}
              onClick={handleChange}
              className="textinput"
              onChange={handleChange}
            />
            <Select
              // style={{ width: 45 + "%" }}
              data={[
                { value: "Rajasthan", label: "Rajasthan" },
                { value: "other", label: "other" },
              ]}
              onChange={(e) => {
                console.log(e);
                setStudent({ ...student, domicile: e });
              }}
              value={student.domicile}
              // sx={selectInputStyle}

              placeholder="Domicile"
            />

            <TextInput
              placeholder="Permanent address"
              name="address"
              value={student.address}
              onChange={handleChange}
              onClick={handleChange}
              className="textinput"
            />

            <TextInput
              placeholder="Correspondence address"
              name="coaddress"
              value={student.coaddress}
              onChange={handleChange}
              onClick={handleChange}
              className="textinput"
            />

            <TextInput
              placeholder="PINCode"
              name="pinCode"
              value={student.pinCode}
              onClick={handleChange}
              className="textinput"
              onChange={handleChange}
            />

            <TextInput
              placeholder="Aadhaar No."
              name="aadhaarNo"
              value={student.aadhaarNo}
              onClick={handleChange}
              className="textinput"
              onChange={handleChange}
            />

            <TextInput
              placeholder="Phone No"
              name="phoneNo"
              value={student.phoneNo}
              onClick={handleChange}
              className="textinput"
              onChange={handleChange}
            />

            <Select
              // style={{ width: 45 + "%" }}
              data={[
                { value: "SC", label: "SC" },
                { value: "ST", label: "ST" },
                { value: "OBC", label: "OBC" },
                { value: "NA", label: "NA" },
              ]}
              onChange={(e) => {
                console.log(e);
                setStudent({ ...student, sociallyChallenged: e });
              }}
              value={student.sociallyChallenged}
              // sx={selectInputStyle}

              placeholder="Socially Challenged"
            />

            <TextInput
              placeholder="Economically Backward: 
              YES/NO"
              name="economicallyBackward"
              value={student.economicallyBackward}
              onClick={handleChange}
              className="textinput"
              onChange={handleChange}
            />

            <Button
              onClick={() => {
                prevStep();
              }}
            >
              Back
            </Button>
            <Button
              onClick={() => {
                nextStep();
              }}
            >
              Next
            </Button>
          </div>
        </>
      );

    case 3:
      return (
        <>
          <div className="helpinghand"></div>
          <Demo />
          <div className="AcademicDetailsid">
            <h1>Academic Details</h1>
            <Select
              // style={{ width: 45 + "%" }}
              data={[
                { value: "1", label: "1" },
                { value: "2", label: "2" },
                { value: "3", label: "3" },
                { value: "4", label: "4" },
              ]}
              onChange={(e) => {
                console.log(e);
                setStudent({ ...student, year: e });
              }}
              value={student.year}
              // sx={selectInputStyle}

              placeholder="year"
            />
            <Select
              // style={{ width: 45 + "%" }}
              data={[
                { value: "1", label: "1" },
                { value: "2", label: "2" },
                { value: "3", label: "3" },
                { value: "4", label: "4" },
                { value: "5", label: "5" },
                { value: "6", label: "6" },
                { value: "7", label: "7" },
                { value: "8", label: "8" },
              ]}
              onChange={(e) => {
                console.log(e);
                setStudent({ ...student, semester: e });
              }}
              value={student.semester}
              // sx={selectInputStyle}

              placeholder="semester"
            />
            <Select
              // style={{ width: 45 + "%" }}
              data={[
                { value: "CS", label: "CS" },
                { value: "IT", label: "IT" },
              ]}
              onChange={(e) => {
                console.log(e);
                setStudent({ ...student, branch: e });
              }}
              value={student.branch}
              // sx={selectInputStyle}

              placeholder="branch"
            />
            <TextInput
              placeholder="batch"
              name="batch"
              value={student.batch}
              onChange={handleChange}
              onClick={handleChange}
              className="textinput"
            />
            <TextInput
              placeholder="section"
              name="section"
              value={student.section}
              onChange={handleChange}
              onClick={handleChange}
              className="textinput"
            />
            <TextInput
              placeholder="Roll No"
              name="rollNo"
              value={student.rollNo}
              onChange={handleChange}
              onClick={handleChange}
              className="textinput"
            />
            <TextInput
              placeholder="Enroll No"
              name="enRollNo"
              value={student.enRollNo}
              onChange={handleChange}
              onClick={handleChange}
              className="textinput"
            />
            <TextInput
              placeholder="JEE Rank"
              name="jeeRank"
              value={student.jeeRank}
              onChange={handleChange}
              onClick={handleChange}
              className="textinput"
            />
            <TextInput
              placeholder="Reap Rank"
              name="reapRank"
              value={student.reapRank}
              onChange={handleChange}
              onClick={handleChange}
              className="textinput"
            />
            <TextInput
              placeholder="Others"
              name="other"
              value={student.other}
              onChange={handleChange}
              onClick={handleChange}
              className="textinput"
            />

            <Select
              // style={{ width: 45 + "%" }}
              data={[
                { value: "Central Govt.", label: "Central Govt." },
                { value: "State Govt.", label: "State Govt." },
                { value: "Institutional Funds", label: "Institutional Funds" },
                { value: "Private Bodies", label: "Private Bodies" },
                { value: "Not Opted", label: "Not Opted" },
              ]}
              onChange={(e) => {
                console.log(e);
                setStudent({ ...student, feewaiver: e });
              }}
              value={student.feewaiver}
              // sx={selectInputStyle}

              placeholder="Opted for full TFWS?"
            />
            <Button
              onClick={() => {
                prevStep();
              }}
            >
              Back
            </Button>
            <Button
              onClick={() => {
                nextStep();
              }}
            >
              Next
            </Button>
          </div>
        </>
      );

    case 4:
      return (
        <>
          {/* { accHolder: "",
    accoundNo: "",

    ifsc: "",
    bankBranch: "",
    branchAddress: "",} */}
          <div className="helpinghand"></div>
          <Demo />
          <div className="Bank_Details">
            <h1>Bank Details</h1>
            <TextInput
              placeholder="Account Holder"
              name="accHolder"
              value={student.accHolder}
              onChange={handleChange}
              onClick={handleChange}
              className="textinput"
            />

            <TextInput
              placeholder="accountNo"
              name="accountNo"
              value={student.accountNo}
              onChange={handleChange}
              onClick={handleChange}
              className="textinput"
            />

            <TextInput
              placeholder="IFSC"
              name="ifsc"
              value={student.ifsc}
              onChange={(e) => {
                e.preventDefault();
                const name = e.target.name;
                const value = e.target.value;
                console.log(value);

                if (value.length >= 11) {
                  GetBankDetails(value)
                    .then((data) => {
                      console.log(data);
                      setStudent((prevStudent) => {
                        const updatedStudent = {
                          ...prevStudent,
                          bankBranch: data.BANK,
                          branchAddress: data.ADDRESS,
                        };
                        Update(updatedStudent);
                        return updatedStudent;
                      });
                      const treepls = student;
                      return treepls;
                    })
                    .then((data) => {});
                }
                // inputBankBranch.current.value = bankDetails.bankBranch;
                // inputBranchAdd.current.value = bankDetails.branchAddress;
                setStudent((prevStudent) => ({
                  ...prevStudent,
                  [name]: value,
                }));
              }}
              className="textinput"
            />

            <TextInput
              placeholder="Branch"
              name="bankBranch"
              value={student.bankBranch}
              // ref={bankDetails.bankBranch}
              className="textinput"
            />

            <TextInput
              placeholder="Branch Add"
              name="branchAddress"
              // ref={bankDetails.branchAddress}
              value={student.branchAddress}
              className="textinput"
            />

            <Button
              onClick={() => {
                prevStep();
              }}
            >
              Back
            </Button>
            <Button
              onClick={() => {
                nextStep();
              }}
            >
              Next
            </Button>
          </div>
        </>
      );
    case 5:
      return (
        <>
          {" "}
          <div className="helpinghand"></div>
          <Demo />
          <div className="Confirmation">
            <h1>Confirmation</h1>
            <TextInput
              placeholder="Wrtie Your Challan NO."
              name="feeStatus"
              value={student.feeStatus}
              onChange={handleChange}
              onClick={handleChange}
              className="textinput"
            />
            <Button
              onClick={() => {
                prevStep();
              }}
            >
              Back
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                window.open("/Student/Registration/PrintingForm");
              }}
            >
              Preview
            </Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </>
      );

    case 6:
      return (
        <>
          <PrintingForm email={student.email} />
        </>
      );
  }
};

const Footer = () => {
  return <></>;
};

function UserForm() {
  return (
    <>
      <Header />
      <div className="registrationBody">
        <Body />
      </div>
      <Footer />
    </>
  );
}

export default UserForm;
