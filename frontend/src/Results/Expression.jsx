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

function renameRole(role, language){
    if (role.includes('translation')){
        return language[0].label + " translation of"
    }else{
        return capitalize(role.replace(/is |has | work| expression/g, ""));
    }
}

function isEmpty(str) {
    return (!str || str.length === 0 );
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function plurals(str){
    //Returns an s to be added to a role in case of multiple agents
    if (str.includes(' ; ')){
        return 's';
    }else{
        return ''
    }
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

function expressionTitle(expression) {
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
}

export default function Expression(props){
    //console.log(props);
    const [showUri] = useRecoilState(showUriState);
    const [selected, setSelectedState] = useRecoilState(selectedState);
    const {uri, manifestations} = props.expression;
    const [expanded, setExpanded] = useState(false);

    /*const detailsRef = useRef(null);

    useEffect(() => {
        setExpanded(props.expanded);
        detailsRef.current.addEventListener('toggle', handleToggle);
        return () => {
           detailsRef.current.removeEventListener('toggle', handleToggle);
        };
    }, []);*/

    const handleToggle = (event) => {
        console.log('Clicked!');
    };


    //roles that should default be displayed, in the order they should be presented, contains both work and expression roles
    const primaryroles = ['Author', 'Creator', 'Artist', 'Director', 'Producer', 'Composer', 'Lyricist', 'Interviewer', 'Interviewee', 'Honouree', 'Compiler', 'Translator', 'Narrator', 'Abridger', 'Editor', 'Instrumentalist', 'Performer'];
    //selecting from work
    const creatorsmap = groupBy(props.expression.work[0].creatorsConnection.edges, a => a.role);
    const creators = [];
    for (const r in creatorsmap){
        if (primaryroles.includes(r)) {
            creatorsmap[r] && creators.push([r, (creatorsmap[r].map(a => a.node.name)).join(" ; ")]);
        }
    }
    //selecting from expression
    const contributorsmap = groupBy(props.expression.creatorsConnection.edges, a => a.role);
    const contributors = [];
    for (const r in contributorsmap){
        if (primaryroles.includes(r)) {
            contributorsmap[r] && contributors.push([r, (contributorsmap[r].map(a => a.node.name)).join(" ; ")]);
        }
    }

    const others = [];

    for (const k in creatorsmap){
        if (!primaryroles.includes(k)){
            others.push([k, (creatorsmap[k].map(a => a.node.name)).join(" ; ")]);
        }
    }

    for (const k in contributorsmap){
        if (!primaryroles.includes(k)){
            others.push([k, (contributorsmap[k].map(a => a.node.name)).join(" ; ")]);
        }
    }

    let showRelated = false;

    if (others.length > 0){
        showRelated = true;
    }

    const language = props.expression.language.map(l => l.label);
    const content = props.expression.content.map(c => c.label);
    content.sort();
    content.reverse();
    const workform = props.expression.work[0].form;

    const isWorkRelatedToWork = props.expression.work[0].relatedToConnection;
    const partOfWork = props.expression.work[0].partOfConnection;
    const hasSubjectWork = props.expression.work[0].hasSubjectWorkConnection;
    const hasSubjectAgent = props.expression.work[0].hasSubjectAgentConnection;
    const isExpressionRelatedToExpression = props.expression.relatedToConnection;
    const partOfExpression = props.expression.partOfConnection;



    const ExpressionTitle = ({expression}) => {
        const eTitle= expressionTitle(expression);
        const wTitle= expression.work[0].title;
        const contentType=expression.content;
        const language=expression.language;
        let extraText = [];
        if (wTitle !== eTitle){
            extraText.push(wTitle);
        }else{
            extraText.push(wTitle);
        }
        if (language.length !== 0){
            extraText.push(language[0].label);
        }
        if (contentType.length !== 0){
            extraText.push(contentType[0].label);
        }
        return (
            <Typography color="primary.main" component="div" variant="etitle" align="left">
                <Typography color="primary.main" component="span" variant="fieldname" align="left">Title: </Typography>
                <Highlighter
                    highlightClassName="highlighted"
                    searchWords={props.terms}
                    autoEscape={true}
                    textToHighlight={eTitle}
                />
                {/*wTitle && <Typography color='grey.700' variant="wtitle" component="span"> ({extraText.join(" / ")})</Typography>*/}
            </Typography>)
    }

    const Agents = () => {
        return <>
        {<div>{creators.map(creator =>
            <Typography color="primary.main" component="span" align="left" variant="agentname" className={"role"} key={creator[0] + creator[1]}>{creator[0] + plurals(creator[1]) + ": "}
            <Highlighter
                highlightClassName="highlighted"
                searchWords={props.terms}
                autoEscape={true}
                textToHighlight={creator[1]
            }/></Typography>) }</div> }
        {<div>{contributors.map(contributor => <Typography color="primary.main" component="span" align="left" variant="agentname" className={"role"} key={contributor[0] + contributor[1]}>{contributor[0] + plurals(contributor[1]) + ": " + contributor[1]}</Typography>)}</div> }
        {<div>{others.map(other => <Typography color="primary.main" component="span" align="left" variant="agentname" className={"role"} key={other[0] + other[1]}>{other[0] + plurals(other[1]) + ": " + other[1]}</Typography>)}</div> }
        </>
    }

    /*const ContentsNote = () => {
        return <>
            {!(props.expression.contentsnote === null) && <Typography color="primary.main" component="div" variant="contents" align="left"><TruncateText text={"Includes: " + props.expression.contentsnote} maxLength={120}/></Typography>}
        </>
    }*/


    const Related = () => {
        return <>
            {isExpressionRelatedToExpression.totalCount > 0 && isExpressionRelatedToExpression.edges.map(e => <Typography color="primary.main" component="div" variant="body2" align="left" key={e.role + e.node.label}>{renameRole(e.role, props.expression.language) + ": "}<a href={"?query=" + (e.node.titlepreferred ? e.node.titlepreferred : e.node.label) + " (" + e.node.id +")"}>{e.node.titlepreferred ? e.node.titlepreferred : e.node.label}</a></Typography>)}
            {isWorkRelatedToWork.totalCount > 0 && isWorkRelatedToWork.edges.map(w => <Typography color="primary.main" component="div" variant="body2" align="left" key={w.role + w.node.label}>{renameRole(w.role) + ": "}<a href={"?query=" + w.node.label}>{w.node.label}</a></Typography>)}
        </>
    }

    const PartOf = () => {
        if (partOfExpression.totalCount > 0){
            return partOfExpression.edges.map(w => <Typography color="primary.main" component="div" variant="body2" align="left" key={w.role + w.node.label}>{renameRole(w.role) + ": "}<a href={"?query=" + w.node.label}>{w.node.label}</a></Typography>)
        } else if (partOfWork.totalCount > 0){
            return partOfWork.edges.map(w => <Typography color="primary.main" component="div" variant="body2" align="left" key={w.role + w.node.label}>{renameRole(w.role) + ": "}<a href={"?query=" + w.node.label}>{w.node.label}</a></Typography>)
        } else {
            <></>
        }
    }

    const ExpressionDetails = () => {
        if (props.expression.manifestations.length === 1){
            //Dislay expression and manifestation details in one line
            if (props.expression.form === "part"){
                // This is a part and part of is indicated with a prefix to title
                return <>
                    <div className={"expressionHeader"}>
                        <div className={"expressionHeaderTitle"}>
                            <ExpressionTitle expression={props.expression} />
                            <Agents/>
                            <Related/>
                            <PartOf/>
                            <ManifestationTitle terms={props.terms} manifestation={props.expression.manifestations[0]} prefix={"In: "}/>
                            <PublicationData manifestation={props.expression.manifestations[0]}/>
                            {!(props.expression.manifestations[0].contentsnote === null) && <ContentsNote contents={props.expression.manifestations[0].contentsnote} terms={props.terms}/>}
                            {showUri && <Typography component="div" align="left" variant="eroles">{props.expression.uri}</Typography>}
                        </div>
                    </div>
                </>
            }else{
                return <>
                    <div className={"expressionHeader"}>
                        <div className={"expressionHeaderTitle"}>
                            <ExpressionTitle expression={props.expression}/>
                            <Agents/>
                            <Related/>
                            <PartOf/>
                            <PublicationData manifestation={props.expression.manifestations[0]}/>
                            {!(props.expression.contentsnote === null) && <ContentsNote contents={props.expression.contentsnote} terms={props.terms}/>}
                            {showUri && <Typography component="div" align="left" variant="eroles">{props.expression.uri}</Typography>}
                        </div>
                    </div>
                </>
            }
        }
        if (props.expression.manifestations.length > 1){
        return <>
            <div className={"expressionHeader"}>
                <div className={"expressionHeaderTitle"}>
                    <ExpressionTitle expression={props.expression}/>
                    <Agents/>
                    {!(props.expression.contentsnote === null) && <ContentsNote contents={props.expression.contentsnote}  terms={props.terms}/>}
                    <Related/>
                    <PartOf/>
                    {showUri && <Typography component="div" align="left" variant="eroles">{props.expression.uri}</Typography>}
                </div>
            </div>
            <div className={"expressionManifestationListing"}>
                    <details open={props.expanded}>
                        <summary>{props.expression.manifestations.length} publications available</summary>
                        <ul className={"manifestationlist"}>
                            {props.expression && props.expression.manifestations.map(m => (<Manifestation manifestation={m} form= {props.expression.form} key={m.uri} checkboxes={props.checkboxes} contentsDisplayed={props.expression.contents === null} terms={props.terms}/>))}
                        </ul>
                    </details>
            </div>
        </>
        }else if (props.expression.manifestations.length === 1 && props.expression.form === "standalone"){
            return <>
                <div className={"expressionHeader"}>
                    <div className={"expressionHeaderTitle"}>
                        <ExpressionTitle expression={props.expression}/>
                        <Agents/>
                        <PublicationData manifestation={props.expression.manifestations[0]}/>
                        {!(props.expression.contentsnote === null) && <ContentsNote contents={props.expression.contentsnote}  terms={props.terms}/>}
                        <Related/>
                        <PartOf/>
                        {showUri && <Typography component="div" align="left" variant="eroles">{props.expression.uri}</Typography>}
                    </div>
                </div>
            </>
        }else if (props.expression.manifestations.length === 1 && props.expression.form === "part"){
            return <>
                <div className={"expressionHeader"}>
                    <div className={"expressionHeaderTitle"}>
                        <ExpressionTitle expression={props.expression}/>
                        <Agents/>
                        <ManifestationTitle manifestation={props.expression.manifestations[0]} prefix={"In: "}/>
                        <PublicationData manifestation={props.expression.manifestations[0]}/>
                        {!(props.expression.manifestations[0].contentsnote === null) && <ContentsNote contents={props.expression.manifestations[0].contentsnote}  terms={props.terms}/>}
                        <Related/>
                        <PartOf/>
                        {showUri && <Typography component="div" align="left" variant="eroles">{props.expression.uri}</Typography>}
                    </div>
                </div>
            </>
        }else{
            return <>
                <div className={"expressionHeader"}>
                    <div className={"expressionHeaderTitle"}>
                        <ExpressionTitle eTitle={expressionTitle(props.expression)} wform={props.expression.work[0].form}/>
                        <Agents/>
                        <PublicationData manifestation={props.expression.manifestations[0]}/>
                        {!(props.expression.contentsnote === null) && <ContentsNote contents={props.expression.contentsnote}  terms={props.terms}/>}
                        <Related/>
                        <PartOf/>
                        {showUri && <Typography component="div" align="left" variant="eroles">{props.expression.uri}</Typography>}
                    </div>
                </div>
            </>
        }
    }

    // Return the expression component
    return <div className={"expression"} key={props.expression.uri}>
                <div className={relevantClass(props.expression.ranking) + " expressionLeft"}>
                    <IconTypes type={content[0]} text={props.expression.language[0] ? props.expression.language[0].uri.split("/").at(-1) : ""}/>
                    <RankingButtons expression={props.expression}/>
                </div>
                <div className="resultitem expressionRight">
                    <ExpressionDetails/>
                </div>
            </div>
}