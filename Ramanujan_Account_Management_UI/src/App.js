import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route,useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import PrivateRoute from "./utils/PrivateRoute";
import { useSelector, useDispatch } from "react-redux"
import Loader from "./components/shared/loader";
import "react-toastify/dist/ReactToastify.css";
import { isUserLoggedIn } from "./redux/actions"
const DashBoard = React.lazy(() => import("./pages/Dashboard"));
const Attendence = React.lazy(() => import("./pages/Attendence/Attendence"));
const StudentAttendence = React.lazy(() => import("./pages/Attendence/StudentAttendence"));
const StaffAttendence = React.lazy(() => import("./pages/Attendence/StaffAttendence"));
const SendNotification = React.lazy(() => import('./pages/SendNotification'));
const Expenditure = React.lazy(() => import('./pages/Expenditure'));
const SalarySlip = React.lazy(() => import('./pages/SalarySlip'));
const feePaymentHostelSlip = React.lazy(() => import('./pages/Slip/feePaymentHostel'));
const EventManagement = React.lazy(() => import('./pages/EventManagement'));
const StudentsMark = React.lazy(() => import('./pages/StudentsMark'));
const Cashbook = React.lazy(() => import('./pages/Cashbook'));
const Home = React.lazy(() => import("./pages/Home"));
const Signin = React.lazy(() => import("./pages/signin/signin"));
const StudentList = React.lazy(() => import("./pages/StudentList"));
const TeacherList = React.lazy(() => import("./pages/StuffList"));
const FeePayment = React.lazy(() => import("./pages/FeePayment"));
const OtherFeePayment = React.lazy(() => import("./pages/FeePayment/otherFeePayment"));
const StaffRegistration = React.lazy(() => import("./pages/StaffRegistration"));
const LeaveStudent = React.lazy(() => import("./pages/Leave/StudentLeave"));
const LeaveTeacher = React.lazy(() => import("./pages/Leave/TeacherLeave"));
const LeaveDash = React.lazy(() => import("./pages/Leave/LeaveDesh"));
const ReportDesh = React.lazy(() => import("./pages/Report/ReportDesh"));
const StaffAttend = React.lazy(() => import("./pages/Report/StaffAttend"));
const StudentAttend = React.lazy(() => import("./pages/Report/StudentAttend"));
const StaffSalary = React.lazy(() => import("./pages/Report/StaffSalary"));
const StudentFee = React.lazy(() => import("./pages/Report/StudentFees"));
const PromotionStu = React.lazy(() => import("./pages/Promotion"));
const StudentRegistration = React.lazy(() => import("./pages/StudentRegistration"));
const Notices = React.lazy(() => import("./pages/Notices"));
const AddAdmin = React.lazy(() => import("./pages/AddadminPage/admin"));
const AddAdminDesh = React.lazy(() => import("./pages/AddadminPage/Addnew"));
const AddDepartment = React.lazy(() => import("./pages/AddadminPage/AddDepartment"));
const LeaveReq = React.lazy(() => import("./pages/LeaveRequests"));
const AddHostel = React.lazy(() => import("./pages/AddHostel"));
const AddHostelRoom = React.lazy(() => import("./pages/AddRoom"));
const AddNewLeave = React.lazy(() => import("./pages/AddNewLeave"));
const StudentReceipt = React.lazy(() => import("./components/StudentReceipt"));
const HostelStudent = React.lazy(() => import("./pages/HostelStudent"));
// const Modal = React.lazy(() => import("./components/StudentsMark/Modal"));
const EnterAttend = React.lazy(() => import("./pages/EnterAttendence"));
const Evaluate = React.lazy(() => import("./pages/Evaluate"));
const EarningReport = React.lazy(() => import("./pages/Earning-Report"));
const CashBookDaily = React.lazy(() => import("./pages/CashBookDaily"));
const ExpiryAndBalance = React.lazy(() => import("./pages/ExpiryAndBalance"));
const Slip1 = React.lazy(() => import("./pages/Slip/AdmisionSlip"));
const HostelFeeReciept = React.lazy(() => import("./pages/Slip/HostelFeeReciept"));
const Slip2 = React.lazy(() => import("./pages/Slip/PassClearification"));
const Slip3 = React.lazy(() => import("./pages/Slip/StudentIdCard"));
const StudentId = React.lazy(() => import("./pages/Slip/StudentId"));
const Slip4 = React.lazy(() => import("./pages/Slip/PaySlip"));
const Slip5 = React.lazy(() => import("./pages/Slip/TableSlip"));
const Slip6 = React.lazy(() => import("./pages/Slip/StudentFeeSlip"));
const Modal = React.lazy(() => import("./components/StudentsMark/Modal"));
const MarksEntry = React.lazy(() => import("./pages/MarksEntry"));
const AdminList = React.lazy(() => import("./pages/AdminList"));
const Private = React.lazy(() => import("./helpers/private"));
const EmailEntry = React.lazy(() => import("./pages/Forgetpass/EmailEntry"));
const ResetPass  = React.lazy(() => import("./pages/Forgetpass/ResetPass"));
const AddSession = React.lazy(() => import("./pages/Addsession"));
const StudentTable = React.lazy(() => import("./pages/Slip/StudentList"));
const EarningTable = React.lazy(() => import("./pages/Slip/Earning-Report"));
const Expirytable = React.lazy(() => import("./pages/Slip/Expiry-balance"));
const CashbookTable = React.lazy(() => import("./pages/Slip/CashBook"));


export const Toastify = (type, msg) => {
  switch (type) {
    case "success":
      toast.success(msg);
      break;
    case "warning":
      toast.warn(msg);
      break;
    case "error":
      toast.error(msg);
      break;
    case "info":
      toast.info(msg);
      break;
    default:
      toast.info(msg);
      break;
  }
};

function App() {
  toast.configure({ hideProgressBar: true });
  const auth = useSelector(state => state.auth);
  const history=useHistory()
  const dispatch = useDispatch()
  React.useEffect(() => {
    if (!auth.authenticated) {
      dispatch(isUserLoggedIn(history));
    }
  }, []);
  if (auth.authenticating || auth.loading) {
    return <Loader />
  }
  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <Switch>
          <Private exact path='/fee-payment' component={FeePayment} />
          <Route exact path='/fee-payment/reciept/:id' component={Slip1} />

          <Route exact path='/OtherPayment' component={OtherFeePayment} />
          <Route exact path='/OtherPayment/reciept/:id' component={Slip1} />

          <Private exact path='/' component={Home} />
          <Route exact path='/signin' component={Signin} />
          <Route exact path='/StudentList' component={StudentList} />
          <Route exact path='/uploadAttendance' component={Attendence} />
          <Route
            exact
            path='/uploadAttendance/student'
            component={StudentAttendence}
          />
          <Route exact path='/uploadAttendance/staff' component={StaffAttendence} />
          <Route exact path='/StaffList' component={TeacherList} />
          {/* <Route exact path='/fee-payment' component={FeePayment} /> */}
          {/* <Route exact path='/OtherPayment' component={OtherFeePayment} /> */}
          <Route exact path='/send-notification' component={SendNotification} />
          <Private exact path='/expenditure' component={Expenditure} />
          <Private exact path='/salary-slip' component={SalarySlip} />
          <Private exact path='/event-management' component={EventManagement} />
          <Route exact path='/event-management/print/:id' component={Slip4} />
          <Route exact path='/student-marks' component={StudentsMark} />
          <Private exact path='/cashbook' component={Cashbook} />
          <Route exact path='/cashbook/daily' component={ CashBookDaily } />
          <Route exact path='/feePaymentHostelSlip/:id' component={ feePaymentHostelSlip } />

          {/* feePaymentHostelSlip */}
          <Route
          exact
          path='/StaffRegistration'
          component={StaffRegistration}
          />
          <Route
          exact
          path='/StaffEdit/:_id'
          component={StaffRegistration}
          />
          <Route
          exact
          path='/StudentEdit/:_id'
          component={StudentRegistration}
          />
          <Private exact path='/dashboard' component={DashBoard} />
          <Route exact path='/leavedash/leaveStudent' component={LeaveStudent} />
          <Route exact path='/leavedash/leaveTeacher' component={LeaveTeacher} />
          <Route exact path='/leavedash' component={LeaveDash} />
          <Route exact path='/ReportDesh' component={ReportDesh} />
          <Route exact path='/ReportDesh/StaffAttend' component={StaffAttend} />
          <Route exact path='/ReportDesh/StudentAttend' component={StudentAttend} />
          <Route exact path='/ReportDesh/StaffSalary' component={StaffSalary} />
          <Route exact path='/ReportDesh/StudentFee' component={StudentFee} />
          <Private exact path='/promotion' component={PromotionStu} />
          <Route exact path='/notices' component={Notices} />
          <Route exact path='/adminDesh/addAdmin' component={AddAdmin} />
          <Private exact path='/adminDesh' component={AddAdminDesh} />
          <Route exact path='/adminDesh/addDepartment' component={AddDepartment} />
          <Route exact path='/leavereq' component={LeaveReq} />
          
          <Route exact path='/addhostel' component={AddHostel} />
          <Route exact path='/Student Receipt' component={StudentReceipt} />
          <Route exact path='/addRoom/:_id' component={AddHostelRoom} />
          <Route exact path='/addnewLeave' component={AddNewLeave} />
          <Route exact path='/HostelStudent' component={HostelStudent} />
          {/* <Route exact path='/model' component={Modal} /> */}
          <Route exact path='/enterAttend' component={EnterAttend} />
          <Route exact path='/evaluate' component={Evaluate} />
          <Route exact path='/slip6' component={Slip6} />
          <Route exact path='/StudentListTable' component={StudentTable} />
          <Route exact path='/EarningTable' component={EarningTable} />
          <Route exact path='/Expirytable' component={Expirytable} />
          <Route exact path='/CashbookTable' component={CashbookTable} />
          <Route exact path='/expiry-balance' component={ExpiryAndBalance} />
          <Route exact path='/earning-report' component={EarningReport} />
          <Route exact path='/addSession' component={AddSession} />

          <Route exact path='/StudentList/reciept/:id' component={Slip1} />

          <Route exact path='/HostelList/reciept/:id' component={HostelFeeReciept} />

          <Route exact path='/StudentList/passCer/:id' component={Slip2} />
          <Route exact path='/StaffList/idproff/:id' component={Slip3} />
          <Route exact path='/StudentList/idproff/:id' component={StudentId} />
          <Route exact path='/slip_generate/:id' component={Slip4} />
          <Route exact path='/model' component={Modal} />
          <Private exact path='/MarksEntry' component={MarksEntry} />
          <Route exact path='/AdminList' component={AdminList} />
          <Route exact path='/EmailEntry' component={EmailEntry} />
          <Route exact path='/resetpassword/:userId/:token' component={ResetPass} /> 
          <Route exact path='/uploadAttendance/enterAttend' component={EnterAttend} /> 
          <Private
            exact
            path='/admission'
            component={StudentRegistration}
          />
          <Route component={Home} />
        </Switch>
      </Router>
    </Suspense>
  );
}

export default App;
