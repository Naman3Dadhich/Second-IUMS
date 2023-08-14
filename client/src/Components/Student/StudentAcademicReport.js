import React, { useEffect, useState } from "react";
import { Select } from "@mantine/core";

const SemesterReposrt = ({ sem }) => {
  console.log(sem);

  return (
    <>
      <label className="progressCard">
        Year:
        <input type="text" name="Year" value={sem.Year}></input>
      </label>
      <label className="progressCard">
        Semester:
        <input type="text" name="Semester" value={sem.Semester}></input>
      </label>
      <label className="progressCard">
        Result:
        <Select
          // style={{ width: 45 + "%" }}
          data={[
            { value: "Pass", label: "Pass" },
            { value: "Back", label: "Back" },
          ]}
          value={sem.result}
          placeholder="result"
        />
      </label>
      <label className="progressCard">
        SGPA:
        <input type="text" name="sgpa" value={sem.sgpa}></input>
      </label>
    </>
  );
};

const EditAcademicReport = ({ sem, email }) => {
  const [editingData, setEditingData] = useState({});

  console.log(email);

  useEffect(() => {
    setEditingData(sem);
  }, []);

  const handleSubmit = async () => {
    console.log(editingData, email);

    const { Semester, result, sgpa } = editingData;

    const res = await fetch("/academic-progress", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        Semester: Semester,
        result: result,
        sgpa: sgpa,
      }),
    });

    const data = await res.json();
    if (data.message === "Academic progress updated successfully") {
      window.alert("Fields changed successfully");
      console.log("Fields changed successfully");
    } else {
      window.alert("Failed to change fields");
      console.log("Failed to change fields");
    }
  };

  return (
    <>
      <label className="progressCard">
        Year:
        <input type="text" name="year" value={editingData.Year}></input>
      </label>
      <label className="progressCard">
        Semester:
        <input type="text" name="semester" value={editingData.Semester}></input>
      </label>
      <label className="progressCard">
        Result:
        <Select
          // style={{ width: 45 + "%" }}
          data={[
            { value: "Pass", label: "Pass" },
            { value: "Back", label: "Back" },
          ]}
          onChange={(e) => {
            setEditingData({ ...editingData, result: e });
          }}
          value={editingData.result}
          placeholder="result"
        />
      </label>
      <label className="progressCard">
        SGPA:
        <input
          type="text"
          name="sgpa"
          // placeholder="{student.semester}"

          value={editingData.sgpa}
          onChange={(e) => {
            e.preventDefault();
            setEditingData({ ...editingData, sgpa: e.target.value });
          }}
        ></input>
      </label>
      <button type="submit" className="StudentSubmit" onClick={handleSubmit}>
        Change
      </button>
    </>
  );
};

function AcademicReport({ academicProgress, email }) {
  const [semester, setSemester] = useState(academicProgress);
  const [wait, setWait] = useState(false);
  const [edit, setEdit] = useState(false);

  console.log(academicProgress);
  console.log(email);

  const [ekSem, setEkSem] = useState({});
  const [one, setOne] = useState(false);
  const [two, setTwo] = useState(false);
  const [three, setThree] = useState(false);
  const [four, setFour] = useState(false);
  const [five, setFive] = useState(false);
  const [six, setSix] = useState(false);
  const [seven, setSeven] = useState(false);
  const [eight, setEight] = useState(false);

  const [step, setStep] = useState(1);

  useEffect(() => {
    setSemester(academicProgress);
  }, [email]);

  return (
    <>
      <div className="academicReportOuterContainer">
        {semester !== undefined &&
        email !== undefined &&
        academicProgress !== undefined ? (
          <>
            <div className="academicReportContainer">
              <div>
                <div className="tabs">
                  <p>
                    <button
                      className="profileContentButton"
                      onClick={() => setStep(1)}
                    >
                      1st Sem
                    </button>
                  </p>

                  <p>
                    <button
                      className="profileContentButton"
                      onClick={() => setStep(2)}
                    >
                      2nd Sem
                    </button>
                  </p>
                  <p>
                    <button
                      className="profileContentButton"
                      onClick={() => setStep(3)}
                    >
                      3rd Sem
                    </button>
                  </p>
                  <p>
                    <button
                      className="profileContentButton"
                      onClick={() => setStep(4)}
                    >
                      4th Sem
                    </button>
                  </p>
                  <p>
                    <button
                      className="profileContentButton"
                      onClick={() => setStep(5)}
                    >
                      5th Sem
                    </button>
                  </p>
                  <p>
                    <button
                      className="profileContentButton"
                      onClick={() => setStep(6)}
                    >
                      6th Sem
                    </button>
                  </p>
                  <p>
                    <button
                      className="profileContentButton"
                      onClick={() => setStep(7)}
                    >
                      7th Sem
                    </button>
                  </p>
                  <p>
                    <button
                      className="profileContentButton"
                      onClick={() => setStep(8)}
                    >
                      8th Sem
                    </button>
                  </p>
                  <span className="utilityButtonspan">
                    <button
                      className="utilityButton back"
                      onClick={() =>
                        setStep((step) => (step > 1 ? step - 1 : 1))
                      }
                    >
                      Back
                    </button>

                    <button
                      className="utilityButton next"
                      onClick={() =>
                        setStep((step) => (step < 8 ? step + 1 : 8))
                      }
                    >
                      Next
                    </button>
                    <button
                      className="utilityButton home"
                      onClick={() =>
                        (window.location.href = "/Student/StudentHome")
                      }
                    >
                      Home
                    </button>
                  </span>
                </div>
              </div>
              <div className="reportCardContainer">
                {step === 1 ? (
                  <div className="reportCard">
                    <button onClick={() => setOne(!one)}>&#10000;</button>
                    {one && semester != null && academicProgress.length > 0 ? (
                      <EditAcademicReport sem={semester[0]} email={email} />
                    ) : (
                      <SemesterReposrt sem={semester[0]} />
                    )}
                  </div>
                ) : step === 2 ? (
                  <div className="reportCard">
                    <button onClick={() => setTwo(!two)}>&#10000;</button>
                    {two ? (
                      <EditAcademicReport sem={semester[1]} email={email} />
                    ) : (
                      <SemesterReposrt sem={semester[1]} />
                    )}
                  </div>
                ) : step === 3 ? (
                  <div className="reportCard">
                    <button onClick={() => setThree(!three)}>&#10000;</button>
                    {three ? (
                      <EditAcademicReport sem={semester[2]} email={email} />
                    ) : (
                      <SemesterReposrt sem={semester[2]} />
                    )}
                  </div>
                ) : step === 4 ? (
                  <div className="reportCard">
                    <button onClick={() => setFour(!four)}>&#10000;</button>
                    {four ? (
                      <EditAcademicReport sem={semester[3]} email={email} />
                    ) : (
                      <SemesterReposrt sem={semester[3]} />
                    )}
                  </div>
                ) : step === 5 ? (
                  <div className="reportCard">
                    <button onClick={() => setFive(!five)}>&#10000;</button>
                    {five ? (
                      <EditAcademicReport sem={semester[4]} email={email} />
                    ) : (
                      <SemesterReposrt sem={semester[4]} />
                    )}
                  </div>
                ) : step === 6 ? (
                  <div className="reportCard">
                    <button onClick={() => setSix(!six)}>&#10000;</button>
                    {six ? (
                      <EditAcademicReport sem={semester[5]} email={email} />
                    ) : (
                      <SemesterReposrt sem={semester[5]} />
                    )}
                  </div>
                ) : step === 7 ? (
                  <div className="reportCard">
                    <button onClick={() => setSeven(!seven)}>&#10000;</button>
                    {seven ? (
                      <EditAcademicReport sem={semester[6]} email={email} />
                    ) : (
                      <SemesterReposrt sem={semester[6]} />
                    )}
                  </div>
                ) : step === 8 ? (
                  <div className="reportCard">
                    <button onClick={() => setEight(!eight)}>&#10000;</button>
                    {eight ? (
                      <EditAcademicReport sem={semester[7]} email={email} />
                    ) : (
                      <SemesterReposrt sem={semester[7]} />
                    )}
                  </div>
                ) : (
                  <h1>Loading....</h1>
                )}

                {/* <span
                  style={{
                    padding: 1 + "em",
                    display: "flex",
                    justifyContent: "space-between",
                    width: 100 + "%",
                  }}
                >
                  <a href="/Student/StudentHome">Back</a>
                  <a href="/Student/StudentHome">Home</a>
                  <a href="">Next</a>
                </span> */}
              </div>
            </div>
          </>
        ) : (
          <h1>Loading....</h1>
        )}
      </div>
    </>
  );
}

{
  /* <EditAcademicReport 
                   ekSem={ekSem}
                   semester={semester}
                   setSemester={setSemester}
                   email={email}
                   edit={edit}
                   editingIndex={editingIndex}
                   setEditingIndex={setEditingIndex}
                 /> */
}

export default AcademicReport;
