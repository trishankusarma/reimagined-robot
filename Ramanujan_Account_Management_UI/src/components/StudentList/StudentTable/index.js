import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles({
  root: {
    width: "96%",
    margin: "auto",
  },
});

const columns = [
  { id: "name", label: "Name", minWidth: 190 },
  { id: "code", label: "Roll NO", minWidth: 100 },
  {
    id: "Entrollment",
    label: "Enrollment Id",
    minWidth: 130,
    align: "left",
  },
  {
    id: "Address",
    label: "Address",
    minWidth: 200,
    align: "left",
    format: (value) => value.toFixed(2),
  },
  {
    id: "Mobile",
    label: "Mobile No.",
    minWidth: 140,
    align: "left",
  },
  {
    id: "Session",
    label: "Session",
    minWidth: 200,
    align: "left",
  },
  {
    id: "classN",
    label: "class(section)",
    minWidth: 50,
    align: "left",
  },
  {
    id: "Email",
    label: "Email",
    minWidth: 120,
    align: "left",
  },
  {
    id: "caste",
    label: "Caste",
    minWidth: 50,
    align: "left",
  },
  {
    id: "Religion",
    label: "Religion",
    minWidth: 50,
    align: "left",
    format: (value) => value.toFixed(2),
  },
  {
    id: "Delete",
    label: "Delete",
    minWidth: 40,
    align: "left",
  },
  {
    id: "Edit",
    label: "Edit",
    minWidth: 50,
    align: "left",
  },
  {
    id: "Receipt",
    label: "Receipt",
    minWidth: 80,
    align: "left",
  },
  {
    id: "Id_card",
    label: "Id Card",
    minWidth: 100,
    align: "left",
  },
  {
    id: "Pass",
    label: "Pass Certification",
    minWidth: 180,
    align: "left",
  },
  {
    id: "Action",
    label: "Action",
    minWidth: 50,
    align: "left",
  },
];

export default function StickyHeadTable({data,handleRowChange,handlePerPage}) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event, newPage) => {
    if(handlePerPage){
      handlePerPage(newPage);
    }
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    if(handleRowChange(+event.target.value)){
      handleRowChange(+event.target.value);
    }
    
    setPage(0);
  };

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
            {data && data
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
        rowsPerPageOptions={[5,10, 50,100,200]}
        component="div"
        count={data?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
