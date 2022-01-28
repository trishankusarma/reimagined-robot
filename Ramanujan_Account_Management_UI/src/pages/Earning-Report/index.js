import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import EarningReport from '../../components/Earning-Report/index';
import DrawerMenu from '../../components/shared/DrawerMenu';
import Navbar from '../../components/shared/Navbar';
import Footer from '../../components/shared/Footer';
import moment from 'moment';
import { useSelector } from 'react-redux';
import axios  from '../../helpers/axios';
import { Toastify } from '../../App';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  content: {
    flexGrow: 1,
    maxWidth: '100vw',
    idth: '100vw',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  btnC: {
    width: '60%',
    margin: '2rem auto'
  }
}));

export default function Earning() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const [ expenses, setExpenses ] = useState([]);
  const [ salaryExpenses, setSalaryExpenses ] = useState([]);

  const [ income , setIncome ] = useState([])
  const [ eventExpenses, setEventExpenses ] = useState([])

  const [ extraIncome , setExtraIncome ] = useState([]);

  const [ totalSalaryExpenses , setTotalSalaryExpenses ] = useState(0)
  const [ totalExpenditureExpenses , setTotalExpenditureExpenses ] = useState(0)
  const [ totalEventExpenses , setTotalEventExpenses ] = useState(0)

  const [ totalExtraIncome , setTotalExtraIncome ] = useState(0)

  const [ totalIncomes , setTotalIncomess ] = useState(0)

  const auth = useSelector(state => state.auth)

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [
     basicDetails, setBasicDetails
  ] = useState({
     FromDate :moment().format('YYYY-MM-DD'),
     ToDate : moment().format('YYYY-MM-DD')
  })

  const {
    FromDate, ToDate
  } = basicDetails

  const handleChange = (e)=>{
     
    const { name, value } = e.target;

    setBasicDetails({
        
        ...basicDetails,
        [name] : value
    })
  }

  useEffect(async () => {
    if(!FromDate || !ToDate) return

    try {
      let res = await axios().post("/stuff/getAllStuffPaymentForDuration",{
        department : auth?.user?.adminType?._id,
        FromDate,
        ToDate
      });

      console.log(res.data)
      if( res.status===200 ){

        let totalSalaryExpenses = 0 
         
        setSalaryExpenses(
           
            res.data.map((row)=>{
                totalSalaryExpenses = totalSalaryExpenses + row.netSalary
                return{
                  date : row.createdAt.split('T')[0] ,
                  reason : `Net Salary of ${row.netSalary} paid to ${row.stuff_id?.name}`,
                  amount : row.netSalary
                }
            })
        )
        setTotalSalaryExpenses(  totalSalaryExpenses )
        return
      }
      Toastify("error", 'Something went wrong');
    } catch (error) {

        Toastify("error", error);
    }
  }, [FromDate , ToDate ])


  useEffect(async () => {
    if(!FromDate || !ToDate) return
    try {
      let res = await axios().post("/admin/getAllEventManagementDuration",{
        department : auth?.user?.adminType?._id,
        FromDate,
        ToDate
      });

      console.log(res.data)
      if( res.status===200 ){
          
          let totalEventExpense = 0

          setEventExpenses(
             res.data.map((row)=>{
                
                 totalEventExpense = totalEventExpense + parseInt( row.budgetUsed )
                 
                 return{
                      date : row.date.split('T')[0] ,
                      reason : `${row.event} organized by ${row.organizer}`,
                      amount : row.budgetUsed
                 }
             })
         )
         
         setTotalEventExpenses( totalEventExpense )

         return
      }
      Toastify("error", 'Something went wrong');
    } catch (error) {

        Toastify("error", error);
    }
  }, [FromDate , ToDate ])

  useEffect(async () => {
    if(!FromDate || !ToDate) return

    try {
      let res = await axios().post("/admin/getAllExpenditureForDuration",{
        department : auth?.user?.adminType?._id,
        FromDate,
        ToDate
      });

      console.log(res.data.data.payment)
      if( res.status===200 ){

        let totalExpenditure = 0

        let expenseData =  res.data.data.payment.filter((row)=>{

          return parseInt( row.amount ) > 0;
        })

        let incomeData =  res.data.data.payment.filter((row)=>{

          return parseInt( row.amount ) < 0;
        })

        setExpenses(

          expenseData.map((row)=>{
             
              totalExpenditure = totalExpenditure +  row.amount

              let data = {
                  
                date : row.date ,
                reason : `${row.particulars} ( ${row.paymentMode} ) & remark: ${row.remarks}`,
                amount : row.amount
              }

              return data
          })
        )

        let totalExtraIncome = 0

        setExtraIncome(

          incomeData.map((row)=>{
             
            totalExtraIncome = totalExtraIncome - row.amount

              let data = {
                  
                date : row.date ,
                reason : `${row.particulars} ( ${row.paymentMode} ) & remark: ${row.remarks}`,
                amount : row.amount
              }

              return data
          })
        )

        setTotalExpenditureExpenses( totalExpenditure )
        setTotalExtraIncome( totalExtraIncome );

        return
      }
      Toastify("error", 'Something went wrong');
    } catch (error) {

        Toastify("error", error);
    }
  }, [FromDate , ToDate ])

  useEffect(async () => {
    if(!FromDate || !ToDate)return
     
    try {
       
      let res = await axios().post(`/student/allStudentsFeeForDuration`,{
        department : auth?.user?.adminType?._id,
        FromDate,
        ToDate
      });

      if(res.status===200){
           setIncome( res.data.payment )

           let incomesTotal = 0

           res.data.payment.map((item)=>{
                
              incomesTotal = incomesTotal +parseInt(  item.amount )
           })

           setTotalIncomess( incomesTotal )
           return
      }
      Toastify("error", 'Something went wrong');
    } catch (error) {
      
        Toastify("error", error);
    }
}, [FromDate , ToDate ])

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar handleDrawerOpen={handleDrawerOpen} open={open} />
      <DrawerMenu handleDrawerClose={handleDrawerClose} open={open} />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerHeader} />
        <EarningReport 
             totalEventExpenses={totalEventExpenses} 
             totalExpenditureExpenses={totalExpenditureExpenses} 
             totalSalaryExpenses={totalSalaryExpenses} 
             totalExtraIncome = { totalExtraIncome }
             totalIncomes={totalIncomes} 
             basicDetails={basicDetails} 
             handleChange={handleChange} 
             income={income} 
             extraIncome = {extraIncome}
             expenses={expenses} 
             salaryExpenses={salaryExpenses} 
             eventExpenses={eventExpenses}
          />
        <Footer />
      </main>
    </div>
  );
}
