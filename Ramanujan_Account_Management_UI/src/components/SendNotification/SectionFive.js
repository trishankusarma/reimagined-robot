import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckboxTable from "./CheckBoxTable";
import Search from "../shared/search";
import { useDispatch, useSelector } from "react-redux";
import {getAllNotifications, notificationDelete } from "../../redux/actions";
const columns = [
  {
    field: "title",
    headerName: "Title",
    width: 200,
    editable: false,
  },
  {
    field: "message",
    headerName: "Message",
    width: 500,
    editable: false,
  },
  {
    field: "for",
    headerName: "For",
    width: 240,
    editable: false,
  },
];

const SectionFive = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  const auth = useSelector((state) => state.auth);
  const [rows, setRows] = React.useState([]);
  
  React.useEffect(() => {
    dispatch(getAllNotifications(auth?.user?.adminType?._id));
  }, []);

  React.useEffect(() => {
    let newNotificationList = [];
    for (let i = 0; i < notification?.allNotifications?.length; i++) {
      newNotificationList.push({
        _id:notification?.allNotifications[i]?._id,
        id: i + 1,
        title: notification?.allNotifications[i]?.title,
        message: notification?.allNotifications[i]?.message,
        for: notification?.allNotifications[i]?.id?.name,
      });
    }
    setRows(newNotificationList);
  }, [notification.allNotifications]);
  
const deleteBtn=()=>{
  dispatch(notificationDelete(notification.selectedNotification,auth?.user?.adminType?._id,notification.allNotifications))
}
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "1rem .5rem",
        }}
      >
        <Typography variant="h5">Notifications</Typography>
        <Search />
      </div>
      <CheckboxTable rows={rows} columns={columns} />
      <Button
        variant="contained"
        color="secondary"
        style={{ marginTop: "2rem" }}
        startIcon={<DeleteIcon />}
        onClick={()=>{deleteBtn()}}
      >
        Delete Selected
      </Button>
    </>
  );
};

export default SectionFive;
