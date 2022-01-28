import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import {setMobileNO} from "../../../redux/actions"
import Sort from "../../shared/Sort";

import Search from '../../shared/search'


function createOther(
  id,
  mobileNO,
  admissionNO,
  Name,
  Class,
  Session,
  Date,
  Paid,
  Balance_amount,
  Balance_Admission_amount,
) {
  return {
    id,
    mobileNO,
    admissionNO,
    Name,
    Class,
    Session,
    Date,
    Paid,
    Balance_amount,
    Balance_Admission_amount
  };
}

export default function DataTable(props) {
  console.log(props.data.data[0])
  const history=useHistory();
  const [rows, setRows] = React.useState([]);
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch();
  
  const columns = [
    { field: "mobileNO", headerName: "Mobile no", width: 120, sortable: false },
    {
      field: "admissionNO",
      headerName: "Admission NO",
      width: 200,
      sortable: false,
    },
    {
      field: "Name",
      headerName: "Name",
      width: 200,
      sortable: false,
    },
    {
      field: "Class",
      headerName: "Class",
      width: 200,
      sortable: false,
    },
    {
      field: "Session",
      headerName: "Session",
      width: 200,
      sortable: false,
    },
    {
      field: "Date",
      headerName: "Payment date",
      sortable: false,
      width: 200,
    },
   
    {
      field: "Paid",
      headerName: "Total paid amount",
      sortable: false,
      width: 200,
    },
    {
      field: "Balance_amount",
      headerName: "Balance Amount",
      sortable: false,
      width: 200,
    },
   
    {
      field: "Balance_Admission_amount",
      headerName: "Balance Admission amount",
      sortable: false,
      width: 230,
    },
    {
      field: "Action",
      headerName: "Button",
      sortable: false,
      width: 200,
      disableClickEventBubbling: true,
      renderCell: (params) => {
      
        return <>
            <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={()=>{
              history.push(`/fee-payment?enrollmentNo=${params.row.Roll}`)
            }}
            >Pay now</Button>
        </>
      }
    },
  ];

  const searchRef  = React.useRef()

  const [ searchExpiryBalance , setSearchExpiryBalance ] = React.useState(null)

  const handleFilter = (e)=>{
      
    if (searchRef.current.value !== "") {
      
        RegExp.quote = function allowSpecialSymbols(str) {
            return str.replace(/([.?*+^$[\]\\(){}|-])/g, "");
        };

        const reg = new RegExp(RegExp.quote(`${e.target.value}`), "gi");

        setSearchExpiryBalance(

            rows?.filter((item)=>item?.Name?.match(reg) || item.admissionNO == searchRef.current.value) 
        )
    } else {
        setSearchExpiryBalance(null)
    }
  }

  React.useEffect(() => {
  
    let data = [];
  
    if (rows.length == props.data.data.length) return;
    for (let i = 0; i < props.data.data.length; i++) {
      
      data.push(
        createOther(
          i,
          props?.data?.data[i]?.mobileNo,
          props?.data?.data[i]?.admissionNo,
          props?.data?.data[i]?.name,
          `${props?.data?.data[i]?.standard} ${props?.data?.data[i]?.section}`,
          props?.data?.data[i]?.session,
          props?.data?.data[i]?.updatedAt.split("T")[0],
          props?.data?.data[i]?.paidAmount,
          props?.data?.data[i]?.totalFee-props?.data?.data[i]?.paidAmount,
          props?.data?.data[i]?.admissionFee-props?.data?.data[i]?.admissionPaid,
        )
      );
    }
    setRows(data);
  }, [props?.data?.data]);
  const selectionModel=(phoneNo)=>{
    let data=[];
    for(var i =0;i<phoneNo.length;i++){
      data.push(rows[phoneNo[i]-1].mobileNO);
    }
    dispatch(setMobileNO(data));
  }
  const [filter,setFilter]=React.useState({
    class: "all",
    section: "all",
    session: "all",
    gender: "all",
  })

  const [filterStudent,setFilterStudent]=React.useState(null)
  const handleChange=(e)=>{
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    })
  }
  React.useEffect(()=>{  
    if(!rows) return
    setFilterStudent(
      rows.filter((item)=>( filter.class=='all' || item?.Class?.split(' ')[0]==auth?.user?.adminType?.classes[filter.class].class ) 
      && ( filter.gender=='all' || item.gender==filter.gender )
      && ( filter.section=='all' || item.Class.split(' ')[1]==filter.section )
      && ( filter.session=='all' || item.Session==filter.session )
)
    );
  },[filter.class,filter.gender,filter.section,filter.session,rows]);
  console.log(rows,"rows")
  return (

    <div style={{ height: 400, width: "100%" }}>
      <Button onClick={()=>{
            let data = searchExpiryBalance ? searchExpiryBalance :filterStudent ? filterStudent :rows
            localStorage.setItem("studentExpireData",JSON.stringify(data));
            localStorage.setItem("ExpireDataClass",JSON.stringify(filter));
            window.open("http://accounts.ramanujanacademy.co.in/Expirytable","_blank")
          }} variant="contained" color="primary" size="small">
              print This
            </Button>
    <div style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <div style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
             <Sort
              all={"all"}
              name="class"
              value={filter.class}
              onChange={handleChange}
              Class={true}
              size="small"
            />
            <Sort
              all={"all"}
              classIndex={filter.class}
              Section={true}
              name="section"
              onChange={handleChange}
              value={filter.section}
              size="small"
            />
            <Sort
              all={"all"}
              name="session"
              onChange={handleChange}
              value={filter.session}
              Session={true}
              size="small"
            />
            <div style={{margin:'1rem 0'}} > 
      <Search placeholder={"Search here"} searchRef={searchRef} handleChange={handleFilter}/>
      </div>
      </div>
      </div>
      <DataGrid

        rows={ searchExpiryBalance ? searchExpiryBalance :filterStudent ? filterStudent :rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        onSelectionModelChange={(values)=>{
          selectionModel(values)
        }}
        // disableSelectionOnClick
      />
    </div>
  );
}
