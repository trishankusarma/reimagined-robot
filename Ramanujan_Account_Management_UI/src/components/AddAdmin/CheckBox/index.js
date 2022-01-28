import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import {useSelector,useDispatch} from "react-redux"
import {accessSubmit} from "../../../redux/actions/admin.action"
import {Toastify} from "../../../App"

export default function CheckboxLabels() {
    const dispatch = useDispatch();
    const [state, setState] = React.useState( [
        {
            to: 'admission',
            title: 'New Admission',
            bool:false
        },
        {
            to: 'uploadAttendance',
            title: 'Uplaod attendence',
            bool:false
        },
        {
            to: 'fee-payment',
            title: 'fees payment',
            bool:false
        },
        {
            to: 'send-notification',
            title: 'Notification',
            bool:false
        },
        {
            to: 'StaffRegistration',
            title: 'New Staff'
            ,bool:false
        },
        {
            to: 'leavedash',
            title: 'Leave Application'
            ,bool:false
        },
        {
            to: 'ReportDesh',
            title: 'Report'
            ,bool:false
        },
        {
            to: 'expiry-balance',
            title: 'Expiry'
            ,bool:false
        },
        {
            to: 'expenditure',
            title: 'Expenditure'
            ,bool:false
        },
        {
            to: 'salary-slip',
            title: 'pay Slip'
            ,bool:false
        },
        {
            to: 'event-management',
            title: 'event management'
            ,bool:false
        },
        {
            to: 'student-marks',
            title: 'Students marks'
            ,bool:false
        },
        {
            to: 'promotion',
            title: 'promotion'
            ,bool:false
        },
        {
            to: 'notices',
            title: 'Notices',
            bool:false
        },
        {
            to: '',
            title: 'Leave Request',
            bool:false
        },
        {
            to: 'MarksEntry',
            title: 'Students marks entry'
            ,bool:false
        },
        {
            to: 'cashbook',
            title: 'CAshBook',
            bool:false
        },
        {
            to: 'addhostel',
            title: 'Add Hostel',
            bool:false
        },
        {
            to: 'HostelStudent',
            title: 'Add Hostel Student',
            bool:false
        },

    ]);

    const accesSave=()=>{
        if(state[0].bool==true&&state[state.length-1].bool==true||state[0].bool==true&&state[state.length-2].bool==true){
            Toastify("error","Hostel Student and New Admission  conbination access not allowed !")     
            return 
        }
        let data =state.filter(item=>item.bool==true);
        dispatch(accessSubmit(data))
    }
    const handleChange = (event,index) => {
        console.log(event.target.name,"check event");
        let arr =[...state];
        arr[index].bool=event.target.checked;
        setState(arr);
    };

    return (
        <FormGroup row>
            {
                state.map((item,index) => {
                    return (
                        <FormControlLabel
                            control={<Checkbox checked={item.bool} onChange={(e)=>{handleChange(e,index)}} name={item.title} />}
                            label={item.title}
                        />
                    );
                })
            }
            <Button onClick={()=>{accesSave()}} variant="contained" color="primary" size="small">Access save</Button>
        </FormGroup>
    );
}


