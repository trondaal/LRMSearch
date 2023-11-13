import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const questions = [
    ["You want to read the novel \"På gjengrodde stier\" by Knut Hamsun and have made a search using title and author name", "http://dijon.idi.ntnu.no/lrm-search/?query=knut+hamsun+på+gjengrodde+stier&language=norwegian", "Results for the search om \"Knut Hamsun På gjengrodde stier\""],
    ["You have been told by a friend to read the story \"Chronopolis\" by J.G. Ballard and have made a search using title and author name", "http://dijon.idi.ntnu.no/lrm-search/?query=knut+hamsun+på+gjengrodde+stier&language=norwegian", "Results for the search om \"Knut Hamsun På gjengrodde stier\""],
    ["You want to explore what is available by Mark Twain and have made a search using the authors name", "http://dijon.idi.ntnu.no/lrm-search/?query=knut+hamsun+på+gjengrodde+stier&language=norwegian", "Results for the search om \"Knut Hamsun På gjengrodde stier\""],
    ["You want to read \"Lord of the Rings\" by J.R.R. and have made a search using title and authors name", "http://dijon.idi.ntnu.no/lrm-search/?query=knut+hamsun+på+gjengrodde+stier&language=norwegian", "Results for the search om \"Knut Hamsun På gjengrodde stier\""],
    ["You have searched for \"Orient Express\"", "http://dijon.idi.ntnu.no/lrm-search/?query=knut+hamsun+på+gjengrodde+stier&language=norwegian", "Results for the search om \"Knut Hamsun På gjengrodde stier\""],
    ["You want to explore what is available by \"Elena Ferrante\"", "http://dijon.idi.ntnu.no/lrm-search/?query=elena+ferrante&language=norwegian", "Results for the search om \"Elena Ferrante\""],
];
const tasks = [
    "Marker as relevant the item(s) that you most immediately find interesting to inspect. Mark at least one item.",
    "Mark as relevant the items that you find to best match the query and mark as irrelevant the items that you find to have least match. Mark at least one as relevant and one item as irrelevant.",
    "Items in the resultset is intended to show content and if the same content is found in multiple publications, these publications are listed as an expandable list. Mark as relevant the items that you find to represent meaningfull as distinct content, and mark as irrelevant the items that you find to represent the same content as other items.",
]

function getRandomQuestions(questions, num) {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

const Survey = () => {
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [participantId, setParticipantId] = useState('');

    useEffect(() => {
        let existingId = localStorage.getItem('participantId');
        let savedQuestions = localStorage.getItem('selectedQuestions');

        if (!existingId) {
            existingId = uuidv4();
            localStorage.setItem('participantId', existingId);
        }
        setParticipantId(existingId);

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
            <h1>LRM search experience survey</h1>

            <p>We kindly invite you to participate in a task-based survey with the purpose of exploring various
                aspects of presenting search results from a library system. We do not expect any particular knowledge in advance. In the survey you will be asked
                to perform specific judgements and tasks related to specific queries. Your response is logged when you press submit. All data is fully anonymous.
                A random participant ID is generated when you access this page. This number can be used to refer to your response, in case you want to withdraw from the survey.</p>

            <h2>The prototype search system</h2>
            <p>The search system all tasks relates to, mimics a library search system where each entry in the search result represents a grouping based on
                the content of publications. For each task, you will get a predefined query and result listing (using a predefined link). Each entry can be expanded to
                what items are available for this content using the "Available as: " option. On the top of the page is a button that can be used to
                hide and show all available items.</p>
            <p>To the left of the display, under the icons indicating content type, there are two circular buttons with arrows that can be used to
                indicate how you assess items according to the task given. The up arrow is used to give positive feedback on an item, the down arrow to give negative feedback.
                Relevant items are marked with green for positive and red for negative. Your feedback can be reset by clicking on the cancel button. </p>
            <p>When you have completed the task, click on the "Submit" button to send your feedback. This will show a dialog where you have to rate your own expertise.</p>
            {selectedQuestions.map((question, index) => (
                <div key={index}>
                    <h2>Task {index + 1}</h2>
                    <p className={"section"}><span className={"prefix"}>Context: </span><span className={"description"}>{question[0]}</span></p>
                    <p className={"section"}><span className={"prefix"}>Task: </span><span className={"description"}>{tasks[index]}</span></p>
                    <p className={"section"}><span className={"prefix"}>Link: </span><span className={"description"}><a href={question[1] + "&respondent=" + participantId} target={"_blank"} rel="noreferrer">{question[2]}</a></span></p>
                </div>
            ))}
            <h4>Participant ID: {participantId}</h4>
        </div>
    );
}

export default Survey;
