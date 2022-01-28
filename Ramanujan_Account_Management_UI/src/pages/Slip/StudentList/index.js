import React from "react";
import Styles from './index.module.css'
import { Button } from "@material-ui/core";
import ReactToPrint from "react-to-print";

function Student() {
  const componentRef=React.useRef();
  const [info,setInfo]=React.useState([]);
  const [classData,setIClassData]=React.useState(null);
  
  React.useEffect(()=>{
    const data= JSON.parse(localStorage.getItem("studentData"));
    const classData= JSON.parse(localStorage.getItem("studentDataClass"));
    setIClassData(classData);
    setInfo(data);
  },[])

  return (
    <>
    <div className={Styles.root} ref={componentRef}>
        <div className={Styles.head}>
            <b>class: {JSON.parse(localStorage.getItem("user"))?.adminType?.classes[classData?.class]?.class}</b>
            <b>section: {classData?.section}</b>
            <b>session: {classData?.session}</b>
        </div>
      <table>
        <tr>
          <th>Name</th>
          <th>Enrollment</th>
          <th>Address</th>
          <th>Mobile No</th>
        </tr>
        {info.map((i)=>{
          return(<><tr>
          <td>{i?.name}</td>
          <td>{i?.Entrollment}</td>
          <td>{i?.Address}</td>
          <td>{i?.Mobile}</td>
        </tr>
        </>)
        })}
      </table>
    </div>
    <ReactToPrint
          trigger={() => (
            <center>
          <Button className={Styles.Button} color="primary" variant="contained">Print</Button>
          </center>
          )}
          content={() => componentRef.current}
        />
    </>
  );
}

export default Student;
