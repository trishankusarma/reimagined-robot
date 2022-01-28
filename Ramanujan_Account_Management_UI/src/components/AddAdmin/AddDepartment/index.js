import React, { useState } from 'react'
import { Button, TextField, Typography, Grid } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';
import { makeStyles } from '@material-ui/core/styles';

import axios from '../../../helpers/axios';
import { Toastify } from '../../../App';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const useStyles = makeStyles((theme) => ({
    dept: {
        display: 'flex',
        flexDirection: 'column',
        width: '30%',
        margin: '1rem auto'
    },
    Class: {
        display: 'flex',
        flexDirection: 'column',
    },
    avatar1: {
        display: 'flex',
        alignItems: 'center',
        margin: theme.spacing(3),
        backgroundColor: 'red',
        borderRadius: '100%',
        color: 'white',
        '&:hover': {
            background: "green",
        },
    },
    avatar2: {
        display: 'flex',
        alignItems: 'center',
        margin: theme.spacing(1),
        backgroundColor: 'green',
        borderRadius: '100%',
        color: 'white',
        '&:hover': {
            background: "red",
        },
    },
    button: {
        width: '80%',
        margin: '1rem 1rem'
    }

}));

function AddDept() {

    const classes = useStyles();

    const initialClassState = {

        class: '',
        subjects: [],
        sections: []
    }

    const [department, setDepartment] = useState({
        departmentName: '',
        classes: [initialClassState]
    })

    const addClass = () => {

        setDepartment({
            ...department,
            classes: [...department.classes, initialClassState]
        })
    }

    const addSection = (index) => {

        setDepartment({
            ...department,
            classes: department.classes?.map((item, idx) => {

                return idx === index ? { ...item, sections: [...item.sections, ''] } : item
            })
        })
    }

    const addSubject = (index) => {

        setDepartment({
            ...department,
            classes: department.classes?.map((item, idx) => {

                return idx === index ? { ...item, subjects: [...item.subjects, ''] } : item
            })
        })
    }
    const history = useHistory();

    const handleChange = (e, index, index1) => {

        const { name, value } = e.target

        if (name === 'class') {

            setDepartment({
                ...department,
                classes: department.classes?.map((item, idx) => {

                    return idx === index ? { ...item, class: value } : item
                })
            })
            return;
        }

        if (name === 'section') {

            setDepartment({
                ...department,
                classes: department.classes?.map((item, idx) => {

                    return idx === index ? { ...item, sections: item.sections.map((section, idx) => idx === index1 ? value : section) } : item
                })
            })
            return
        }

        if (name === 'subject') {

            setDepartment({
                ...department,
                classes: department.classes?.map((item, idx) => {

                    return idx === index ? { ...item, subjects: item.subjects.map((subject, idx) => idx === index1 ? value : subject) } : item
                })
            })
            return
        }

        setDepartment({
            ...department,
            [name]: value
        })
    }

    const deleteClass = (index) => {

        setDepartment({
            ...department,
            classes: department.classes?.filter(((item, idx) => idx !== index))
        })
    }

    const handleSubmit = async (e) => {

        try {

            const res = await axios().post('/admin/createDepartment', department)

            console.log(res.data)

            if (res.status === 200)
            {
                Toastify('success', 'Department successfully added!!')
                history.push('/adminDesh')
            }
            else
                Toastify('error', 'Something went wrong!!')
        } catch (error) {
            Toastify('error', 'Something went wrong!!')
        }
    }

    return (
        <div>
            <div className={classes.dept}>
                <center><Typography variant="h4" style={{ margin: '20px auto' }}>Add New Department</Typography></center>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="Dept"
                    label="Add Your Department"
                    name="departmentName"
                    value={department.departmentName}
                    onChange={handleChange}
                    autoFocus
                />
                <div className={classes.Class}>

                    {
                        department.classes?.map((item, index) => {
                            return <Typography value={item}>
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="Class"
                                        label="Class"
                                        name="class"
                                        value={item.class}
                                        onChange={(e) => handleChange(e, index)}
                                        autoFocus
                                    />

                                    <CancelIcon
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => deleteClass(index)}
                                        disabled={!item.class}
                                        style={{ cursor: 'pointer', marginLeft: '5px' }}
                                    />
                                </div>

                                <Grid container spacing={3}> 
                                    <Grid xs={12} sm={12} md={6} lg={6} item>
                                    <Button
                                    className={classes.button}
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => addSection(index)}
                                    disabled={!item.class}
                                >Add Section</Button>

                                {
                                    item.sections?.map((section, idx) => {

                                        return <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            size="small"
                                            id="Section"
                                            label="Section"
                                            name="section"
                                            value={section}
                                            onChange={(e) => handleChange(e, index, idx)}
                                            autoFocus
                                        />
                                    })
                                }

                                    </Grid>
                                    <Grid xs={12} sm={12} md={6} lg={6} item>
                                    <Button
                                    className={classes.button}
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => addSubject(index)}
                                    disabled={!item.class}
                                >Add Subject</Button>

                                {
                                    item.subjects?.map((subject, idx) => {

                                        return <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="Subject"
                                            label="Subject"
                                            name="subject"
                                            size="small"
                                            value={subject}
                                            onChange={(e) => handleChange(e, index, idx)}
                                            autoFocus
                                        />
                                    })
                                }
                                    </Grid>

                                </Grid>


                                
                               
                            </Typography>
                        })
                    }

                    <Button variant='contained' style={{ width: "40%", margin: '1rem auto' }} color="secondary" onClick={addClass}>Add Class <AddIcon /></Button>
                </div>
                <div>

                </div>

                <Button style={{ width: "40%", margin: '.5rem auto' }} variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
            </div>
        </div>
    )
}

export default AddDept

//  <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
// {/* <div  className={classes.avatar2} onClick={() => { deleteItem(index) }} key={index}><CancelIcon /></div>
// <Typography>{itemval}</Typography>
// </div> */}