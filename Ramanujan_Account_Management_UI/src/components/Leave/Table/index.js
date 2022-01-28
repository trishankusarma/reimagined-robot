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

import Search from "../../shared/search"
import { Typography } from "@material-ui/core";

import {
  getAllLeaveApplication,
  deleteLeaveApplication
} from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
const columns = [
  { id: "Date", label: "Leave Date", minWidth: 80 },
  { id: "Name", label: "Student Name", minWidth: 170 },
  {
    id: "Reason",
    label: "Reason",
    minWidth: 180,
    align: "left",
  },
  {
    id: "Delete",
    label: "Delete",
    minWidth: 50,
    align: "left",
  },
];

function createData(Date, Name, Reason, Delete) {
  return { Date, Name, Reason, Delete };
}

const useStyles = makeStyles({
  root: {
    width: "96%",
    margin: "auto",
  },
  container: {
    maxHeight: 440,
  },
  filters: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width:'96%',
    margin:'20px auto',
    marginTop:'50px'
  },
});
const DeleteCompo = (props) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const Delete = (id) => {
    //
    dispatch(deleteLeaveApplication(id,"StudentCollege",auth?.user?.adminType?._id))
    console.log(id)
  };
  return (
    <>
      <div>
        <Button
          onClick={() => {
            Delete(props.id);
          }}
        >
          Delete
        </Button>
      </div>
    </>
  );
};
export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const [filterRows, setFilterRows] = React.useState(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const dispatch = useDispatch();
  const leaveApp = useSelector((state) => state.leaveApp);
  const auth = useSelector((state) => state.auth);

  const searchRef = React.useRef()

  React.useEffect(() => {
    dispatch(getAllLeaveApplication("StudentCollege",auth?.user?.adminType?._id));
  }, []);

  React.useEffect(async () => {
    let data = [];
    
    if(leaveApp?.leaveApplications?.length==rows.length) return
       for (let i = 0; i < leaveApp?.leaveApplications?.length; i++){
          data.push(
            createData(
              leaveApp?.leaveApplications[i]?.To_date?.split("T")[0],
              leaveApp?.leaveApplications[i]?.id?.name,
              leaveApp?.leaveApplications[i]?.reason,
              <DeleteCompo id={leaveApp?.leaveApplications[i]?._id} />
            ));
}
      setRows(data);
  }, [rows,leaveApp.leaveApplications]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleFilter = (e)=>{
      
    if (searchRef.current.value !== "") {
      
        RegExp.quote = function allowSpecialSymbols(str) {
            return str.replace(/([.?*+^$[\]\\(){}|-])/g, "");
        };
  
        const reg = new RegExp(RegExp.quote(`${e.target.value}`), "gi");
  
        setFilterRows(
  
            rows.filter((item)=>item.Name.match(reg) || item.Reason.match(reg)  )
        )
    } else {
        setFilterRows(null)
    }
  }

  return (
    <Paper className={classes.root}>

       <div className={classes.filters}>
            <Typography>Total no. of student leave: { rows.length } </Typography>
            <Search placeholder={"Search here"} placeholder={"Search.."} handleChange={handleFilter} searchRef={searchRef} />
      </div>

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
            {
            
            filterRows ? 

            filterRows
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
              }) :

            rows
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
