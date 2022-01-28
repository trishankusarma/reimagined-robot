import {Grid} from '@material-ui/core'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridShared from '../../shared/Buttons/BigButton'


const useStyles = makeStyles((theme) => ({
    root:{
        width:'70%',
        margin:'1.6rem auto',
        height:'77vh'
    },
    // paper:
    // {
    //    margin:'10px 10px'
    // },

}));

const GridItem = [
{
    title:"Stuents Attendence",
    to:'ReportDesh/StudentAttend'
},
{
  title:"Staff Attendence",
  to:'ReportDesh/StaffAttend'
},
{
  title:"Student Fee",
  to:'ReportDesh/StudentFee'
},
{
  title:"Staff salary",
  to:'ReportDesh/StaffSalary'
},

]
function ReportDesh() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
           <div className={classes.grid}>
        <Grid container spacing={5}>
          {GridItem.map((item, index) => {
          
            return (
              <Grid item xs={12} sm={12} lg={6}>
            <GridShared item={item} index={index} />
            </Grid>
            )
          })}
        </Grid>
      </div>
        </div>
    )
}

export default ReportDesh
