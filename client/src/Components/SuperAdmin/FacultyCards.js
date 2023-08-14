import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";

const FacultyCards = () => {
  const [pending, setPending] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [columns, setColumns] = useState([]);
  const [facultyListData, setFacultyListData] = useState([]);

  function convertArrayOfObjectsToCSV(array) {
    let result;

    const columnDelimiter = ",";
    const lineDelimiter = "\n";
    const keys = Object.keys(facultyListData[0]);

    result = "";
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach((item) => {
      let ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];

        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }

  // Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
  function downloadCSV(array) {
    const link = document.createElement("a");
    let csv = convertArrayOfObjectsToCSV(facultyListData);
    if (csv == null) return;

    const filename = "classwiseSummaryReport.csv";

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", filename);
    link.click();
  }

  //

  useEffect(() => {
    const result = facultyListData.filter((Student) => {
      return Student.name.toLowerCase().match(search.toLowerCase());
    });
    setFilteredUsers(result);
  }, [search]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setColumns([
        {
          name: "S. No.",
          selector: (row) => row,
          cell: (row) => (
            <div className="custom-column" style={{ width: "50px" }}>
              {row.rollNo}
            </div>
          ),
        },
        {
          name: "Name",
          selector: (row) => row.name,
        },
        {
          name: "ID",
          selector: (row) => row.id,
        },
        {
          name: "Email",
          selector: (row) => row.email,
        },
        {
          name: "Qualification",
          selector: (row) => row.Qualification,
        },
        {
          name: "Expreience",
          selector: (row) => row.Expreience,
        },
        {
          name: "Area of Interest",
          selector: (row) => row.Expertise,
        },
      ]);
      setPending(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  const Export = ({ onExport }) => (
    <button onClick={(e) => onExport(e.target.value)}>Export</button>
  );
  const actionsMemo = React.useMemo(
    () => <Export onExport={() => downloadCSV(facultyListData)} />,
    []
  );

  //middleware

  const navigate = useNavigate();

  const callMiddleware = async () => {
    try {
      const res = await fetch("/m4", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      navigate("/SuperAdmin/SuperAdminLogin");
    }
  };

  useEffect(() => {
    callMiddleware();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/facultyReport");
      const data = await response.json();
      console.log(data);
      setFacultyListData(data);
      setFilteredUsers(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <DataTable
        title="Faculty list for CS/IT Department"
        columns={columns}
        data={filteredUsers}
        progressPending={pending}
        // pagination
        fixedHeader
        fixedHeaderScrollHeight="450px"
        highlightOnHover
        theme="light"
        delayed
        subHeader
        subHeaderComponent={
          <input
            type="text"
            placeholder="Search here"
            className="w-25 form-control"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        }
        subHeaderAlign="left"
        actions={actionsMemo}
      />
    </div>
  );
};

export default FacultyCards;
