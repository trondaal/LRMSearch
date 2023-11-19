
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
    const [tasks, setTasks] = React.useState(localStorage.getItem('lrm-survey-tasks') ? JSON.parse(localStorage.getItem('lrm-survey-tasks')) : []);
    const uri =  window.location.toString();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        setOpen(false);
        const params = new URLSearchParams(window.location.search)
        let respondent = "";
        if (params.get("respondent")){
            respondent = params.get("respondent");
        }else{
            respondent = uuidv4();
            params.set("respondent", respondent);
            window.location.search = params.toString()
        }
        let taskid = "";
        if (params.get("taskid")){
            taskid = params.get("taskid");
        }
        mutateFunction({
            variables: {
                uri: uri,
                date: Date.now().toString() + " : " + Date(),
                query: query,
                respondent: respondent,
                task: taskid,
                relevant: relevantVar(),
                irrelevant: irrelevantVar(),
                results: results.map(x => x.expression.uri),
                bibliographicExpertise: bibliographicExpertise,
                searchExpertise: searchExpertise,
                taskConfidence: taskConfidence
            }
        });

        setTasks([...tasks, window.location.toString()]);
        let stasks = localStorage.getItem('lrm-survey-tasks') ? JSON.parse(localStorage.getItem('lrm-survey-tasks')) : []
        stasks.push(window.location.toString());
        localStorage.setItem('lrm-survey-tasks', JSON.stringify(stasks));
        //console.log(stasks)
    };

    return (
        <Box display="flex" justifyContent="flex-end">
            <Button variant="outlined" onClick={() => setExpanded(!expanded)} sx={{ mr: 2 }}>
                {expanded ? "Hide all" : "Expand all"}
            </Button>
            <Button variant="outlined"  disabled={relevantVar().length === 0 && irrelevantVar().length === 0} sx={{ mr: 2 }}
                onClick={() => {relevantVar([]); irrelevantVar([]); localStorage.removeItem(query.toLowerCase());}}>
                Clear marking
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
                <ExpertiseRating title={"Knowledge of this author or work"} value={searchExpertise} setValue={setSearchExpertise}/>
                <ExpertiseRating title={"Knowledge of library data in general"} value={bibliographicExpertise} setValue={setBibliographicExpertise}/>
                <ExpertiseRating title={"Confidence in solving the task"} value={taskConfidence} setValue={setTaskConfidence}/>
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
            <Tooltip title={tasks.includes(uri) ? "You have completed this task." : "Not submitted this task yet."} placement={"right"}>
                <CheckCircleOutlineSharpIcon color={tasks.includes(uri) ? "success" : "action"} sx={{fontSize: 40}}/>
            </Tooltip>
        </Box>
    );
}

