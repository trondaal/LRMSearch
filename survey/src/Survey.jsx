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
    ["You have made a search using the author name \"Knut Hamsun\" and want to learn what is available by this author. The result page shows a selection.",
        "http://dijon.idi.ntnu.no/lrm-search/?query=Knut+Hamsun&language=norwegian&content=text&subject=surveyitem&ranking=negative",
        "Go to the results for a search on \"Knut Hamsun\"", "Knut Hamsun"],
    ["You have made a search using the author name \"Agatha Christie\" and want to learn what is available by this author. The result page shows a selection.",
        "http://dijon.idi.ntnu.no/lrm-search/?query=Agatha+Christie&language=english&content=text&subject=surveyitem&ranking=negative",
        "Go to the results for a search on \"Agatha Christie\"", "Agatha Christie"],
    ["You have made a search using the author name \"Mark Twain\" and want to learn what is available by this author. The result page shows a selection.",
        "http://dijon.idi.ntnu.no/lrm-search/?query=Mark+Twain&language=english&content=text&subject=surveyitem&ranking=negative",
        "Go to the results for a search on \"Mark Twain\"", "Mark Twain"],
    ["You have made a search using the author name \"J.R.R. Tolkien\" and want to learn what is available by this author. The result page shows a selection.",
        "http://dijon.idi.ntnu.no/lrm-search/?query=J.R.R.+Tolkien&language=english&content=text&subject=surveyitem&ranking=negative",
        "Go to the results for a search on \"J.R.R. Tolkien\"", "J.R.R. Tolkien"],
    /*["You have made a search using the author name \"Cormac McCarthy\" and want to learn what is available by this author. The result page shows a selection.",
        "http://dijon.idi.ntnu.no/lrm-search/?query=Cormac+McCarthy&language=english&content=text&subject=surveyitem&ranking=negative",
        "Go to the results for a search on \"Cormac McCarthy\"", "Cormac McCarthy"],*/
    ["You have made a search using the author name \"J.G. Ballard\" and want to learn what is available by this author. The result page shows a selection.",
        "http://dijon.idi.ntnu.no/lrm-search/?query=J.G.+Ballard&language=english&content=text&subject=surveyitem&ranking=negative",
        "Go to the results for a search on \"J.G. Ballard\"", "J.G. Ballard"],
];
// Author + title questions
const at_questions = [
    ["You want to read the novel \"På gjengrodde stier\" by Knut Hamsun and have made a search using title and author's name.",
        "http://dijon.idi.ntnu.no/lrm-search/?query=Mysterier+Knut+Hamsun&language=norwegian",
        "Go to the results for a search on \"Mysterier Knut Hamsun\"",
        "Knut Hamsun"],
    ["You have been told by a friend to read the story \"Terminal Beach\" by J.G. Ballard and have made a search using title and author's name.",
        "http://dijon.idi.ntnu.no/lrm-search/?query=Terminal+beach+Ballard&creator=Ballard",
        "Go to the results for a search on \"Terminal Beach Ballard\"",
        "J.G. Ballard"],
    ["You want to explore what is available by Mark Twain on the character Tom Sawyer and have made a search using author's name and name of the character.",
        "http://dijon.idi.ntnu.no/lrm-search/?query=Tom+Sawyer+Mark+Twain&language=english&content=text",
        "Go to the results for a search on \"Tom Sawyer Mark Twain \"",
        "Mark Twain"],
    /*["You want to explore what is available by Agatha Christie on the character Miss Marple and have made a search using author's name and name of the character.",
        "http://dijon.idi.ntnu.no/lrm-search/?query=Agatha+Christie+Miss+Marple&creator=Christie&sort=random",
        "Results for the search on \"Agatha Christie Miss Marple\"",
        "Agatha Christie"],*/
    ["You want to read \"Lord of the rings\" by J.R.R. Tolkien and have made a search using title and author's name.",
        "http://dijon.idi.ntnu.no/lrm-search/?query=Lord+of+the+rings+Tolkien&language=english",
        "Go to the results for a search on \"Lord of the rings Tolkien \"",
        "J.R.R. Tolkien"],
    ["You want to read \"Murder on the links\" by Agatha Christie and have made a search using title and author's name.",
        "http://dijon.idi.ntnu.no/lrm-search/?query=Murder+on+the+links+Agatha+Christie",
        "Go to the results for a search on \"Murder on the links Agatha Christie\"",
        "Agatha Christie"],
    ["You want to read \"Murder on the Orient Express\" by Agatha Christie and have made a search using title and author's name.",
        "http://dijon.idi.ntnu.no/lrm-search/?query=Agatha+Christie+Murder+on+the+Orient+Express&content=text&name=christie",
        "Go to the results for a search on \"Murder on the Orient Express Agatha Christie\"",
        "Agatha Christie"],
    ["You want to read \"All the pretty horses\" by Cormac McCarthy and have made a search using title and author's name.",
        "http://dijon.idi.ntnu.no/lrm-search/?query=All+the+pretty+horses+Cormac+McCarthy&language=english&content=text",
        "Go to the results for a search on \"All the pretty horses Cormac McCarthy \"",
        "Cormac McCarthy"],
];
const tasks = [
    "Based on your initial impression, mark the results that you find -- most interesting -- in the context of this search.",
    "Mark the results you find -- most useful -- for identifying what is available for this title.",
    "Mark the results you find -- less relevant -- in a listing of works by this author.",
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

            <p>We kindly invite you to participate in a task-based survey with the purpose of evaluating the results from a bibliographic search.
            Participation requires 5-15 minutes of your time. You will be presented with the results of different searches and asked to perform judgements and mark results. </p>

            <p>The system used is a simplified library search system where each result represents particular content.
                If the same content is available in multiple publications, the list of publications can be expanded. The user interface is unfortunately not suitable for small screens such as mobile phones.</p>
            <p>A thumbs up button <ThumbUpOutlinedIcon color="action" fontSize="small" style={{ verticalAlign: 'middle' }}/> is used for positive marking of results according to the task given. For some tasks you will be asked to mark results with negative feedback using a thumbs down button <ThumbDownOutlinedIcon color="action" fontSize="small" style={{ verticalAlign: 'middle' }}/>.
                Markings can be removed using the cancel button or by the clear markings button.
                Click on the "Submit" button to send your feedback for each task. This will show a dialog where you have to give some supplemental feedback before pressing Yes to finish.
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
