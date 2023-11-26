import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp.js";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown.js";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import screenshots from './assets/screenshots.png';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';


const a_questions = [
    ["You have made a search using the author name \"Knut Hamsun\" and want to learn what is available by this author. The result page shows a selection of results related to this author.",
        "http://dijon.idi.ntnu.no/lrm-search/?query=Knut+Hamsun&language=norwegian&content=text&subject=surveyitem",
        "Results for the search on \"Knut Hamsun\"", "Knut Hamsun"],
    ["You have made a search using the author name \"Agatha Christie\" and want to learn what is available by this author. The result page shows a selection of results related to this author.",
        "http://dijon.idi.ntnu.no/lrm-search/?query=Agatha+Christie&language=english&content=text&subject=surveyitem",
        "Results for the search on \"Agatha Christie\"", "Agatha Christie"],
    ["You have made a search using the author name \"Mark Twain\" and want to learn what is available by this author. The result page shows a selection of results related to this author.",
        "http://dijon.idi.ntnu.no/lrm-search/?query=Mark+Twain&language=english&content=text&subject=surveyitem",
        "Results for the search on \"Mark Twain\"", "Mark Twain"],
    ["You have made a search using the author name \"J.R.R. Tolkien\" and want to learn what is available by this author. The result page shows a selection of results related to this author.",
        "http://dijon.idi.ntnu.no/lrm-search/?query=J.R.R.+Tolkien&language=english&content=text&subject=surveyitem",
        "Results for the search on \"J.R.R. Tolkien\"", "J.R.R. Tolkien"],
    ["You have made a search using the author name \"Cormac McCarthy\" and want to learn what is available by this author. The result page shows a selection of results related to this author.",
        "http://dijon.idi.ntnu.no/lrm-search/?query=Cormac+McCarthy&language=english&content=text&subject=surveyitem",
        "Results for the search on \"Cormac McCarthy\"", "Cormac McCarthy"],
    ["You have made a search using the author name \"J.G. Ballard\" and want to learn what is available by this author. The result page shows a selection of results related to this author.",
        "http://dijon.idi.ntnu.no/lrm-search/?query=J.G.+Ballard&language=english&content=text&subject=surveyitem",
        "Results for the search on \"J.G. Ballard\"", "J.G. Ballard"],
];
// Author + title questions
const at_questions = [
    ["You want to read the novel \"På gjengrodde stier\" by Knut Hamsun and have made a search using author and title.",
        "http://dijon.idi.ntnu.no/lrm-search/?query=knut+hamsun+på+gjengrodde+stier&language=norwegian&sort=random",
        "Results for the search on \"Knut Hamsun På gjengrodde stier\"",
        "Knut Hamsun"],
    ["You have been told by a friend to read the story \"Terminal Beach\" by J.G. Ballard and have made a search using author's name and title.",
        "http://dijon.idi.ntnu.no/lrm-search/?query=Ballard+Terminal+Beach&boolean=or&language=english&sort=random",
        "Results for the search on \"Ballard Terminal Beach\"",
        "J.G. Ballard"],
    ["You have been told by a friend to read the story \"Terminal Beach\" by J.G. Ballard and have made a search using author's name and title.",
        "http://dijon.idi.ntnu.no/lrm-search/?query=Ballard+Terminal+Beach&boolean=or&sort=random&creator=ballard",
        "Results for the search on \"Ballard Terminal Beach\"",
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
    "Based on your initial impression, mark as relevant the result(s) that you find most interesting in the context of this title.--Mark at least one result, but not more than 3.",
    "Inspect the results and mark the results you find most useful for identifying  available for this title.--Mark at least one result, but not more than 3.",
    "Inspect the results and mark the results you find most relevant when exploring this author.--Think in terms of what should be listed first if the results were sorted according to relevance. Mark at least one result, but not more than 5.",
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

        setSelectedQuestions([...getRandomQuestions(at_questions, 2), ...getRandomQuestions(a_questions, 1)]);
    }, []);

    return (
        <div>
            <h1>Search experience survey</h1>

                <p>We kindly invite you to participate in a task-based survey with the purpose of evaluating the results from a bibliographic search.
                Participation requires 5-15 minutes of your time. You will be presented with the results of different searches and asked to perform judgements and mark results. </p>

                <p>A random participant ID is generated when you access this page. This number is presented at the bottom of this page, and can be used to refer to your response in case you want to withdraw your response from the survey.
                Responsible for the survey is Professor Trond Aalberg (Trond.Aalberg@oslomet.no).</p>

            <h2>The search system</h2>
            <p>The system used in the experiment is a simplified library search system. Each result on the list represents particular content.
                If the same content is available in multiple publications, the list of publications can be expanded using expand feature.
                On the top of the page is a button that can be used to hide and show all available publications for all results.</p>
            <p>To the left of each result, there is a thumbs up button <ThumbUpOutlinedIcon color="action" fontSize="small" style={{ verticalAlign: 'middle' }}/> marking results according to the task given.
                Markings can be removed using the cancel button or by the clear markings button on top of the page.
                When you decide to finish a task, click on the "Submit" button to send your feedback. This will show a dialog where you give some supplemental feedback before pressing Yes to finish the submission.
            </p>
            <img src={screenshots} alt={"Screenshot of resultlisting and submission dialogue"} style={{ width: '80%'}} align="middle"/>
            <p>The tasks to perform are listed below with a short description and a link that will display the results to inspect in a separate tab.
               Description of the task will also be displayed on the top of the result page.</p>
            <p>We do not expect any particular knowledge in advance, and if the results are unknown, simply make your best guess based on the information that is presented to you.
                At least one result has to be marked before submitting, but it is up to you to decide how many you want to mark.
            </p>



            {selectedQuestions.map((question, index) => (
                <div key={index}>
                    <h2>Task {index + 1}</h2>
                    <p>{question[0]}<br/>
                    <strong>{tasks[index].split("--").map((text) => (<div key={text}>{text}</div>))}</strong></p>
                    <p><a href={question[1] + "&respondent=" + respondent + "&taskid=" + (index+1) + "&task=" + tasks[index] + "&context=" + question[0]} target={"_blank"} rel="noreferrer">{question[2]}</a></p>
                </div>
))}
            {/*<p>The tasks listed above are tailored with specific result sets. If you want to explore searching the system on your own, use this URI <a href={"http://dijon.idi.ntnu.no/lrm-search"}>http://dijon.idi.ntnu.no/lrm-search</a></p> */}
            <footer>Participant ID: {respondent}</footer>
        </div>
    );
}

export default Survey;
