import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import screenshots from '../assets/screenshots.png';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import { Link } from 'react-router-dom'
import './Survey.css';
import CheckCircleOutlineSharpIcon from '@mui/icons-material/CheckCircleOutlineSharp';
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const order= ["score", "random", "pagerank"];

const a_questions = [
    ["You are compiling a list of titles by \"Knut Hamsun\" for a personal reading list. The result page shows a selection of what can be found.",
        "?query=Knut+Hamsun&language=norwegian&content=text&subject=surveyitem",
        "Go to the results for a search on \"Knut Hamsun\"", order[Math.floor(Math.random() * (3))]],
    ["You are compiling a list of titles by \"Agatha Christie\" for a personal use. The result page shows a selection of what can be found.",
        "?query=Agatha+Christie&language=english&content=text&subject=surveyitem",
        "Go to the results for a search on \"Agatha Christie\"", order[Math.floor(Math.random() * (3))]],
    ["You are compiling a list of titles by \"Mark Twain\" for a personal reading list. The result page shows a selection of what can be found.",
        "?query=Mark+Twain&language=english&content=text&subject=surveyitem",
        "Go to the results for a search on \"Mark Twain\"", order[Math.floor(Math.random() * (3))]],
    ["You are compiling a list of titles by \"J. R. R. Tolkien\" for a personal reading list. The result page shows a selection of what can be found.",
        "?query=J.R.R.+Tolkien&language=english&content=text&subject=surveyitem",
        "Go to the results for a search on \"J. R. R. Tolkien\"", order[Math.floor(Math.random() * (3))]],
    ["You are compiling a list of titles by \"Cormac McCarthy\" for a personal reading list. The result page shows a selection of what can be found.",
        "?query=Cormac+McCarthy&language=english&content=text&subject=surveyitem",
        "Go to the results for a search on \"Cormac McCarthy\"", order[Math.floor(Math.random() * (3))]],
    ["You are compiling a list of titles by \"J. G. Ballard\" for a personal reading list. The result page shows a selection of what can be found.",
        "?query=J.G.+Ballard&language=english&content=text&subject=surveyitem",
        "Go to the results for a search on \"J. G. Ballard\"", order[Math.floor(Math.random() * (3))]],
    /*["You are compiling a list of titles by \"Ray Bradbury\" for a personal reading list. The result page shows a selection of what is found for this author name.",
        "/search/?query=Ray+Bradbury&language=english&content=text&subject=surveyitem",
        "Go to the results for a search on \"Ray Bradbury\"", "Ray Bradbury"]*/
];
// Author + title questions
const at_questions = [
    ["You want to read the novel \"Mysterier\" by Knut Hamsun and have made a search using title and author's name.",
        "?query=Mysterier+Knut+Hamsun&language=norwegian&content=text",
        "Go to the results for a search on \"Mysterier Knut Hamsun\"",
        order[Math.floor(Math.random() * (3))],
        "Mysterier AND Knut AND Hamsun AND (content: text) AND (language: norwegian)"],
    ["You have been told by a friend to read the story \"Terminal beach\" by J.G. Ballard and have made a search using title and author's name.",
        "?query=Terminal+beach+Ballard&creator=Ballard&content=text",
        "Go to the results for a search on \"Terminal beach Ballard\"",
        order[Math.floor(Math.random() * (3))],
        "Terminal AND Beach AND Ballard AND (content: text) AND (language: english)"],
    ["You want to explore what is available by Mark Twain on the character Tom Sawyer and have made a search using author's name and name of the character.",
        "?query=Tom+Sawyer+Mark+Twain&language=english&content=text",
        "Go to the results for a search on \"Tom Sawyer Mark Twain \"",
        order[Math.floor(Math.random() * (3))],
        "Tom AND Sawyer AND Mark AND Twain AND (content: text) AND (language: english)"],
    ["You want to read \"Lord of the rings\" by J.R.R. Tolkien and have made a search using title and author's name.",
        "?query=Lord+of+the+rings+Tolkien&language=english&content=text",
        "Go to the results for a search on \"Lord of the rings Tolkien \"",
        order[Math.floor(Math.random() * (3))],
        "Lord AND Rings AND Tolkien AND (content: text) AND (language: english)"],
    ["You want to read \"Murder on the links\" by Agatha Christie and have made a search using title and author's name.",
        "?query=Murder+on+the+links+Agatha+Christie&language=english&content=text",
        "Go to the results for a search on \"Murder on the links Agatha Christie\"",
        order[Math.floor(Math.random() * (3))],
        "Murder AND Links AND Agatha AND Christie AND (content: text) AND (language: english)"],
    ["You want to read \"Murder on the Orient Express\" by Agatha Christie and have made a search using title and author's name.",
        "?query=Agatha+Christie+Murder+on+the+Orient+Express&language=english&content=text&name=christie",
        "Go to the results for a search on \"Murder on the Orient Express Agatha Christie\"",
        order[Math.floor(Math.random() * (3))],
        "Murder AND Orient AND Express AND Agatha AND Christie AND (content: text) AND (language: english)"],
    ["You want to read \"All the pretty horses\" by Cormac McCarthy and have made a search using title and author's name.",
        "?query=All+the+pretty+horses+Cormac+McCarthy&language=english&content=text",
        "Go to the results for a search on \"All the pretty horses Cormac McCarthy \"",
        order[Math.floor(Math.random() * (3))],
        "All AND Pretty AND Horses AND Cormac AND McCarthy AND (content: text) AND (language: english)"],
];
const tasks = [
    "Based on your initial impression, mark the results that you find -- most interesting -- in the context of this search. Mark at least one, but feel free to mark more.",
    "Mark the results you find -- most useful -- for identifying what is available for this title. Mark at least one, but feel free to mark more.",
    "Mark results you would include in your list of titles by this author. Mark at least one, but feel free to mark more",
    "Mark results you would include in your list of titles by this author. Mark at least one, but feel free to mark more",
]

function getRandomQuestions(questions, num) {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

const Survey = () => {
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [respondent, setRespondent] = useState('');
    //const base_uri =  (window.location.origin+window.location.pathname).replace("survey", "search");
    //console.log("Base URI = " + base_uri);
    useEffect(() => {
        let existingId = sessionStorage.getItem('respondent');
        let savedQuestions = sessionStorage.getItem('selectedQuestions');

        if (!existingId) {
            existingId = uuidv4();
            sessionStorage.setItem('respondent', existingId);
        }
        setRespondent(existingId);
        if (!savedQuestions) {
            savedQuestions = [...getRandomQuestions(at_questions, 2), ...getRandomQuestions(a_questions, 2)]
            sessionStorage.setItem('selectedQuestions', JSON.stringify(savedQuestions));
        } else {
            savedQuestions = JSON.parse(savedQuestions);
        }

        setSelectedQuestions(savedQuestions);
    }, []);

    return (
        <Paper className={"survey"} sx={{ mx: 10, my: 5 }}>
            <Typography variant="h2" sx={{ mb: 2 }}>Search experience survey</Typography>

            <Typography variant="body1" sx={{ my: 1 }}>We kindly invite you to be part of a survey aimed at improving bibliographic search systems.
               The survey, which should take only 5-15 minutes of your time, involves interacting with a set of search results.
                You&apos;ll be asked to evaluate these results, making judgments and marking them according to specific questions. </Typography>

            <Typography variant="body1"  sx={{ my: 1 }}>You&apos;ll use a streamlined library search interface designed to showcase diverse content.
                If content appears in multiple publications, you can easily view these publications.</Typography>
            <Typography variant="body1" sx={{ my: 1 }}>Please note that the interface is optimized for larger screens, and will not function effectively on mobile phones.
            </Typography>
            <Box sx={{ my: 5 }}>
            <img src={screenshots} alt={"Screenshot of resultlisting and submission dialogue"} style={{ width: '80%'}} align="middle"/>
            </Box>
            <Typography variant="body1"  sx={{ my: 2 }}>Use the &apos;thumbs up&apos; <ThumbUpOutlinedIcon color="action" fontSize="small" style={{ verticalAlign: 'middle' }}/> button to mark relevant results.
                If you need to change your selections, the &apos;cancel&apos; button <CancelOutlinedIcon color="action" fontSize="small" style={{ verticalAlign: 'middle' }}/> and a &apos;clear markings&apos; option at the top of the page are available.
                Once you complete a task, click &apos;Submit&apos; to share your feedback. A brief dialog will prompt you for additional comments before final submission.
            </Typography>
            <Typography variant="body1" sx={{ my: 1 }}>We do not expect any particular knowledge in advance, and if the results are unknown to you, simply make your best guess based on the information that is presented.</Typography>
            <Typography variant="body1" sx={{ mt: 1, mb: 5 }}>The survey is fully anonymous and we do not collect any personal information. The tasks you have performed are temporarily stored in your web browser, but all data is deleted when the tab or the web browser is closed. </Typography>
            {selectedQuestions.map((question, index) => {
                let tasksPerformed = sessionStorage.getItem('lrm-survey-tasks') ? JSON.parse(sessionStorage.getItem('lrm-survey-tasks')) : []
                const query = question[1] + "&sort=" + question[3] + "&respondent=" + respondent + "&taskid=" + (index+1);
                //console.log("Query = " + query);
                return <div key={index}>
                            <Typography variant="h4" >Task {index + 1}
                                <Tooltip title={tasksPerformed.find(el => el.includes(query)) ? "You have submitted this task" : "Task not submitted yet."} placement={"top"}>
                                    <CheckCircleOutlineSharpIcon color={tasksPerformed .find(el => el.includes(query)) ? "success" : "action"} sx={{fontSize: 30}}/>
                                </Tooltip>
                            </Typography>
                            <Typography variant="body1" sx={{ my: 1 }}>{question[0]}<br/>
                                <strong>{tasks[index].split("--")[0] }<u>{tasks[index].split("--")[1]}</u>{tasks[index].split("--")[2]}</strong></Typography>
                            <Typography variant="body1" sx={{ my: 1 }}><Link to={"/search" + question[1] + "&sort=" + question[3] + "&respondent=" + respondent + "&taskid=" + (index+1) + "&task=" + tasks[index] + "&context=" + question[0]}>{question[2]}</Link></Typography>
                        </div>
            }
)}
            {/*<p>The tasks listed above are tailored with specific result sets. If you want to explore searching the system on your own, use this URI <a href={"/search"}>/search</a></p> */}
            <Typography variant="body1" sx={{ mt: 5 }} component={"footer"}>
                <p>Responsible for the survey is Professor Trond Aalberg OsloMet/NTNU (<a href={"mailto:Trond.Aalberg@oslomet.no"}>Trond.Aalberg@oslomet.no</a>).</p>
                A random participant ID is generated when you access this page. This number can be used to refer to your response in case you want to withdraw from the survey at a later time.
                Your participant ID is {respondent}</Typography>
        </Paper>
    );
}

export default Survey;
