import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import Button from "@material-ui/core/Button";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

const columns = [
  { id: "SI_NO", label: "SI NO", minWidth: 80 },
  { id: "Date", label: "Payment Date", minWidth: 130 },
  {
    id: "Admission_fees",
    label: "Admission_fees",
    minWidth: 120,
    align: "left",
  },
  {
    id: "Course_fees",
    label: "Course Fee",
    minWidth: 130,
    align: "left",
  },
  {
    id: "Balance_left",
    label: "Balance left",
    minWidth: 130,
    align: "left",
  },
  {
    id: "Balance_admission",
    label: "Balance Admission Amount",
    minWidth: 260,
    align: "left",
  },
  {
    id: "total_paid",
    label: "Total Paid Amount",
    minWidth: 160,
    align: "left",
  },
  {
    id: "Download",
    label: "Download",
    minWidth: 140,
    align: "left",
  },
  // {
  //   id: "Edit",
  //   label: "Edit",
  //   minWidth: 140,
  //   align: "left",
  // },
  // {
  //   id: "Delete",
  //   label: "Delete",
  //   minWidth: 140,
  //   align: "left",
  // },
];

function createData(
  SI_NO,
  Date,
  Admission_fees,
  Course_fees,
  Balance_left,
  Balance_admission,
  total_paid,
  Download,
    // Edit,
    // Delete
) {
  return {
    SI_NO,
    Date,
    Admission_fees,
    Course_fees,
    Balance_left,
    Balance_admission,
    total_paid,
    Download,
    // Edit,
    // Delete
  };
}

const rows = [
  createData(
    "1",
    "11-11-1111",
    "partha pratim",
    "6900782997",
    "xii",
    "a1",
    "2017-2018",
    "12000",
    "18000",
    "2000",
    "10000",
    "2000",
    "30000",
    "2000"
  ),
];

const useStyles = makeStyles({
  container: {
    maxHeight: 440,
  },
});

export default function StickyHeadTable(props) {
  const classes = useStyles();
  console.log( props.data," props.data")
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  React.useEffect(() => {
    let info = [];
    // if (rows.length == props.data?.length) {
    //   return;
    // }
    
    for (let i = 0; i < props.data?.length; i++) {
      info.push(
        createData(
          i + 1,
          props.data[i]?.updatedAt?.split("T")[0],
          props.data[i]?.instance?.admissionFee,
          props.data[0]?.student?.totalFee,
          props.data[i]?.instance?.Balance_left,
          props.data[i]?.instance?.BalanceAdmissionAmount,
          props.data[i]?.instance?.Total_Paid,
          <Button style={{color:"blue"}}>Download</Button>,
          // <Button style={{color:"blue"}}>Edit</Button>,
          // <Button style={{color:"red"}}>Delete</Button>,
        )
      );
    }
    setRows(info);
  }, [props.data]);
  console.log(props.data, "data");
  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    backgroundColor: "black",
                    color: "white",
                    fontWeight: "600",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
