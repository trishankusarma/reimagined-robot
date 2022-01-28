import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@material-ui/core';
import { useState } from 'react';
import {useDispatch,useSelector} from "react-redux"
import { salarySlipCreate } from '../../redux/actions';
import {useHistory} from "react-router-dom";
import {Toastify} from "../../App";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    width: '96vw',
    margin: '.5rem auto'
  }
}));

const FormSection = () => {
    const history=useHistory();
    const classes = useStyles();
    const [formData, setFormData] = useState({
      basicPay: 0,
      DA: 0,
      HRA: 0,
      conveyance: 0,
      otherAllowance: 0,
      grossSalary: 0,
      PF: 0,
      ESI: 0,
      loanDeduction: 0,
      professionalTax: 0,
      absentPenalty: 0,
      advancedSalary: 0,
      TDSIT: 0,
      netSalary: 0,
      paymentMethod: 0,
    });
    
    const dispatch = useDispatch()
    const Save=()=>{
      if(stuff?.basicSalaryInfo?.employee?._id||stuff?.basicSalaryInfo?.year||stuff?.basicSalaryInfo?.month){
        dispatch(salarySlipCreate({...formData,stuff_id:stuff.basicSalaryInfo.employee._id,year:stuff.basicSalaryInfo.year,month:stuff.basicSalaryInfo.month,department:auth.user.adminType._id}))
      }else{
        Toastify("error","Enter Every value");
      }
      
    }
    const {
      basicPay,
      DA,
      HRA,
      conveyance,
      otherAllowance,
      grossSalary,
      PF,
      ESI,
      loanDeduction,
      professionalTax,
      absentPenalty,
      advancedSalary,
      TDSIT,
      netSalary,
      paymentMethod,
    } = formData;
    
    const changeHandler = (e) => {
      if(e.target.name=='basicPay'||e.target.name=='otherAllowance'||e.target.name=='DA'||e.target.name=='HRA'||e.target.name=='conveyance'||e.target.name=='loanDeduction'||e.target.name=='TDSIT'||e.target.name=='professionalTax'||e.target.name=='PF'||e.target.name=='absentPenalty'||e.target.name=='advancedSalary'||e.target.name=='ESI'){
        
        let value = e.target.value === '' ? 0 : parseInt(e.target.value) 
        setFormData({...formData, [e.target.name]: value  });    
      }else{
      setFormData({...formData, [e.target.name]: e.target.value})
    }
    }
  const stuff = useSelector(state => state.stuff);
  const auth = useSelector(state => state.auth);
  React.useEffect(()=>{
    setFormData({
      ...formData,
      grossSalary:parseFloat(formData.basicPay)+parseFloat(formData.otherAllowance)+parseFloat(formData.DA)+parseFloat(formData.HRA)+parseFloat(formData.conveyance),
      netSalary:parseFloat(formData.basicPay)+parseFloat(formData.otherAllowance)+parseFloat(formData.DA)+parseFloat(formData.HRA)+parseFloat(formData.conveyance)-parseFloat(formData.loanDeduction)-parseFloat(formData.TDSIT)-parseFloat(formData.professionalTax)-parseFloat(formData.PF)-parseFloat(formData.absentPenalty)-parseFloat(formData.advancedSalary)-parseFloat(formData.ESI)
    })
  },[formData.basicPay,formData.otherAllowance,formData.DA,formData.HRA,formData.conveyance,formData.loanDeduction,formData.TDSIT,formData.professionalTax,formData.PF,formData.absentPenalty,formData.advancedSalary,formData.ESI])
  return (
    <form>
      <Grid container spacing={3} className={classes.gridContainer}>
        {/* Row 1 */}
        <Grid item sm={12} md={6} lg={3}>
          <TextField
            variant='outlined'
            fullWidth
            type={Number}
            size='small'
            name='basicPay'
            value={basicPay}
            onChange={(e) => changeHandler(e)}
            placeholder='Basic Pay:'
            label='Basic Pay:'
          />
        </Grid>
        <Grid item sm={12} md={6} lg={3}>
          <TextField
            variant='outlined'
            fullWidth
            size='small'
            name='DA'
            value={DA}
            onChange={(e) => changeHandler(e)}
            placeholder='DA:'
            label='DA:'
          />
        </Grid>
        <Grid item sm={12} md={6} lg={3}>
          <TextField
            variant='outlined'
            fullWidth
            size='small'
            name='HRA'
            value={HRA}
            onChange={(e) => changeHandler(e)}
            placeholder='HRA:'
            label='HRA:'
          />
        </Grid>
        <Grid item sm={12} md={6} lg={3}>
          <TextField
            variant='outlined'
            fullWidth
            size='small'
            name='conveyance'
            value={conveyance}
            onChange={(e) => changeHandler(e)}
            placeholder='Conveyance:'
            label='Conveyance:'F
          />
        </Grid>
        {/* Row 2 */}
        <Grid item sm={12} md={6} lg={3}>
          <TextField
            variant='outlined'
            fullWidth
            size='small'
            name='otherAllowance'
            value={otherAllowance}
            onChange={(e) => changeHandler(e)}
            placeholder='Other Allowance:'
            label='Other Allowance:'
          />
        </Grid>
        <Grid item sm={12} md={6} lg={3}>
          <TextField
            variant='outlined'
            fullWidth
            size='small'
            name='grossSalary'
            value={grossSalary}

            onChange={(e) => changeHandler(e)}
            placeholder='Gross Salary:'
            label='Gross Salary:'
            disabled
          />
        </Grid>
        <Grid item sm={12} md={6} lg={3}>
          <TextField
            variant='outlined'
            fullWidth
            type={Number}
            size='small'
            name='PF'
            value={PF}
            onChange={(e) => changeHandler(e)}
            placeholder='PF:'
            label='PF:'
          />
        </Grid>
        <Grid item sm={12} md={6} lg={3}>
          <TextField
            variant='outlined'
            fullWidth
            size='small'
            name='ESI'
            value={ESI}
            onChange={(e) => changeHandler(e)}
            placeholder='ESI:'
            label='ESI:'
          />
        </Grid>
        {/* Row 3 */}
        <Grid item sm={12} md={6} lg={3}>
          <TextField
            variant='outlined'
            fullWidth
            size='small'
            name='loanDeduction'
            value={loanDeduction}
            onChange={(e) => changeHandler(e)}
            placeholder='Loan Deduction:'
            label='Loan Deduction:'
          />
        </Grid>
        <Grid item sm={12} md={6} lg={3}>
          <TextField
            variant='outlined'
            fullWidth
            size='small'
            name='professionalTax'
            value={professionalTax}
            onChange={(e) => changeHandler(e)}
            placeholder='Professional Tax:'
            label='Professional Tax:'
          />
        </Grid>
        <Grid item sm={12} md={6} lg={3}>
          <TextField
            variant='outlined'
            fullWidth
            size='small'
            name='absentPenalty'
            value={absentPenalty}
            onChange={(e) => changeHandler(e)}
            placeholder='Absent Penalty:'
            label='Absent Penalty:'
          />
        </Grid>
        <Grid item sm={12} md={6} lg={3}>
          <TextField
            variant='outlined'
            fullWidth
            size='small'
            name='advancedSalary'
            value={advancedSalary}
            onChange={(e) => changeHandler(e)}
            placeholder='Advance Salary:'
            label='Advance Salary:'
          />
        </Grid>
        {/* Row 4 */}
        <Grid item sm={12} md={6} lg={3}>
          <TextField
            variant='outlined'
            fullWidth
            size='small'
            name='TDSIT'
            value={TDSIT}
            onChange={(e) => changeHandler(e)}
            placeholder='TDS/IT:'
            label='TDS/IT:'
          />
        </Grid>
        <Grid item sm={12} md={6} lg={3}>
          <TextField
            variant='outlined'
            fullWidth
            size='small'
            name='netSalary'
            value={netSalary}
            onChange={(e) => changeHandler(e)}
            placeholder='Net Salary:'
            label='Net Salary:'
            disabled
          />
        </Grid>
        <Grid item sm={12} md={6} lg={3}>
          <FormControl variant='outlined' fullWidth size='small'>
            <InputLabel id='PaymentMode'>Payment Mode:</InputLabel>
            <Select
              id='PaymentMode'
              name='paymentMethod'
              value={paymentMethod}
              onChange={(e) => changeHandler(e)}
              label='Payment Mode:'
            >
              <MenuItem value='cash'>Cash</MenuItem>
              <MenuItem value='bank'>Bank</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      {/* <Button
        style={{ marginLeft: '2.2vw' }}
        variant='contained'
        color='primary'
        onClick={()=>{
          
        }}
      >
       Save
      </Button> */}
      <Button
        style={{ marginLeft: '2.2vw' }}
        variant='contained'
        color='primary'
        onClick={()=>{
          localStorage.setItem("dataslip",JSON.stringify(formData));
          Save();
          history.push(`/slip_generate/${stuff?.basicSalaryInfo?.employee?._id}`);
        }}
      >
       Generate Slip
      </Button>
    </form>
  );
};

export default FormSection;
