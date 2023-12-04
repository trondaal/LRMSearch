import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp.js";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown.js";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import screenshots from './assets/screenshots.png';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';


const a_questions = [
    ["You are compiling a list of titles by \"Knut Hamsun\" for a personal reading list. The result page shows a selection of what is found for this author name.",
        "http://dijon.idi.ntnu.no/lrm-search/?query=Knut+Hamsun&language=norwegian&content=text&subject=surveyitem",
        "Go to the results for a search on \"Knut Hamsun\"", "Knut Hamsun"],
    ["You are compiling a list of titles by \"Agatha Christie\" for a personal use. The result page shows a selection of what is found for this author name.",
        "http://dijon.idi.ntnu.no/lrm-search/?query=Agatha+Christie&language=english&content=text&subject=surveyitem",
        "Go to the results for a search on \"Agatha Christie\"", "Agatha Christie"],
    ["You are compiling a list of titles by \"Mark Twain\" for a personal reading list. The result page shows a selection of what is found for this author name.",
        "http://dijon.idi.ntnu.no/lrm-search/?query=Mark+Twain&language=english&content=text&subject=surveyitem",
        "Go to the results for a search on \"Mark Twain\"", "Mark Twain"],
    ["You are compiling a list of titles by \"J. R. R. Tolkien\" for a personal reading list. The result page shows a selection of what is found for this author name.",
        "http://dijon.idi.ntnu.no/lrm-search/?query=J. R.R.+Tolkien&language=english&content=text&subject=surveyitem",
        "Go to the results for a search on \"J. R. R. Tolkien\"", "J.R.R. Tolkien"],
    ["You are compiling a list of titles by \"Cormac McCarthy\" for a personal reading list. The result page shows a selection of what is found for this author name.",
        "http://dijon.idi.ntnu.no/lrm-search/?query=Cormac+McCarthy&language=english&content=text&subject=surveyitem",
        "Go to the results for a search on \"Cormac McCarthy\"", "Cormac McCarthy"],
    ["You are compiling a list of titles by \"J. G. Ballard\" for a personal reading list. The result page shows a selection of what is found for this author name.",
        "http://dijon.idi.ntnu.no/lrm-search/?query=J.G.+Ballard&language=english&content=text&subject=surveyitem",
        "Go to the results for a search on \"J. G. Ballard\"", "J.G. Ballard"],
];
// Author + title questions
const at_questions = [
    ["You want to read the novel \"På gjengrodde stier\" by Knut Hamsun and have made a search using title and author's name.",
        "http://dijon.idi.ntnu.no/lrm-search/?query=Mysterier+Knut+Hamsun&language=norwegian&content=text",
        "Go to the results for a search on \"Mysterier Knut Hamsun\"",
        "Knut Hamsun"],
    ["You have been told by a friend to read the story \"Terminal Beach\" by J.G. Ballard and have made a search using title and author's name.",
        "http://dijon.idi.ntnu.no/lrm-search/?query=Terminal+beach+Ballard&creator=Ballard&content=text",
        "Go to the results for a search on \"Terminal Beach Ballard\"",
        "J.G. Ballard"],
    ["You want to explore what is available by Mark Twain on the character Tom Sawyer and have made a search using author's name and name of the character.",
        "http://dijon.idi.ntnu.no/lrm-search/?query=Tom+Sawyer+Mark+Twain&language=english&content=text",
        "Go to the results for a search on \"Tom Sawyer Mark Twain \"",
        "Mark Twain"],
    ["You want to read \"Lord of the rings\" by J.R.R. Tolkien and have made a search using title and author's name.",
        "http://dijon.idi.ntnu.no/lrm-search/?query=Lord+of+the+rings+Tolkien&language=english&content=text",
        "Go to the results for a search on \"Lord of the rings Tolkien \"",
        "J.R.R. Tolkien"],
    ["You want to read \"Murder on the links\" by Agatha Christie and have made a search using title and author's name.",
        "http://dijon.idi.ntnu.no/lrm-search/?query=Murder+on+the+links+Agatha+Christie&language=english&content=text",
        "Go to the results for a search on \"Murder on the links Agatha Christie\"",
        "Agatha Christie"],
    ["You want to read \"Murder on the Orient Express\" by Agatha Christie and have made a search using title and author's name.",
        "http://dijon.idi.ntnu.no/lrm-search/?query=Agatha+Christie+Murder+on+the+Orient+Express&language=english&content=text&name=christie",
        "Go to the results for a search on \"Murder on the Orient Express Agatha Christie\"",
        "Agatha Christie"],
    ["You want to read \"All the pretty horses\" by Cormac McCarthy and have made a search using title and author's name.",
        "http://dijon.idi.ntnu.no/lrm-search/?query=All+the+pretty+horses+Cormac+McCarthy&language=english&content=text",
        "Go to the results for a search on \"All the pretty horses Cormac McCarthy \"",
        "Cormac McCarthy"],
];
const tasks = [
    "Based on your initial impression, mark the results that you find -- most interesting -- in the context of this search. Mark at least one, but feel free to mark more.",
    "Mark the results you find -- most useful -- for identifying what is available for this title. Mark at least one, but feel free to mark more.",
    "Mark results you would include in your list of titles by this author. Mark at least one, but feel free to mark more",
]

const order= ["score", "random", "pagerank"];

function getRandomQuestions(questions, num) {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

const Survey = () => {
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [respondent, setRespondent] = useState('');

    useEffect(() => {
        let existingId = sessionStorage.getItem('respondent');
        if (!existingId) {
            existingId = uuidv4();
            sessionStorage.setItem('respondent', existingId);
        }
        setRespondent(existingId);

        setSelectedQuestions([...getRandomQuestions(at_questions, 2), ...getRandomQuestions(a_questions, 1)]);
    }, []);

    return (
        <div>
            <h1>Search experience survey</h1>

            <p>We kindly invite you to be part of an innovative survey aimed at enhancing bibliographic search systems.
               The survey, which should take only 5-15 minutes of your time, involves interacting with a set of search results.
                You'll be asked to evaluate these results, making judgments and marking them according to specific questions. </p>

            <p>You'll use a streamlined library search interface designed to showcase diverse content.
                If content appears in multiple publications, you can easily view these publications.</p>
            <p>Please note that the interface is optimized for larger screens, and may not function effectively on mobile phones.
            </p>
            <p>Use the 'thumbs up' <ThumbUpOutlinedIcon color="action" fontSize="small" style={{ verticalAlign: 'middle' }}/> button to mark relevant results.
                If you need to change your selections, the 'cancel' button and a 'clear markings' option at the top of the page are available.
                Once you complete a task, click 'Submit' to share your feedback. A brief dialog will prompt you for additional comments before final submission.
            </p>
            <img src={screenshots} alt={"Screenshot of resultlisting and submission dialogue"} style={{ width: '80%'}} align="middle"/>
            <p>We do not expect any particular knowledge in advance, and if the results are unknown, simply make your best guess based on the information that is presented to you. Mark at least one for each task, but feel free to mark more if appropriate for the task.</p>

            {selectedQuestions.map((question, index) => (
                <div key={index}>
                    <h2>Task {index + 1}</h2>
                    <p>{question[0]}<br/>
                    <strong>{tasks[index].split("--")[0] }<u>{tasks[index].split("--")[1]}</u>{tasks[index].split("--")[2]}</strong></p>
                    <p><a href={question[1] + "&sort=" + order[Math.floor(Math.random() * (3))] + "&respondent=" + respondent + "&taskid=" + (index+1) + "&task=" + tasks[index] + "&context=" + question[0]} target={"_blank"} rel="noreferrer">{question[2]}</a></p>
                </div>
))}
            {/*<p>The tasks listed above are tailored with specific result sets. If you want to explore searching the system on your own, use this URI <a href={"http://dijon.idi.ntnu.no/lrm-search"}>http://dijon.idi.ntnu.no/lrm-search</a></p> */}
            <footer>Responsible for the survey is Professor Trond Aalberg OsloMet/NTNU (<a href={"mailto:Trond.Aalberg@oslomet.no"}>Trond.Aalberg@oslomet.no</a>).<br/>
                A random participant ID is generated when you access this page. This number can be used to refer to your response in case you want to withdraw your response from the survey.
Your participant ID is {respondent}</footer>
        </div>
    );
}

export default Survey;
