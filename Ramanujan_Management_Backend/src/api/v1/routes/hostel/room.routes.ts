import express, { Router } from 'express';
import { room_controllers } from '../../controllers/hostel/room.controllers';
const router = express.Router();

//get
router.get('/getAllRooms/:_id', room_controllers.get_all_hostel_rooms);

//create
router.post('/createNewRoom/:_id', room_controllers.create_new_room);

//edit
router.patch('/edit/:_id', room_controllers.edit_one_room);

//delete
router.delete('/delete/:_id', room_controllers.delete_one_room);

export const room_router: Router = router;
