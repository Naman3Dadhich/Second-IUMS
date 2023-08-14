import React from "react";

function SemesterRegistration({ semRegistration, email }) {
  console.log(semRegistration, email);

  return (
    <>
      <div className="SemesterRegistration">
        <div className="tab"></div>
        <div className="semsterCardContainer">
          <div className="semesterCard">
            <label className="progressCard">
              Year:
              <input
                type="text"
                name="Year"
                value={semRegistration[0].Year}
              ></input>
            </label>
            <label className="progressCard">
              Semester:
              <input
                type="text"
                name="Year"
                value={semRegistration[0].Semester}
              ></input>
            </label>
            <label className="progressCard">
              Challan No:
              <input
                type="text"
                name="Year"
                value={semRegistration[0].Challan}
              ></input>
            </label>
          </div>
          <div className="semesterCard">
            <label className="progressCard">
              Year:
              <input
                type="text"
                name="Year"
                value={semRegistration[1].Year}
              ></input>
            </label>
            <label className="progressCard">
              Semester:
              <input
                type="text"
                name="Year"
                value={semRegistration[1].Semester}
              ></input>
            </label>
            <label className="progressCard">
              Challan No:
              <input
                type="text"
                name="Year"
                value={semRegistration[1].Challan}
              ></input>
            </label>
          </div>
          <div className="semesterCard">
            <label className="progressCard">
              Year:
              <input
                type="text"
                name="Year"
                value={semRegistration[2].Year}
              ></input>
            </label>
            <label className="progressCard">
              Semester:
              <input
                type="text"
                name="Year"
                value={semRegistration[2].Semester}
              ></input>
            </label>
            <label className="progressCard">
              Challan No:
              <input
                type="text"
                name="Year"
                value={semRegistration[2].Challan}
              ></input>
            </label>
          </div>
          <div className="semesterCard">
            <label className="progressCard">
              Year:
              <input
                type="text"
                name="Year"
                value={semRegistration[3].Year}
              ></input>
            </label>
            <label className="progressCard">
              Semester:
              <input
                type="text"
                name="Year"
                value={semRegistration[3].Semester}
              ></input>
            </label>
            <label className="progressCard">
              Challan No:
              <input
                type="text"
                name="Year"
                value={semRegistration[3].Challan}
              ></input>
            </label>
          </div>
          <div className="semesterCard">
            <label className="progressCard">
              Year:
              <input
                type="text"
                name="Year"
                value={semRegistration[4].Year}
              ></input>
            </label>
            <label className="progressCard">
              Semester:
              <input
                type="text"
                name="Year"
                value={semRegistration[4].Semester}
              ></input>
            </label>
            <label className="progressCard">
              Challan No:
              <input
                type="text"
                name="Year"
                value={semRegistration[4].Challan}
              ></input>
            </label>
          </div>
          <div className="semesterCard">
            <label className="progressCard">
              Year:
              <input
                type="text"
                name="Year"
                value={semRegistration[5].Year}
              ></input>
            </label>
            <label className="progressCard">
              Semester:
              <input
                type="text"
                name="Year"
                value={semRegistration[5].Semester}
              ></input>
            </label>
            <label className="progressCard">
              Challan No:
              <input
                type="text"
                name="Year"
                value={semRegistration[5].Challan}
              ></input>
            </label>
          </div>
          <div className="semesterCard">
            <label className="progressCard">
              Year:
              <input
                type="text"
                name="Year"
                value={semRegistration[6].Year}
              ></input>
            </label>
            <label className="progressCard">
              Semester:
              <input
                type="text"
                name="Year"
                value={semRegistration[6].Semester}
              ></input>
            </label>
            <label className="progressCard">
              Challan No:
              <input
                type="text"
                name="Year"
                value={semRegistration[6].Challan}
              ></input>
            </label>
          </div>
          <div className="semesterCard">
            <label className="progressCard">
              Year:
              <input
                type="text"
                name="Year"
                value={semRegistration[7].Year}
              ></input>
            </label>
            <label className="progressCard">
              Semester:
              <input
                type="text"
                name="Year"
                value={semRegistration[7].Semester}
              ></input>
            </label>
            <label className="progressCard">
              Challan No:
              <input
                type="text"
                name="Year"
                value={semRegistration[7].Challan}
              ></input>
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default SemesterRegistration;
