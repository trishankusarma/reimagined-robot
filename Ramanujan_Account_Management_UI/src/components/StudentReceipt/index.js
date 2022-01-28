import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Image1 from '../Assets/img/ramanujan_logo.jpeg';
import classes from './Student.module.css'


function StudentReceipt() {

    return (
        <div className={classes.root}>
            <div className={classes.firstSection}>
                <img src={Image1} width="80" height="80" />
                <div className={classes.second}>
                    <h2>RAMANUJAN
                        ACADEMY</h2>
                 
                    <h5>BAIHATA CHARIALI, KAMRUP,<br />
                        ASSAM-781381
                    </h5>
                </div>
                <img src={Image1} width="80" height="80" />
            </div>
            <div className={classes.content}>
                <div className={classes.text1}>
                    <p>SL NO: 1117<br/>
                        NAME: ABDUL<br/>
                        MAJID ALI<br/>
                        CLASS: XI SCIENCE<br/>
                    </p>
                </div>
                <div className={classes.text2}>
                    <p>Cash Receipt</p><br/>
                    <p>SECTION: A1</p><br/>
                </div>
                <div className={classes.text3}>
                    DATE: 28/06/2021<br/>
                    ENROLLMENT NO:<br/>
                    1208
                    ROLL NO: 386<br/>
                </div>
            </div>
            <div>
                <table style={{border:'1px solid black', }}>
                    <tr>
                        <th>Serial No</th>
                        <th>Particulars</th>
                        <th>Amount</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>TUITION MONTHLY FEES JUNE,2021 </td>
                        <td>400000</td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default StudentReceipt
