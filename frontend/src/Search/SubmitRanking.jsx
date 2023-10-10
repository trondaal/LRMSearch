
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
import ExpertiseRating from "./ExpertiseRating.jsx";
import { v4 as uuidv4 } from 'uuid';

export default function SubmitRanking({query, expanded, setExpanded, results}) {
    const [mutateFunction, { data, loading, error }] = useMutation(CREATE_RANKING);
    const [open, setOpen] = React.useState(false);
    const [bibliographicExpertise, setBibliographicExpertise] = React.useState(3);
    const [searchExpertise, setSearchExpertise] = React.useState(3);
    const [taskConfidence, setTaskConfidence] = React.useState(3);
    const [queries, setQueries] = React.useState([]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        setOpen(false);
        const params = new URLSearchParams(window.location.search)
        let response = uuidv4();
        if (params.get("response")){
            response = params.get("response");
        }else{
            params.set("response", response);
            window.location.search = params.toString()
        }
        mutateFunction({
            variables: {
                date: Date.now().toString(),
                query: query,
                respondent: response,
                relevant: relevantVar(),
                irrelevant: irrelevantVar(),
                neutral: results.map(x => x.expression.uri),
                bibliographicExpertise: bibliographicExpertise,
                searchExpertise: searchExpertise
            }
        });
        let obj = {relevant: relevantVar(), irrelevant: irrelevantVar()};
        let json = JSON.stringify(obj);
        setQueries([...queries, query]);
        localStorage.setItem(query.toLowerCase(), json);
    };

    return (
        <Box display="flex" justifyContent="flex-end">
            <Button variant="outlined" onClick={() => setExpanded(!expanded)} sx={{ mr: 2 }}>
                {expanded ? "Hide items" : "Show items"}
            </Button>
            <Button variant="outlined"  disabled={relevantVar().length === 0 && irrelevantVar().length === 0} sx={{ mr: 2 }}
                onClick={() => {relevantVar([]); irrelevantVar([]); localStorage.removeItem(query.toLowerCase());}}>
                Clear ranking
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
                    {"Rate your ..."}
                </DialogTitle>
                <ExpertiseRating title={"knowledge of this author or work"} value={searchExpertise} setValue={setSearchExpertise}/>
                <ExpertiseRating title={"knowledge of bibliographic data"} value={bibliographicExpertise} setValue={setBibliographicExpertise}/>
                <ExpertiseRating title={"confidence in solving the task"} value={taskConfidence} setValue={setTaskConfidence}/>
                <DialogTitle id="alert-dialog-title">
                    {"Submit your ranking?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Saving rankings for query: {sessionStorage.getItem('query')}. <br/>
                        You have marked {relevantVar().length + " relevant and " + irrelevantVar().length + " irrelevant."}.<br/>
                        By submitting you accept that data will be used in research.<br/>
                        No personal data is stored in this survey.
                    </DialogContentText>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={handleSave} autoFocus>Yes</Button>
                </DialogActions>
            </Dialog>
            <Tooltip title={localStorage.getItem(sessionStorage.getItem('query')) ? "You have completed ranking this query." : "Not submitted yet"} placement={"right"}>
                <CheckCircleOutlineSharpIcon color={localStorage.getItem(sessionStorage.getItem('query')) ? "success" : "action"} sx={{fontSize: 40}}/>
            </Tooltip>
        </Box>
    );
}

