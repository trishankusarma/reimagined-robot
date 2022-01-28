import React from "react";
import { TextField, makeStyles, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "60%",
    margin: "1rem auto",
  },
  table: {
    textAlign: "center",
  },
}));

function AddRoom({
  rooms,
  editId,
  setEditId,
  deleteId,
  setDeleteId,
  setOneRow,
  oneRow,
  handleEdit,
  addRoom,
  newRow,
  setNewRow,
  handleAdd
}) {
  const classes = useStyles();

  const handleChange = (e, editTrue, id) => {

    if(!id){

        setNewRow({
            ...newRow,
            [e.target.name]: parseInt(e.target.value === "" ? 0 : e.target.value),
          });
        return
    }

    if (!editTrue) return;

    setOneRow({
      ...oneRow,
      [e.target.name]: parseInt(e.target.value === "" ? 0 : e.target.value),
    });
  };

  return (
    <div className={classes.root}>
      <table className={classes.table}>
        <tr className={classes.tr} style={{ margin: "10px" }}>
          <th className={classes.th}>Room No.</th>
          <th className={classes.th}>Floor No.</th>
          <th className={classes.th}>Capacity</th>
          <th className={classes.th}>Occupied</th>
          <th className={classes.th}>Setting</th>
        </tr>

        {rooms &&
          rooms.length > 0 &&
          rooms.map((room) => (
            <tr style={{ marginTop: "10px" }}>
              <td>
                <TextField
                  variant="outlined"
                  label="Enter Room No"
                  margin="normal"
                  name="roomNo"
                  value={ room._id ? editId === room._id ? oneRow.roomNo : room.roomNo : newRow.roomNo}
                  onChange={(e) => handleChange(e, editId === room._id, room._id)}
                />
              </td>

              <td>
                <TextField
                  variant="outlined"
                  label="Enter Floor No"
                  margin="normal"
                  name="floorNo"
                  value={ room._id ? editId === room._id ? oneRow.floorNo : room.floorNo : newRow.floorNo }
                  onChange={(e) => handleChange(e, editId === room._id, room._id)}
                />
              </td>
              <td>
                <TextField
                  variant="outlined"
                  label="Enter capacity"
                  margin="normal"
                  name="capacity"
                  type="number"
                  value={ room._id ? editId === room._id ? oneRow.capacity : room.capacity : newRow.capacity }
                  onChange={(e) => handleChange(e, editId === room._id, room._id)}
                />
              </td>
              <td>
                <TextField
                  variant="outlined"
                  label="occupied"
                  margin="normal"
                  name="occupied"
                  value={ room._id ? editId === room._id ? oneRow.occupied : room.occupied : newRow.occupied }
                  onChange={(e) => handleChange(e, editId === room._id, room._id)}
                />
              </td>

              <div style={{ marginTop: "20px", marginLeft: "10px" }}>
                {
                
                !room._id ? 

                    <>
                      <td>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={handleAdd}
                        >
                            Save
                        </Button>
                      </td>
                    </>                
                :
                editId === room._id ? (
                  <>
                    <td>
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={handleEdit}
                      >
                        Save
                      </Button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={() => {
                          setEditId(room._id);
                          setOneRow(room);
                        }}
                      >
                        edit
                      </Button>
                    </td>

                    <td>
                      <Button
                        color="secondary"
                        variant="contained"
                        onClick={() => setDeleteId(room._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </>
                )}
              </div>
            </tr>
          ))}
      
      </table>

      <center>
        <Button
          variant="contained"
          style={{ background: "green", color: "white" }}
          onClick={addRoom}
        >
          Add +
        </Button>
      </center>
    </div>
  );
}

export default AddRoom;
