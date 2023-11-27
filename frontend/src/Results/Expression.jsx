import React from 'react';
import Typography from "@mui/material/Typography";
import IconTypes from "./IconTypes";
import "./ResultList.css";
import {groupBy} from "lodash";
import Manifestation, {manifestationStatement, PublicationData, ManifestationTitle, ContentsNote} from "./Manifestation";
import {useRecoilState} from 'recoil';
import {showUriState, selectedState} from "../state/state";
import "./ResultList.css";
import RankingButtons from "./RankingButtons.jsx";
import Highlighter from "react-highlight-words";
import {useState, useEffect, useRef} from 'react';
import Agents from "./Agents.jsx";
import Related, {PartOf} from "./Related.jsx";
import PropTypes from "prop-types";
import ExpressionTitle from "./ExpressionTitle.jsx";

export function renameRole(role, language){
    if (role.includes('translation')){
        return language[0].label + " translation of"
    }else{
        return capitalize(role.replace(/is |has | work| expression/g, ""));
    }
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

Expression.propTypes = {
    expression: PropTypes.object,
    terms: PropTypes.array,
    defaultExpanded: PropTypes.bool,
    checkboxes: PropTypes.bool,
    score: PropTypes.number
};

function isEmpty(str) {
    return (!str || str.length === 0 );
}

function relevantClass(ranking){
    //Check if an entry is marked as relevant or not
    if (ranking === 1){
        return "relevant";
    }else if (ranking === -1){
        return "irrelevant";
    }else{
        return "";
    }
}

/*function expressionTitle(expression) {
    const titles = [];
    if (expression.form !== "part" && expression.manifestations.length === 1){
        titles.push(manifestationStatement(expression.manifestations[0]));
        //console.log(manifestationStatement(expression.manifestations[0]));
    }
    if (!isEmpty(expression.titlepreferred)){
        titles.push(expression.titlepreferred);
    }else{
        if (!isEmpty(expression.title)) titles.push(expression.title);
    }
    return titles[0];
}*/

export default function Expression({expression, defaultExpanded, terms, checkboxes, score}){
    const [showUri] = useRecoilState(showUriState);
    //const [selected, setSelectedState] = useRecoilState(selectedState);
    //const {uri, manifestations} = expression;
    const [expanded, setExpanded] = useState(defaultExpanded || false);

    /*const detailsRef = useRef(null);

    useEffect(() => {
        setExpanded(expanded);
        detailsRef.current.addEventListener('toggle', handleToggle);
        return () => {
           detailsRef.current.removeEventListener('toggle', handleToggle);
        };
    }, []);*/

    /*const handleToggle = (event) => {
        console.log('Clicked!');
    };*/



    //const language = expression.language.map(l => l.label);
    const content = expression.content.map(c => c.label);
    content.sort();
    content.reverse();
    //const workform = expression.work[0].form;




    const ExpressionDetails = () => {
        if (expression.manifestations.length === 1){
            //Dislay expression and manifestation details in one line
            if (expression.form === "part"){
                // This is a part and part of is indicated with a prefix to title
                return <>
                    <div className={"expressionHeader"}>
                        <div className={"expressionHeaderTitle"}>
                            <ExpressionTitle expression={expression} terms={terms}/>
                            <Agents expression={expression} terms={terms}/>
                            <Related expression={expression}/>
                            <PartOf expression={expression}/>
                            <ManifestationTitle terms={terms} manifestation={expression.manifestations[0]} prefix={"In: "}/>
                            <PublicationData manifestation={expression.manifestations[0]}/>
                            {!(expression.manifestations[0].contentsnote === null) && <ContentsNote contents={expression.manifestations[0].contentsnote} terms={terms}/>}
                            {showUri && <Typography component="div" align="left" variant="eroles">{expression.uri + " : " + score + " : " + expression.pagerank}</Typography>}
                        </div>
                    </div>
                </>
            }else{
                return <>
                    <div className={"expressionHeader"}>
                        <div className={"expressionHeaderTitle"}>
                            <ExpressionTitle expression={expression} terms={terms}/>
                            <Agents expression={expression} terms={terms}/>
                            <Related expression={expression}/>
                            <PartOf expression={expression}/>
                            <PublicationData manifestation={expression.manifestations[0]}/>
                            {!(expression.contentsnote === null) && <ContentsNote contents={expression.contentsnote} terms={terms}/>}
                            {showUri && <Typography component="div" align="left" variant="eroles">{expression.uri + " : " + score + " : " + expression.pagerank}</Typography>}
                        </div>
                    </div>
                </>
            }
        }
        if (expression.manifestations.length > 1){
        return <>
            <div className={"expressionHeader"}>
                <div className={"expressionHeaderTitle"}>
                    <ExpressionTitle expression={expression} terms={terms}/>
                    <Agents expression={expression} terms={terms}/>
                    {!(expression.contentsnote === null) && <ContentsNote contents={expression.contentsnote}  terms={terms}/>}
                    <Related expression={expression}/>
                    <PartOf expression={expression}/>
                    {showUri && <Typography component="div" align="left" variant="eroles">{expression.uri + " : " + score + " : " + expression.pagerank}</Typography>}
                </div>
            </div>
            <div className={"expressionManifestationListing"}>
                    <details open={defaultExpanded}>
                        <summary>{expression.manifestations.length} publications available</summary>
                        <ul className={"manifestationlist"}>
                            {expression && expression.manifestations.map(m => (<Manifestation manifestation={m} form= {expression.form} key={m.uri} checkboxes={checkboxes} contentsDisplayed={expression.contents === null} terms={terms}/>))}
                        </ul>
                    </details>
            </div>
        </>
        }else if (expression.manifestations.length === 1 && expression.form === "standalone"){
            return <>
                <div className={"expressionHeader"}>
                    <div className={"expressionHeaderTitle"}>
                        <ExpressionTitle expression={expression} terms={terms}/>
                        <Agents expression={expression} terms={terms}/>
                        <PublicationData manifestation={expression.manifestations[0]}/>
                        {!(expression.contentsnote === null) && <ContentsNote contents={expression.contentsnote}  terms={terms}/>}
                        <Related expression={expression}/>
                        <PartOf expression={expression}/>
                        {showUri && <Typography component="div" align="left" variant="eroles">{expression.uri + " : " + score + " : " + expression.pagerank}</Typography>}
                    </div>
                </div>
            </>
        }else if (expression.manifestations.length === 1 && expression.form === "part"){
            return <>
                <div className={"expressionHeader"}>
                    <div className={"expressionHeaderTitle"}>
                        <ExpressionTitle expression={expression} terms={terms}/>
                        <Agents expression={expression} terms={terms}/>
                        <ManifestationTitle manifestation={expression.manifestations[0]} prefix={"In: "}/>
                        <PublicationData manifestation={expression.manifestations[0]}/>
                        {!(expression.manifestations[0].contentsnote === null) && <ContentsNote contents={expression.manifestations[0].contentsnote}  terms={terms}/>}
                        <Related expression={expression}/>
                        <PartOf expression={expression}/>
                        {showUri && <Typography component="div" align="left" variant="eroles">{expression.uri + " : " + score + " : " + expression.pagerank}</Typography>}
                    </div>
                </div>
            </>
        }else{
            return <>
                <div className={"expressionHeader"}>
                    <div className={"expressionHeaderTitle"}>
                        <ExpressionTitle expression={expression} terms={terms}/>
                        <Agents expression={expression} terms={terms}/>
                        <PublicationData manifestation={expression.manifestations[0]}/>
                        {!(expression.contentsnote === null) && <ContentsNote contents={expression.contentsnote}  terms={terms}/>}
                        <Related expression={expression}/>
                        <PartOf expression={expression}/>
                        {showUri && <Typography component="div" align="left" variant="eroles">{expression.uri + " : " + score + " : " + expression.pagerank }</Typography>}
                    </div>
                </div>
            </>
        }
    }

    // Return the expression component
    return <div className={"expression"} key={expression.uri}>
                <div className={relevantClass(expression.ranking) + " expressionLeft"}>
                    <IconTypes type={content[0]} text={expression.language[0] ? expression.language[0].uri.split("/").at(-1) : ""}/>
                    <RankingButtons expression={expression}/>
                </div>
                <div className="resultitem expressionRight">
                    <ExpressionDetails/>
                </div>
            </div>
}