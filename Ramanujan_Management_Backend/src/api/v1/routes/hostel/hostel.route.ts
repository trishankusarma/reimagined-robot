import express, { Router } from 'express';
import { hostel_room_controllers } from '../../controllers/hostel/hostel.controllers';
const router = express.Router();

//post
router.post('/createNewHostelRoom', hostel_room_controllers.create_new_hostel);

//get
router.get('/getAllHostels', hostel_room_controllers.get_all_hostels);

//edit
router.patch('/edit/:_id', hostel_room_controllers.edit_one_hostel);

//delete
router.delete('/delete/:_id', hostel_room_controllers.delete_one_hostel);

export const hostel_router: Router = router;
