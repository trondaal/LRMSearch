import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const questions = [
    ["You want to read the novel \"På gjengrodde stier\" by Knut Hamsun and have made a search using title and author name.", "http://dijon.idi.ntnu.no/lrm-search/?query=knut+hamsun+på+gjengrodde+stier&language=norwegian", "Results for the search on \"Knut Hamsun På gjengrodde stier\""],
    ["You have been told by a friend to read the story \"Chronopolis\" by J.G. Ballard and have made a search using title and author name.", "http://dijon.idi.ntnu.no/lrm-search/?query=Chronopolis", "Results for the search on \"Chronopolis\""],
    ["You want to explore what is available by Mark Twain and have made a search using the authors name.", "http://dijon.idi.ntnu.no/lrm-search/?query=mark+twain", "Results for the search om \"Mark Twain\""],
    ["You want to explore what is available by Mark Twain on the character Tom Sawyer and have made a search using the authors name and the name of the character.", "http://dijon.idi.ntnu.no/lrm-search/?query=mark+twain+tom+sawyer", "Results for the search om \"Mark Twain Tom Sawyer\""],
    ["You want to read \"Lord of the rings\" by J.R.R. and have made a search using this title.", "http://dijon.idi.ntnu.no/lrm-search/?query=lord+rings&language=norwegian", "Results for the search on \"Lord of the rings\""],
    ["You want to read \"Murder on the links\" by Agatha Christie and have made a search using this title.", "http://dijon.idi.ntnu.no/lrm-search/?query=Murder+on+the+links", "Results for the search on \"Murder on the links\""],
    ["You want to explore what is available by \"Agatha Christie\" and have made a search using .", "http://dijon.idi.ntnu.no/lrm-search/?query=Agatha+Christie", "Results for the search on \"Agatha Christie\""],
];
const tasks = [
    "Marker as relevant the result item(s) that you most immediately find interesting to inspect. Mark at least one item.",
    "Mark as relevant the items that you find to best match the query and mark as irrelevant the items that you find to have least match. Mark at least one as relevant and one item as irrelevant.",
    "Items in the resultset is intended to show content and if the same content is found in multiple publications, these publications are listed as an expandable list. Mark as relevant the items that you find to represent meaningfull as distinct content, and mark as irrelevant the items that you find to represent the same content as other items.",
]

function getRandomQuestions(questions, num) {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

const Survey = () => {
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [respondent, setRespondent] = useState('');

    useEffect(() => {
        let existingId = localStorage.getItem('respondent');
        let savedQuestions = localStorage.getItem('selectedQuestions');

        if (!existingId) {
            existingId = uuidv4();
            localStorage.setItem('respondent', existingId);
        }
        setRespondent(existingId);

        if (!savedQuestions) {
            savedQuestions = getRandomQuestions(questions, 3);
            localStorage.setItem('selectedQuestions', JSON.stringify(savedQuestions));
        } else {
            savedQuestions = JSON.parse(savedQuestions);
        }

        setSelectedQuestions(savedQuestions);
    }, []);

    return (
        <div>
            <h1>Search experience survey</h1>

                <p>We kindly invite you to participate in a task-based survey with the purpose of exploring search results from a bibliographic search system.
                We do not expect any particular knowledge in advance. In the survey you will be asked to perform specific judgements and mark items in the result, related to selected queries.
                Your response is logged when you press submit, but all data is fully anonymous. By participating, you agree that the data will be used in research.
                A random participant ID is generated when you access this page. This number can be used to refer to your response, in case you want to withdraw your response from the survey.
                Responsible for the survey is Professor Trond Aalberg (Trond.Aalberg@oslomet.no).</p>

            <h2>The search system</h2>
            <p>The system used in the experiment mimics a bibliographic search system. You will be presented with the results of predefined searches. Each item of the result represents particular content
                that you may or may not be familiar with. If the same content is available in multiple publications,the list of publications can be expanded using the "Available as: " option.
                On the top of the page is a button that can be used to hide and show all available publications.</p>
            <p>To the left of each item in the result set, there are two circular buttons with arrows that can be used to
                indicate how you assess items according to the task given. The up arrow is used to give positive feedback on an item, the down arrow to give negative feedback.
                After marking, items given positive feedback are highlighted in green or highlighted with red when negative negative. Your feedback can be reset by clicking on the cancel button. </p>
            <p>The actual tasks to perform are descibed below and the result to inspect is retrieved automatically when using the given links. When you decide to finish a task, click on the "Submit" button to send your feedback. This will show a dialog where you can give some suplemental feedback before pressing Yes to finish the submission.</p>
            {selectedQuestions.map((question, index) => (
                <div key={index}>
                    <h2>Task {index + 1}</h2>
                    <p className={"section"}><span className={"prefix"}>Context: </span><span className={"description"}>{question[0]}</span></p>
                    <p className={"section"}><span className={"prefix"}>Task: </span><span className={"description"}>{tasks[index]}</span></p>
                    <p className={"section"}><span className={"prefix"}>Link: </span><span className={"description"}><a href={question[1] + "&respondent=" + respondent + "&task=" + (index+1)} target={"_blank"} rel="noreferrer">{question[2]}</a></span></p>
                </div>
            ))}
            <footer>Participant ID: {respondent}</footer>
        </div>
    );
}

export default Survey;
