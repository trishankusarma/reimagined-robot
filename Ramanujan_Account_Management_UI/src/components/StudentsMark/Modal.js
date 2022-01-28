import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Table from '../shared/Table';
import { Button } from '@material-ui/core';

const columns = [
    { id: 'name', label: 'Subject', minWidth: 70 },
    {
        id: 'marks',
        label: 'Total Mark',
        minWidth: 70,
        align: 'left'
    },
    {
        id: 'Pass_Mark',
        label: 'Pass Mark',
        minWidth: 70,
        align: 'left'
    },
    { id: 'Mark_Obtain', label: 'Mark Obtain', minWidth: 70 },
    {
        id: 'Is_Fourth',
        label: 'Is Fourth',
        minWidth: 70,
        align: 'left'
    },
    {
        id: 'remarks',
        label: 'Remarks',
        minWidth: 70,
        align: 'left'
    }
];

const useStyles = makeStyles((theme) =>
    createStyles({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width:"90%",
            margin:'auto'
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }),
);

export default function TransitionsModal({open,handleClose, rows, handleSubmit}) {
    const classes = useStyles();

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <Table data={rows} columns={columns} pagination={false} />
                        <Button color="primary" variant="contained" style={{ margin: '10px auto' }} onClick={handleSubmit}>
                             Submit
                        </Button>
                        <Button color="secondary" variant="contained" style={{ margin: '10px 10px' }}>print</Button>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
