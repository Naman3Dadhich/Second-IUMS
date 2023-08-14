import React from "react";

function Functionality() {
  return (
    <div className="functionality-container">
      <h1 className="functionality-header">Functions</h1>
      <ul className="functionality-list">
        <li className="functionality-item">
          <span className="functionality-icon">&#10004;</span>
          Enables faculties to record attendance.
        </li>
        <li className="functionality-item">
          <span className="functionality-icon">&#10004;</span>
          Allows new students to register semester-wise.
        </li>
        <li className="functionality-item">
          <span className="functionality-icon">&#10004;</span>
          Enables uploading, editing, and deletion of syllabus schemes.
        </li>
        <li className="functionality-item">
          <span className="functionality-icon">&#10004;</span>
          Allows uploading and editing of timetables.
        </li>
        <li className="functionality-item">
          <span className="functionality-icon">&#10004;</span>
          Allows students to view the status of their attendance for different
          subjects.
        </li>
        <li className="functionality-item">
          <span className="functionality-icon">&#10004;</span>
          Allows faculties to view the past attendance records of students for
          their class.
        </li>
        <li className="functionality-item">
          <span className="functionality-icon">&#10004;</span>
          Generates attendance reports, providing both subject-wise and
          month-wise summaries.
        </li>
      </ul>
    </div>
  );
}

export default Functionality;
