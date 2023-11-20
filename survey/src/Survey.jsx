import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp.js";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown.js";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline.js";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import screenshots from './assets/screenshots.png';

const questions = [
    ["You want to read the novel \"På gjengrodde stier\" by Knut Hamsun and have made a search using author and title.",
        "http://dijon.idi.ntnu.no/lrm-search/?query=knut+hamsun+på+gjengrodde+stier&language=norwegian&sort=random",
        "Results for the search on \"Knut Hamsun På gjengrodde stier\"",
        "Knut Hamsun"],
    ["You have been told by a friend to read the story \"Chronopolis\" by J.G. Ballard and have made a search using author and title.",
        "http://dijon.idi.ntnu.no/lrm-search/?query=Ballard+Chronopolis",
        "Results for the search on \"Ballard Chronopolis\"",
        "J.G. Ballard"],
    ["You have been told by a friend to read the story \"Life and death of God\" by J.G. Ballard and have made a search using author and title.",
        "http://dijon.idi.ntnu.no/lrm-search/?query=Ballard+Life+and+death+of+God",
        "Results for the search on \"Ballard Life and death of God\"",
        "J.G. Ballard"],
    ["You want to explore what is available by Mark Twain on the character Tom Sawyer and have made a search using author and name of the character.",
        "http://dijon.idi.ntnu.no/lrm-search/?query=Mark+Twain+Tom+Sawyer",
        "Results for the search on \"Mark Twain Tom Sawyer\"",
        "Mark Twain"],
    ["You want to explore what is available by Agatha Christie on the character Miss Marple and have made a search using author and name of the character.",
        "http://dijon.idi.ntnu.no/lrm-search/?query=Agatha+Christie+Miss+Marple&creator=Christie&sort=random",
        "Results for the search on \"Agatha Christie Miss Marple\"",
        "Agatha Christie"],
    ["You want to read \"Lord of the rings\" by J.R.R. Tolkien and have made a search using author and title.",
        "http://dijon.idi.ntnu.no/lrm-search/?query=Tolkien+Lord+of+the+rings&language=english",
        "Results for the search on \"Tolkien Lord of the rings\"",
        "J.R.R. Tolkien"],
    ["You want to read \"Murder on the links\" by Agatha Christie and have made a search using author and title.",
        "http://dijon.idi.ntnu.no/lrm-search/?query=Agatha+Christie+Murder+on+the+links&sort=random",
        "Results for the search on \"Agatha Christie Murder on the links\"",
        "Agatha Christie"],
    ["You want to read \"Murder on the Orient Express\" by Agatha Christie and have made a search using author and title.",
        "http://dijon.idi.ntnu.no/lrm-search/?query=Agatha+Christie+Murder+on+the+Orient+Express&content=text&name=christie&sort=random",
        "Results for the search on \"Agatha Christie Murder on the Orient Express Agatha Christie\"",
        "Agatha Christie"],
    ["You want to read \"All the pretty horses\" by Cormac McCarthy and have made a search using author and title.",
        "http://dijon.idi.ntnu.no/lrm-search/?query=All+the+pretty+horses+Cormac+McCarthy&language=english&content=text",
        "Results for the search on \"Cormac McCarthy All the pretty horses\"",
        "Cormac McCarthy"],
];
const tasks = [
    "Mark as relevant the result(s) that you most immediately find interesting to inspect.",
    "Mark as relevant the entries that you find to best match the query and mark as non-relevant the entries that you find least match.",
    "Mark as relevant all entries that you think of as works by this author.",
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
        let savedQuestions = sessionStorage.getItem('selectedQuestions');

        if (!existingId) {
            existingId = uuidv4();
            sessionStorage.setItem('respondent', existingId);
        }
        setRespondent(existingId);

        if (!savedQuestions) {
            savedQuestions = getRandomQuestions(questions, 3);
            //sessionStorage.setItem('selectedQuestions', JSON.stringify(savedQuestions));
        } else {
            savedQuestions = JSON.parse(savedQuestions);
        }

        setSelectedQuestions(savedQuestions);
    }, []);

    return (
        <div>
            <h1>Search experience survey</h1>

                <p>We kindly invite you to participate in a task-based survey with the purpose of exploring search results from a bibliographic search system.
                We do not expect any particular knowledge in advance, and you will spend between 5-15 minutes doing this survey. </p>
            <p>In the survey you will be asked to perform specific judgements and mark items in the resultpage.
                Your response is logged when you press submit, but all data is fully anonymous. By participating, you agree that the data will be used in research.
                A random participant ID is generated when you access this page. This number can be used to refer to your response, in case you want to withdraw your response from the survey.
                Responsible for the survey is Professor Trond Aalberg (Trond.Aalberg@oslomet.no).</p>

            <h2>The search system</h2>
            <p>The system used in the experiment is a simplified bibliographic search system. You will be presented with the results of predefined searches. Each entry on the result page represents particular content
                that you may or may not be familiar with. If the same content is available as multiple publications, the list of publications can be expanded using the "Available as: " option.
                On the top of the page is a button that can be used to hide and show all available publications.</p>
            <p>To the left of each entry on the result page, there are two circular buttons with up and down arrows that can be used to
                indicate how you assess entries according to the task given. The up arrow button <ArrowCircleUpIcon color="action" fontSize="small" style={{ verticalAlign: 'middle' }}/> is used to give positive feedback on an entry, the down arrow button <ArrowCircleDownIcon color="action" fontSize="small" style={{ verticalAlign: 'middle' }}/> to give negative feedback.
                After marking, entries with positive feedback are highlighted in green or highlighted with red when negative. Markings of a particular entry can be removed clicking on the cancel button <CancelOutlinedIcon color="action" fontSize="small" style={{ verticalAlign: 'middle' }}/>.
                When you decide to finish a task, click on the "Submit" button to send your feedback. This will show a dialog where you can give some supplemental feedback before pressing Yes to finish the submission. Screenshots of the application and the submit dialogue are shown below.
            </p>
            <img src={screenshots} alt={"Screenshot of resultlisting and submission dialogue"} style={{ width: '80%'}} align="middle"/>
            <p>The tasks to perform are listed below as Task 1-3. The Context describes the motivation for the query, when you click on the Link the resultpage to inspect is retrieved automatically and presented in a different tab.
                The actual assigment in the task is detailed below the link, but will also be displayed on the top of the page you are visiting. </p>

            {selectedQuestions.map((question, index) => (
                <div key={index}>
                    <h2>Task {index + 1}</h2>
                    <p className={"section"}><span className={"prefix"}>Context: </span><span className={"description"}>{question[0]}</span></p>
                    <p className={"section"}><span className={"prefix"}>Link: </span><span className={"description"}><a href={question[1] + "&respondent=" + respondent + "&taskid=" + (index+1) + "&task=Task: " + tasks[index] + "&context=Context: " + question[0]} target={"_blank"} rel="noreferrer">{question[2]}</a></span></p>
                    <p className={"section"}><span className={"prefix"}>Task: </span><span className={"description"}>{tasks[index]}</span></p>
                </div>
            ))}
            <footer>Participant ID: {respondent}</footer>
        </div>
    );
}

export default Survey;
