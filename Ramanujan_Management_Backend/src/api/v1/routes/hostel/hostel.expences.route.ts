import express, { Router, Request, Response, NextFunction } from 'express';
// import { hostel_expences_controllers } from '../../controllers/hostel/hostel.expences.controllers';
const router = express.Router();

// //post
// router.post('/createNewExpences', hostel_expences_controllers.create_new_hostel_expences);
// //get
// router.get('/getExpencesById/:id', hostel_expences_controllers.get_data_by_id);
// router.get('/getAllExpences', hostel_expences_controllers.get_all_data);
// //delete
// router.delete('/deleteExpenceById/:id', hostel_expences_controllers.delete_by_id);

export const hostel_expence_router: Router = router;
