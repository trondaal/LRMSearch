
import Box from '@mui/material/Box';
import { useMutation } from '@apollo/client';
import {CREATE_RANKING} from "../api/Queries";
import {relevantVar, irrelevantVar} from "../api/Cache";

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import CheckCircleOutlineSharpIcon from '@mui/icons-material/CheckCircleOutlineSharp';
import Tooltip from '@mui/material/Tooltip';

import { v4 as uuidv4 } from 'uuid';

export default function SubmitRanking() {

    const [mutateFunction, { data, loading, error }] = useMutation(CREATE_RANKING);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        setOpen(false);
        mutateFunction({
            variables: {
                date: Date.now().toString(),
                query: sessionStorage.getItem('query'),
                respondent: uuidv4(),
                relevant: relevantVar(),
                irrelevant: irrelevantVar(),
                neutral: []
            }
        });
        let obj = {relevant: relevantVar(), irrelevant: irrelevantVar()};
        let json = JSON.stringify(obj);
        localStorage.setItem(sessionStorage.getItem('query'), json);
    };

    return (
        <Box display="flex" justifyContent="flex-end">
            <Button variant="outlined"  disabled={relevantVar().length === 0 && irrelevantVar().length === 0} sx={{ mr: 2 }}
                onClick={() => {relevantVar([]); irrelevantVar([]);}}>
                Clear
            </Button>
            <Button variant="outlined" onClick={handleClickOpen} disabled={relevantVar().length === 0 && irrelevantVar().length === 0}  sx={{ mr: 2 }}>
                Submit
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Submit your ranking?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Saving rankings for query: {sessionStorage.getItem('query')}. <br/>
                        You have marked {relevantVar().length + " relevant and " + irrelevantVar().length + " irrelevant."}.<br/>
                        By submitting you accept that data will be used in research.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={handleSave} autoFocus>Yes</Button>
                </DialogActions>
            </Dialog>
            <Tooltip title={localStorage.getItem(sessionStorage.getItem('query')) ? "Done!" : "Not submitted yet"} placement={"right"}>
                <CheckCircleOutlineSharpIcon color={localStorage.getItem(sessionStorage.getItem('query')) ? "success" : "action"} sx={{fontSize: 40}}/>
            </Tooltip>
        </Box>
    );
}

