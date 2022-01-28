import React from 'react';
import styles from './index.module.css'
import imageR from '../../../components/Assets/img/ramanujan_logo.jpeg'

const Form1T = () => {
    return (
        <div className={styles.form1T}>
        <div className={styles.insideBorder}>
        <div className={styles.iconR}><img src={imageR} height="100px"/></div>
            <h1 className={styles.headingR}>RAMANUJAN ACADEMY</h1>
            <div className={styles.details}>
                <p>GORESWAR ROAD, BAIHATTA CHARIALI KAMRUP, ASSAM</p>
                <p>Contact No: 23524646</p>
                <p>Email: ramanujanacademy<span >@gmail.com</span></p>
                <p>Webiste : ramanujanacademy.co.in</p>
            </div>
            </div>
            <hr></hr>
            <div className={styles.mainDetails}>
            <table>
                    <tr>
                        <th className={styles.special}>Date</th>
                        <th className={styles.special}>Organiser</th>
                        <th className={styles.special}>Event</th>
                        <th className={styles.special}>Budget allocated</th>
                        <th className={styles.special}>Budget used</th>
                        <th className={styles.special}>Remarks</th>
                    </tr>
                    <tr>
                        <td className={styles.special}>11/11/1111</td>
                        <td className={styles.special}>biology dept</td>
                        <td className={styles.special}>farewal party</td>
                        <td className={styles.special}>100000</td>
                        <td className={styles.special}>1000000</td>
                        <td className={styles.special}>nothing to remarks</td>
                    </tr>
                </table>
            </div>
       </div>
    );
};

export default Form1T;