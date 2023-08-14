import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const DetailedStudentWiseAttendanceReport = ({ studentDetailData }) => {
  const [pending, setPending] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(studentDetailData);
  const [columns, setColumns] = useState(studentDetailData);
  console.log(studentDetailData);

  // const Data = [
  //   {
  //     rollNo: 250,
  //     name: "Rakesh",
  //     total: 40,
  //     held: 33,
  //     present: 23,
  //     absent: 2,
  //     sdgasdfg: 2,
  //   },
  //   {
  //     rollNo: 253,
  //     name: "Mukesh",
  //     total: 40,
  //     held: 33,
  //     present: 20,
  //     absent: 5,
  //   },
  //   {
  //     rollNo: 252,
  //     name: "Suresh",
  //     total: 40,
  //     held: 33,
  //     present: 21,
  //     absent: 4,
  //   },
  //   {
  //     rollNo: 251,
  //     name: "Ramesh",
  //     total: 40,
  //     held: 33,
  //     present: 23,
  //     absent: 2,
  //   },
  //   {
  //     rollNo: 255,
  //     name: "Brijesh",
  //     total: 40,
  //     held: 33,
  //     present: 25,
  //     absent: 0,
  //   },
  // ];

  //

  function convertArrayOfObjectsToCSV(array) {
    let result;

    const columnDelimiter = ",";
    const lineDelimiter = "\n";

    const keys = Object.keys();

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
    let csv = convertArrayOfObjectsToCSV();
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

  // useEffect(() => {
  //   const data = .filter((student) => {
  //     return student.name.toLowerCase().match(search.toLowerCase());
  //   });
  //   setFilteredUsers(data);
  // }, [search, ]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log();

      let newStr = [];
      const aNewStr = [];

      const allDate = new Set();
      const calDate = new Set();
      let temp = null;

      for (var i = 0; i < filteredUsers.length; i++) {
        temp = Object.keys(filteredUsers[i]);

        const splitObj = temp.map((obj) => {
          return obj.split(",")[0];
        });

        for (var k = 0; k < temp.length; k++) {
          allDate.add(splitObj[k]);
          calDate.add(temp[k]);
        }
      }
      console.log("alldate:", allDate);
      for (const entry of allDate) {
        newStr.push(entry);
      }
      for (const entry of calDate) {
        aNewStr.push(entry);
      }

      let structure = null;

      let titan = [];

      const structureNew = newStr.map((ele) => {
        titan = aNewStr.map((rel, index) => {
          if (rel.includes(ele)) {
            console.log(rel);
            return {
              name: `${ele}`,
              selector: (row) => row[rel],
            };
          } else {
            return {
              name: `${ele}`,
              selector: (row) => row[aNewStr[index]],
            };
          }
          // } else
          //   return {
          //     name: `${ele}`,
          //     selector: (row) => row[rel],
          //   };
        });
        return titan;
        //   const aggregatedByDate = {};
        // aggregatedData.forEach((entry) => {
        //  const date = moment(entry.timestamp).format('YYYY-MM-DD');
        // if (!aggregatedByDate[date]) {
        //  aggregatedByDate[date] = [];
        //  }
        //  aggregatedByDate[date].push(entry);
        // });
        // return {
        //   name: `${ele}`,

        //   selector: (row) => row[ele],
        // };
      });
      console.log("titan: ", titan);

      structure = titan;

      console.log("structure", structure);

      setColumns(structure);

      setPending(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  const Export = ({ onExport }) => (
    <button onClick={(e) => onExport(e.target.value)}>Export</button>
  );
  const actionsMemo = React.useMemo(() => {
    return <Export onExport={() => downloadCSV()} />;
  }, []);

  return (
    <div>
      {columns ? (
        (console.log(columns),
        (
          <DataTable
            title="Class wise Detiled Attendance Report"
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
        ))
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default DetailedStudentWiseAttendanceReport;
