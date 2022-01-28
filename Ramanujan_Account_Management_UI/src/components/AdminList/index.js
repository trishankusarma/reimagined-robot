import { Button } from "@material-ui/core";
import React from "react";
import { Toastify } from "../../App";
import Table from "../shared/Table";
import axios from "../../helpers/axios";

const columns = [
  { id: "Name", label: "Name", minWidth: 120 },
  {
    id: "email",
    label: "email",
    minWidth: 120,
    align: "left",
  },
  {
    id: "department",
    label: "department",
    minWidth: 120,
    align: "left",
  },
  {
    id: "Excess",
    label: "Excess Given",
    minWidth: 200,
    align: "left",
  },

  {
    id: "remove",
    label: "Delete",
    minWidth: 50,
    align: "center",
  },
];
function createData(Name, email, department, Excess, remove) {
  return {
    Name,
    email,
    department,
    Excess,

    remove,
  };
}

// const rows = [
//   createData(
//     'partha pratim choudhury',
//     'partha09.com@gmail.com',
//     'arts dept',
//     'admin, hotel , leave , aadmission, new staff',
//     <Button size="small" color="primary">
//         edit
//     </Button>,
//     <Button size="small" color="secondary">
//      Delete
//    </Button>
//   )
// ];

function AdminList(props) {
  const [rows, setRows] = React.useState([]);
  const DeleteOneAdmin=async(id)=>{
    let res =await  axios().delete(`/admin/oneAdmin/${id}`)
    if(res.status==200){
      // Toastify("success","Deleted successfully !");
      window.location.reload();
    }else{
      Toastify("error","Something went wrong !");
    }
  }
  React.useEffect(() => {
    let data = [];
    if (rows.length == props?.data?.length) {
      return;
    } else {

      for (let i = 0; i < props?.data?.length; i++) {
      
        data.push(
          createData(
            props?.data[i]?.name,
            props?.data[i]?.email,
            props?.data[i]?.adminType?.departmentName,
            props?.data[i]?.access?.map((item) => `${item.to}, `),
            <Button onClick={()=>{
              DeleteOneAdmin(props?.data[i]?._id)
            }} size="small" color="secondary">
              Delete
            </Button>
          )
        )
      }
      
    }
    setRows(data)
  }, [props?.data?.length]);
  React.useEffect(() => {
    console.log(rows, "log data");
  }, [rows]);
  return (
    <div style={{ width: "96%", margin: "1rem auto" }}>
      <center style={{ fontSize: "2rem" }}>Admin List</center>
      <Table data={rows} columns={columns} pagination={true} />
    </div>
  );
}

export default AdminList;
