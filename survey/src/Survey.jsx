import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp.js";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown.js";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import screenshots from './assets/screenshots.png';


const a_questions = [
    ["You have made a search using the author name \"Knut Hamsun\" and want to learn what is available by this author.",
        "http://dijon.idi.ntnu.no/lrm-search/?query=Knut+Hamsun&language=norwegian&content=text&subject=surveyitem",
        "Results for the search on \"Knut Hamsun\"", "Knut Hamsun"],
    ["You have made a search using the author name \"Agatha Christie\" and want to learn what is available by this author.",
        "http://dijon.idi.ntnu.no/lrm-search/?query=Agatha+Christie&language=english&content=text&subject=surveyitem",
        "Results for the search on \"Agatha Christie\"", "Agatha Christie"],
    ["You have made a search using the author name \"Mark Twain\" and want to learn what is available by this author.",
        "http://dijon.idi.ntnu.no/lrm-search/?query=Mark+Twain&language=english&content=text&subject=surveyitem",
        "Results for the search on \"Mark Twain\"", "Mark Twain"],
    ["You have made a search using the author name \"J.R.R. Tolkien\" and want to learn what is available by this author.",
        "http://dijon.idi.ntnu.no/lrm-search/?query=J.R.R.+Tolkie&language=english&content=text&subject=surveyitem",
        "Results for the search on \"J.R.R. Tolkien\"", "J.R.R. Tolkien"],
    /*["You have made a search using the author name \"Cormac McCarthy\" and want to learn what is available by this author.",
        "http://dijon.idi.ntnu.no/lrm-search/?query=Cormac+McCarthy&language=english&content=text&subject=surveyitem",
        "Results for the search on \"Cormac McCarthy\"", "Cormac McCarthy"],*/
    ["You have made a search using the author name \"J.G. Ballard\" and want to learn what is available by this author.",
        "http://dijon.idi.ntnu.no/lrm-search/?query=J.G.+Ballard&language=english&content=text&subject=surveyitem",
        "Results for the search on \"J.G. Ballard\"", "J.G. Ballard"],
];
// Author + title questions
const at_questions = [
    ["You want to read the novel \"På gjengrodde stier\" by Knut Hamsun and have made a search using author and title.",
        "http://dijon.idi.ntnu.no/lrm-search/?query=knut+hamsun+på+gjengrodde+stier&language=norwegian&sort=random",
        "Results for the search on \"Knut Hamsun På gjengrodde stier\"",
        "Knut Hamsun"],
    ["You have been told by a friend to read the story \"Chronopolis\" by J.G. Ballard and have made a search using author's name and title.",
        "http://dijon.idi.ntnu.no/lrm-search/?query=Ballard+Chronopolis",
        "Results for the search on \"Ballard Chronopolis\"",
        "J.G. Ballard"],
    ["You have been told by a friend to read the story \"Life and death of God\" by J.G. Ballard and have made a search using author's name and title.",
        "http://dijon.idi.ntnu.no/lrm-search/?query=Ballard+Life+and+death+of+God",
        "Results for the search on \"Ballard Life and death of God\"",
        "J.G. Ballard"],
    ["You want to explore what is available by Mark Twain on the character Tom Sawyer and have made a search using author's name and name of the character.",
        "http://dijon.idi.ntnu.no/lrm-search/?query=Mark+Twain+Tom+Sawyer",
        "Results for the search on \"Mark Twain Tom Sawyer\"",
        "Mark Twain"],
    /*["You want to explore what is available by Agatha Christie on the character Miss Marple and have made a search using author's name and name of the character.",
        "http://dijon.idi.ntnu.no/lrm-search/?query=Agatha+Christie+Miss+Marple&creator=Christie&sort=random",
        "Results for the search on \"Agatha Christie Miss Marple\"",
        "Agatha Christie"],*/
    ["You want to read \"Lord of the rings\" by J.R.R. Tolkien and have made a search using author's name and title.",
        "http://dijon.idi.ntnu.no/lrm-search/?query=Tolkien+Lord+of+the+rings&language=english",
        "Results for the search on \"Tolkien Lord of the rings\"",
        "J.R.R. Tolkien"],
    ["You want to read \"Murder on the links\" by Agatha Christie and have made a search using author's name and title.",
        "http://dijon.idi.ntnu.no/lrm-search/?query=Agatha+Christie+Murder+on+the+links&sort=random",
        "Results for the search on \"Agatha Christie Murder on the links\"",
        "Agatha Christie"],
    ["You want to read \"Murder on the Orient Express\" by Agatha Christie and have made a search using author's name and title.",
        "http://dijon.idi.ntnu.no/lrm-search/?query=Agatha+Christie+Murder+on+the+Orient+Express&content=text&name=christie&sort=random",
        "Results for the search on \"Agatha Christie Murder on the Orient Express Agatha Christie\"",
        "Agatha Christie"],
    ["You want to read \"All the pretty horses\" by Cormac McCarthy and have made a search using author's name and title.",
        "http://dijon.idi.ntnu.no/lrm-search/?query=All+the+pretty+horses+Cormac+McCarthy&language=english&content=text",
        "Results for the search on \"Cormac McCarthy All the pretty horses\"",
        "Cormac McCarthy"],
];
const tasks = [
    "Mark as positive (green) the results that you find to be most relevant for this search.",
    "Mark as positive (green) the results that you find to to be most relevant for this search, and mark as negative (red) the results that you find have lesser relevance.",
    "Mark as positive (green) the results that you find to be most relevant for exploring what is available by this author.",
    "Mark as positive (green) the results that you identify as distinct works by this author.",
]

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

        setSelectedQuestions([...getRandomQuestions(at_questions, 2), ...getRandomQuestions(a_questions, 2)]);
    }, []);

    return (
        <div>
            <h1>Search experience survey</h1>

                <p>We kindly invite you to participate in a task-based survey with the purpose of evaluating the presentation of results in bibliographic search systems.
                Participation requires 5-15 minutes of your time. </p>
            <p>You will be presented with the results of different searches and asked to perform judgements and mark results. We do not expect any particular knowledge in advance, and if the results are unknown, simply make your best guess based on the information that is presented to you.</p>

                <p>A random participant ID is generated when you access this page. This number is presented at the bottom of this page, and can be used to refer to your response in case you want to withdraw your response from the survey.
                Responsible for the survey is Professor Trond Aalberg (Trond.Aalberg@oslomet.no).</p>

            <h2>The search system</h2>
            <p>The system used in the experiment is a simplified bibliographic search system. Each entry on the result page represents particular content
                that you may or may not be familiar with. If the same content is available as multiple publications, the list of publications can be expanded using the "<PlayArrowIcon color="action" fontSize="small" style={{ verticalAlign: 'middle' }}/># publications available" option.
                On the top of the page is a button that can be used to hide and show all available publications for all results.</p>
            <p>To the left of each result, there are two circular buttons with up and down arrows that can be used to
                indicate how you assess the result according to the task given. The up arrow button <ArrowCircleUpIcon color="action" fontSize="small" style={{ verticalAlign: 'middle' }}/> is used to give positive feedback to the result item, the down arrow button <ArrowCircleDownIcon color="action" fontSize="small" style={{ verticalAlign: 'middle' }}/> to give negative feedback.
                After marking, entries with positive feedback are highlighted in green or highlighted with red when negative. Markings of a particular entry can be removed by clicking on the cancel button <CancelOutlinedIcon color="action" fontSize="small" style={{ verticalAlign: 'middle' }}/>.
                When you decide to finish a task, click on the "Submit" button to send your feedback. This will show a dialog where you can give some supplemental feedback before pressing Yes to finish the submission.
            </p>
            <img src={screenshots} alt={"Screenshot of resultlisting and submission dialogue"} style={{ width: '80%'}} align="middle"/>
            <p>The tasks to perform are listed below as Task 1-3. The Context describes the motivation for the query, and the the actual assignment is detailed in the Task. When you click on the Link the resultpage to inspect is retrieved automatically and presented in a different tab.
               Context and task information will also be displayed on the top of the page you are visiting. </p>

            {selectedQuestions.map((question, index) => (
                <div key={index}>
                    <h2>Task {index + 1}</h2>
                    <p>{question[0]}<br/>
                    <strong>{tasks[index].split("--").map((text) => (<div key={text}>{text}</div>))}</strong></p>
                    <p><a href={question[1] + "&respondent=" + respondent + "&taskid=" + (index+1) + "&task=Task: " + tasks[index] + "&context=Context: " + question[0]} target={"_blank"} rel="noreferrer">{question[2]}</a></p>
                </div>
            ))}

            <footer>Participant ID: {respondent}</footer>
        </div>
    );
}

export default Survey;
