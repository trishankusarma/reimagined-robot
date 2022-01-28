import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import DrawerMenu from "../../components/shared/DrawerMenu";
import Navbar from "../../components/shared/Navbar";
import Footer from "../../components/shared/Footer";
import ExamDetail from "../../components/StudentsMark/ExamDetail";
import MarkDetail from "../../components/StudentsMark/MarkDetail";
import axios from "../../helpers/axios";
import { useSelector } from "react-redux";
import { Toastify } from "../../App";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    maxWidth: "100vw",
    idth: "100vw",
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  btnC: {
    width: "60%",
    margin: "2rem auto",
  },
}));

export default function StudentMark() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const [students, setStudents] = useState(null);
  const auth = useSelector((state) => state.auth);

  const [OPEN, SETOPEN] = React.useState(false);

  const handleOpen = async(_id, AddMarks) => {

    if (examDetail.Class === null) return;

    if (AddMarks === "Update Marks") {
      try {
        const res = await axios().get(`/student/getStudentMarks/${_id}/${examDetail.Exam}`);

        console.log('res.data',res.data)

        if (res.status === 200) {
          if (res.data.error) return Toastify("error", res.data.error);
          SETOPEN(true);

          setSubjectMarks(
              res.data.subjects
          );
        } else 
            Toastify("error", "Something went wrong!");
      
      } catch (error) {
       
         Toastify("error", "Something went wrong!");
      }

      return;
    }

    setSubjectMarks(
      auth?.user?.adminType?.classes[examDetail.Class]?.subjects?.map(
        (item) => {
          return {
            name: item,
            marks: "",
            Pass_Mark: "",
            Mark_Obtain: "",
            Is_Fourth: true,
            remarks: "",
          };
        }
      )
    );
    SETOPEN(true);
  };

  const handleClose = () => {
    SETOPEN(false);
  };

  const handleDrawerOpen = async () => {
    setOpen(true)
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(async () => {
    try {
      const res = await axios().get(
        `/student/allDepartmentStudents/${auth.user?.adminType?._id}`
      );

      if (res.status === 200) {
        const checkedStudents = JSON.parse(
          localStorage.getItem("checkedStudents")
        );

        console.log(checkedStudents);

        setStudents(
          res.data.map((student) =>
            student
              ? {
                  ...student,
                  AddMarks: checkedStudents
                    ? checkedStudents.find((id) => id === student._id)
                      ? "Update Marks"
                      : "Add Marks"
                    : "Add Marks",
                }
              : null
          )
        );
      } else Toastify("error", "Something went wrong!");
    } catch (error) {
      console.log(error);

      Toastify("error", "something went wrong!");
    }
  }, []);

  const [examDetail, setExamDetail] = useState({
    Exam: localStorage.getItem("examName")
      ? localStorage.getItem("examName")
      : "",
    Session: "",
    Class: "all",
    Section: "all",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "Exam" && localStorage.getItem("examName")) return;

    setExamDetail({
      ...examDetail,
      [name]: value,
    });
  };

  const [subjectMarks, setSubjectMarks] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const [ filteredStudents, setFilteredStudents ] = useState(null)

  useEffect(() => {
    if (examDetail.Class === null) return;

    setSubjectMarks(
      auth?.user?.adminType?.classes[examDetail.Class]?.subjects?.map(
        (item) => {
          return {
            name: item,
            marks: "",
            Pass_Mark: "",
            Mark_Obtain: "",
            Is_Fourth: true,
            remarks: "",
          };
        }
      )
    );
  }, [examDetail.Class]);

  const handleSubmit = async (e) => {
    if (!selectedId) return;

    try {
      let res;

      if (selectedId.AddMarks === "Add Marks") {
        res = await axios().post("/student/createStudentMarks", {
          ...examDetail,
          Class: parseInt(
            auth?.user?.adminType?.classes[examDetail.Class].class
          ),
          Student_id: selectedId._id,
          subjects: subjectMarks,
        });
      } else if (selectedId.AddMarks === "Update Marks") {
        res = await axios().patch("/student/editStudentMarks", {
          ...examDetail,
          Class: parseInt(
            auth?.user?.adminType?.classes[examDetail.Class].class
          ),
          Student_id: selectedId._id,
          subjects: subjectMarks,
        });
      }

      if (res.status === 200) {
        if (selectedId.AddMarks === "Add Marks") {
          setStudents(
            students.map((student) =>
              student._id === selectedId._id
                ? { ...student, AddMarks: "Update Marks" }
                : student
            )
          );

          localStorage.setItem("examName", examDetail.Exam);

          let checkedStudents = JSON.parse(
            localStorage.getItem("checkedStudents")
          );

          checkedStudents = checkedStudents
            ? [...checkedStudents, selectedId._id]
            : [selectedId._id];

          localStorage.setItem(
            "checkedStudents",
            JSON.stringify(checkedStudents)
          );

          Toastify("success", "Successfully added!!");
        } else if (selectedId.AddMarks === "Update Marks") {
          if (res.data.error) {
            return Toastify("error", res.data.error);
          }

          Toastify("success", "Successfully updated!!");
        }
      } else Toastify("error", "Something went wrong!!");
    } catch (error) {
      console.log(error);
      Toastify("error", "Something went wrong!!");
    }
  };

  const startNewExam = () => {
    localStorage.removeItem("examName");
    localStorage.removeItem("checkedStudents");

    setExamDetail({
      ...examDetail,
      'Exam':''
    })

    setStudents(
      students.map((student) =>
        student
          ? {
              ...student,
              AddMarks: "Add Marks"
            }
          : null
      )
    );
  };

  useEffect(()=>{

     if( !students ) return;
       
     setFilteredStudents(
         students?.filter((row)=>((examDetail.Class=='all' || row.standard==auth?.user?.adminType?.classes[ examDetail.Class ]?.class) && ( examDetail.Section=='all' || row.section==examDetail.Section ) && ( row.session==examDetail.Session ) ))
     )

  },[examDetail.Class, examDetail.Session, examDetail.Section])

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar handleDrawerOpen={handleDrawerOpen} open={open} />
      <DrawerMenu handleDrawerClose={handleDrawerClose} open={open} />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />

        <ExamDetail
          examDetail={examDetail}
          setExamDetail={setExamDetail}
          handleChange={handleChange}
          startNewExam={startNewExam}
        />
        <MarkDetail
          rows={ filteredStudents ? filteredStudents : students}
          auth={auth}
          classIndex={examDetail.Class}
          subjectMarks={subjectMarks}
          setSubjectMarks={setSubjectMarks}
          handleSubmit={handleSubmit}
          setSelectedId={setSelectedId}
          open={OPEN}
          setOpen={SETOPEN}
          handleOpen={handleOpen}
          handleClose={handleClose}
        />
        <Footer />
      </main>
    </div>
  );
}
