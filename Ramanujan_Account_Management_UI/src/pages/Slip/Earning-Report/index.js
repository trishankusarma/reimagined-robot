import React from "react";
import Styles from "./index.module.css";

function Student({ income , expenses , extraIncome ,  salaryExpenses , eventExpenses }) {

  console.log(
    "Income", income,
    "extraIncome", extraIncome,
    "Expenses" , expenses ,
    "Salary Expenses" , salaryExpenses,
    "Event Expenses" , eventExpenses
  )

  return (
    <div className={Styles.root}>
    
      <div className={Styles.main}>
        <div className={Styles.firsttable}>
            <h4>Income</h4>
          <table>
            <tr>
              <th>Date :</th>
              <th>Reason</th>
              <th>Amount</th>
            </tr>
            {
              income && income.map((item)=>(

                <tr>
                    <td>{ item?.date }</td>
                    <td>{ item?.reason }</td>
                    <td>{ item?.amount }</td>
                </tr>
              ))
            }
  
          </table>

          <div className={Styles.firsttable}>
            <h4>Extra Income</h4>
          <table>
            <tr>
              <th>Date :</th>
              <th>Reason</th>
              <th>Amount</th>
            </tr>
            {
              extraIncome && extraIncome.map((item)=>(

                <tr>
                    <td>{ item?.date }</td>
                    <td>{ item?.reason }</td>
                    <td>{ (-1)*parseInt( item?.amount ) }</td>
                </tr>
              ))
            }
  
          </table>
        </div>

        </div>

        <div className={Styles.Secondtable}>
              <div>
                <h4>Expenses</h4>
                <table>
              <tr>
              <th>Date</th>
              <th>Reason </th>
              <th>Amount</th>
            </tr>
            {
              expenses && expenses.map((item)=>(

                <tr>
                    <td>{ item?.date }</td>
                    <td>{ item?.reason }</td>
                    <td>{ item?.amount }</td>
                </tr>
              ))
            }
            </table>
              </div>
              <div>
              <h4>Salary Expenses</h4>
                  <table>
              <tr>
              <th>Date</th>
              <th>Reason </th>
              <th>Amount</th>
            </tr>
            {
              salaryExpenses && salaryExpenses.map((item)=>(

                <tr>
                    <td>{ item?.date }</td>
                    <td>{ item?.reason }</td>
                    <td>{ item?.amount }</td>
                </tr>
              ))
            }
            </table>
              </div>
              <div>
              <h4>Event Expenses</h4>
                  <table>
              <tr>
              <th>Date</th>
              <th>Reason </th>
              <th>Amount</th>
            </tr>
            {
              eventExpenses && eventExpenses.map((item)=>(

                <tr>
                    <td>{ item?.date }</td>
                    <td>{ item?.reason }</td>
                    <td>{ item?.amount }</td>
                </tr>
              ))
            }
            </table>
              </div>
        </div>
      </div>

    </div>
  );
}

export default Student;
