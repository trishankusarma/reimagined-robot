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
import {Link} from "react-router-dom"
const columns = [
  { id: "Download", label: "Download", minWidth: 80 },
  { id: "year", label: "Year", minWidth: 120 },
  {
    id: "month",
    label: "Month",
    minWidth: 120,
    align: "left",
  },
  {
    id: "name",
    label: "Name",
    minWidth: 120,
    align: "left",
  },
  {
    id: "address",
    label: "Address",
    minWidth: 80,
    align: "left",
  },
  {
    id: "mobile_no",
    label: "Mobile No",
    minWidth: 80,
    align: "left",
  },
  {
    id: "email",
    label: "Email",
    minWidth: 80,
    align: "left",
  },
  {
    id: "basic_pay",
    label: "Basic pay",
    minWidth: 120,
    align: "left",
  },
  {
    id: "da",
    label: "DA",
    minWidth: 120,
    align: "left",
  },
  {
    id: "hra",
    label: "HRA",
    minWidth: 120,
    align: "left",
  },
  {
    id: "conveyance",
    label: "Conveyance",
    minWidth: 120,
    align: "left",
  },
  {
    id: "other",
    label: "Other",
    minWidth: 120,
    align: "left",
  },
  {
    id: "pf",
    label: "PF",
    minWidth: 120,
    align: "left",
  },
  {
    id: "esi",
    label: "ESI",
    minWidth: 120,
    align: "left",
  },
  {
    id: "loan_decution",
    label: "Loan Decution",
    minWidth: 120,
    align: "left",
  },
  {
    id: "professional_tax",
    label: "Professional Tax",
    minWidth: 120,
    align: "left",
  },
  {
    id: "tds",
    label: "TDS",
    minWidth: 120,
    align: "left",
  },
  {
    id: "netSalary",
    label: "Net Salary",
    minWidth: 120,
    align: "left",
  },
];

function createData(
  Download,
  year,
  month,
  name,
  address,
  mobile_no,
  email,
  basic_pay,
  da,
  hra,
  conveyance,
  other,
  id,
  pf,
  esi,
  loan_decution,
  professional_tax,
  tds,
  netSalary
) {
  return {
    Download,
    year,
    month,
    name,
    address,
    mobile_no,
    email,
    basic_pay,
    da,
    hra,
    conveyance,
    other,
    id,
    pf,
    esi,
    loan_decution,
    professional_tax,
    tds,
    netSalary,
  };
}

const useStyles = makeStyles({
  container: {
    maxHeight: 440,
  },
});

export default function TeacherSalary(props) {
  const classes = useStyles();
 
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

  React.useEffect(async () => {
    console.log( props?.data?.data[2], "props");
    let tempData = [];
    if (rows.length == props?.data?.data?.length) {
      return;
    }
    for (let i = 0; i < props?.data?.data?.length; i++) {
      tempData.push(
        createData(
          <Link>
          Download
          </Link>,
          props?.data?.data[i]?.year,
          props?.data?.data[i]?.month,
          props?.data?.data[i]?.stuff_id?.name,
          props?.data?.data[i]?.stuff_id?.address,
          props?.data?.data[i]?.stuff_id?.mobileNo,
          props?.data?.data[i]?.stuff_id?.email,
          props?.data?.data[i]?.basicPay,
          props?.data?.data[i]?.DA,
          props?.data?.data[i]?.HRA,
          props?.data?.data[i]?.conveyance,
          props?.data?.data[i]?.other,
          props?.data?.data[i]?.PF,
          props?.data?.data[i]?.ESI,
          props?.data?.data[i]?.loanDeduction,
          props?.data?.data[i]?.professionalTax,
          props?.data?.data[i]?.TDSIT,
          props?.data?.data[i]?.netSalary,
        )
      );
    }
    setRows(tempData);
  }, [props?.data?.data]);
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
