import React from 'react';
import Typography from "@mui/material/Typography";
import IconTypes from "./IconTypes";
import IconButton from '@mui/material/IconButton';
import "./ResultList.css";
import {groupBy} from "lodash";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import Manifestation from "./Manifestation";
import {useRecoilState} from 'recoil';
import {showUriState, clickableState, selectedState} from "../state/state";
import "./ResultList.css";
import {relevantVar, irrelevantVar} from "../api/Cache";
import Tooltip from '@mui/material/Tooltip';

function moveLeft(arr, index) {
    if (index > 0 && index < arr.length) {
        const temp = arr[index];
        arr[index] = arr[index - 1];
        arr[index - 1] = temp;
    }
    return arr;
}

function moveRight(arr, index) {
    if (index >= 0 && index < arr.length - 1) {
        const temp = arr[index];
        arr[index] = arr[index + 1];
        arr[index + 1] = temp;
    }
    return arr;
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
    if (ranking === 1){
        return "relevant";
    }else if (ranking === -1){
        return "irrelevant";
    }else{
        return "";
    }
}

export default function Expression(props){
    const [showUri] = useRecoilState(showUriState);
    const [selected, setSelectedState] = useRecoilState(selectedState);
    const [clickable] = useRecoilState(clickableState);
    const {uri, manifestations} = props.expression;
    const worktitle = !isEmpty(props.expression.work[0].title) ? props.expression.work[0].title : "";
    const titles = [];
    if (!isEmpty(props.expression.titlepreferred)){
        titles.push(props.expression.titlepreferred);
    }else{
        if (!isEmpty(props.expression.title)) titles.push(props.expression.title);
    }

    const title = titles[0];
    const isTranslation = titles.find(element => element.toLowerCase().replace(/[^a-z]/g, '').includes(worktitle.toLowerCase().replace(/[^a-z]/g, '')))

    //roles that should default be displayed, in the order they should be presented, contains both work and expression roles
    const primaryroles = ['Author', 'Creator', 'Artist', 'Director', 'Producer', 'Composer', 'Lyricist', 'Interviewer', 'Interviewee', 'Honouree', 'Compiler', 'Translator', 'Narrator', 'Abridger', 'Editor'];

    const creatorsmap = groupBy(props.expression.work[0].creatorsConnection.edges, a => a.role);
    const creators = [];
    for (const r in creatorsmap){
        if (primaryroles.includes(r)) {
            creatorsmap[r] && creators.push([r, (creatorsmap[r].map(a => a.node.name)).join(" ; ")]);
        }
    }

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
    const worktype = props.expression.work[0].type.map(c => c.label);
    const workform = props.expression.work[0].form;


    //const isRelatedToMap = groupBy(props.expression.work[0].relatedToConnection.edges, a => a.role);
    //console.log(isRelatedToMap);
    //console.log(props.expression.work[0].relatedToConnection)

    const isWorkRelatedToWork = props.expression.work[0].relatedToConnection;
    const hasRelated = props.expression.work[0].relatedFromConnection;
    const partOf = props.expression.work[0].partOfConnection;
    const hasPart = props.expression.work[0].hasPartConnection;
    const isSubjectWork = props.expression.work[0].isSubjectWorkConnection;
    const hasSubjectWork = props.expression.work[0].hasSubjectWorkConnection;
    const hasSubjectAgent = props.expression.work[0].hasSubjectAgentConnection;
    const isExpressionRelatedToExpression = props.expression.relatedToConnection;
    const partOfExpression = props.expression.partOfConnection;

    if (isWorkRelatedToWork.totalCount > 0){
        showRelated = true;
    }
    if (partOf.totalCount > 0){
        showRelated = true;
    }
    if (hasSubjectWork.totalCount > 0){
        showRelated = true;
    }
    if (hasSubjectAgent.totalCount > 0){
        showRelated = true;
    }
    if (isExpressionRelatedToExpression.totalCount > 0){
        showRelated = true;
    }

    const handleClick = () => {
        const epos = selected.indexOf(uri)
        const selectedSet = new Set();
        selected.forEach((e) => selectedSet.add(e));
        if (epos === -1) {
            //Adding expression and child manifestation uri to list of selected
            selectedSet.add(uri);
            manifestations.forEach((m) => selectedSet.add(m.uri));
        } else {
            //Removing expression and child manifestation uri to list of selected
            selectedSet.delete(uri);
            manifestations.forEach((m) => selectedSet.delete(m.uri));
        }
        setSelectedState([...selectedSet]);
        //console.log(itemsSelected);
    };

    const description = () => {
        return <React.Fragment>
                <Typography color="primary.main" component="div" variant="etitle" align="left">{title}
                {workform && <Typography color='grey.700' variant="wtitle" component="span">({workform})</Typography>}
                {/*!isTranslation && <Typography color='grey.700' variant="wtitle" component="span"> (translation of: {worktitle})</Typography>*/}
                </Typography>
                {creators.map(creator => <Typography color="primary.main" component="span" align="left" variant="eroles" className={"role"} key={creator[0] + creator[1]}>{creator[0] + plurals(creator[1]) + ": " + creator[1]}</Typography>) }
                {contributors.map(contributor => <Typography color="primary.main" component="span" align="left" variant="eroles" className={"role"} key={contributor[0] + contributor[1]}>{contributor[0] + plurals(contributor[1]) + ": " + contributor[1]}</Typography>) }
                {/*<Typography color="primary.main" component="div" variant="body2" align="left">{content.join(", ") + " ; " + language.join(", ")}</Typography>   */}
                {props.expression.contentsnote && <Typography color="primary.main" component="div" variant="body2" align="left">{"Includes: " + props.expression.contentsnote}</Typography>}
                {partOfExpression.totalCount > 0 && <Typography color="primary.main" component="div" variant="body2" align="left">{"Part of: " + partOfExpression.edges.map(x => x.node.titlepreferred).join(", ")}</Typography>}
                {showUri && <Typography component="div" align="left" variant="eroles">{props.expression.uri}</Typography>}
        </React.Fragment>
    }

    /* Moved expression-classname from paper to expression entry */
    return <div className={"expression"} key={props.expression.uri}>
                <div className={relevantClass(props.expression.ranking) + " expressionLeft"}>
                    <IconTypes type={content[0]}/>
                    <div className={"rankingbuttons"}>
                        { props.expression.ranking === 0  &&
                            <><Tooltip title={"Mark as relevant"} placement={"right"}>
                                <IconButton size="small" onClick={() => {
                                    const arr = relevantVar();
                                    if (arr.indexOf(props.expression.uri) === -1){
                                        arr.push(props.expression.uri);
                                    }
                                    relevantVar([...arr]);
                                    //console.log("Relevant: " + relevantVar());
                                    //localStorage.setItem(sessionStorage.getItem('query').toLowerCase() + " : relevant", JSON.stringify(relevantVar()));
                                }}><ArrowCircleUpIcon color="action" fontSize="small"/>
                                </IconButton>
                            </Tooltip>
                            {<Tooltip title={"Mark as irrelevant"} placement={"right"}>
                                <IconButton size="small" onClick={() => {
                                    const arr = irrelevantVar();
                                    if (arr.indexOf(props.expression.uri) === -1) {
                                        arr.push(props.expression.uri);
                                    }
                                    irrelevantVar([...arr]);
                                }}><ArrowCircleDownIcon color="action" fontSize="small"/>
                                </IconButton>
                            </Tooltip>}
                            </>
                        }
                        { props.expression.ranking !== 0  &&
                            <Tooltip title={"Remove marking"} placement={"right"}>
                                <IconButton size="small" onClick={() => {
                                    if (relevantVar().includes(props.expression.uri)) {
                                        const arr = relevantVar();
                                        const index = arr.indexOf(props.expression.uri);
                                        arr.splice(index, 1);
                                        relevantVar([...arr]);
                                        //localStorage.setItem(sessionStorage.getItem('query').toLowerCase() + " : relevant", JSON.stringify(relevantVar()));
                                    }
                                    if (irrelevantVar().includes(props.expression.uri)) {
                                        const arr = irrelevantVar();
                                        const index = arr.indexOf(props.expression.uri);
                                        arr.splice(index, 1);
                                        irrelevantVar([...arr]);
                                        //localStorage.setItem(sessionStorage.getItem('query').toLowerCase() + " : irrelevant", JSON.stringify(irrelevantVar()));
                                    }
                                }}>
                                    <RemoveCircleOutlineIcon color="action" fontSize="small"/>
                                </IconButton>
                            </Tooltip>
                        }
                    </div>
                </div>
                <div className="resultitem expressionRight">
                    <div className={"expressionHeader"}>
                        <div className={"expressionHeaderTitle"}>
                            {description()}
                        </div>

                    </div>

                    <div className={"expressionManifestationListing"}>
                        <details open className={"MuiTypography-root MuiTypography-body2 MuiTypography-alignLeft css-cu2xtv-MuiTypography-root"}>
                            <summary className={"MuiTypography-root MuiTypography-body2 MuiTypography-alignLeft css-ipwc3n-MuiTypography-root"}>Available as:</summary>
                        <ul className={"manifestationlist"}>
                            {props.expression && props.expression.manifestations.slice(0,20).map(m => (<Manifestation manifestation={m} form= {props.expression.form} key={m.uri} checkboxes={props.checkboxes}/>))}
                        </ul>
                        </details>
                    </div>


                </div>
        {/*<div className={"expressionHeaderTypes"}>*/}
            {/*<Typography color={"dimgray"} component="div" align="left" variant={"body2"}>{'Type of work: ' +  worktype.join(", ")}</Typography>*/}
            {/*<Typography color={"dimgray"} component="div" align="left" variant={"body2"}>{'Content type: ' +  content.join(", ")}</Typography>
            {(language.length !== 0) ? <Typography color={"dimgray"} component="div" align="left" variant={"body2"}>{'Language: ' +  language.join(", ")}</Typography> : ""}*/}
            {/*showRelated  && <Typography component="div" align="left" variant="body2" >
                <details className={"MuiTypography-root MuiTypography-body2 MuiTypography-alignLeft css-cu2xtv-MuiTypography-root"}>
                    <summary>Related works</summary>
                    {others.map(other => <Typography component="div" key={other[0] + other[1]}>
                        <Typography component="span" variant={"relatedprefix"}>{other[0] + plurals(other[1]) + ": "}</Typography>
                        <Typography component="span" variant={"relatedlabel"}>{other[1]}</Typography>
                    </Typography>) }
                    {isWorkRelatedToWork.edges.map(x => <Typography component="div"key={x.role + x.node.label}>
                        <Typography component="span" variant={"relatedprefix"}>{capitalize(x.role) + ": "}</Typography>
                        <Typography component="span" variant={"relatedlabel"}>{x.node.label}</Typography>
                    </Typography>)}
                    {partOf.edges.map(x => <Typography component="div"key={"is part of" + x.node.label}>
                        <Typography component="span" variant={"relatedprefix"}>{"Is part of: "}</Typography>
                        <Typography component="span" variant={"relatedlabel"}>{x.node.label}</Typography>
                    </Typography>)}
                    {hasSubjectWork.edges.map(x => <Typography component="div"key={"has subject work" + x.node.label}>
                        <Typography component="span" variant={"relatedprefix"}>{"Has subject work: "}</Typography>
                        <Typography component="span" variant={"relatedlabel"}>{x.node.label}</Typography>
                    </Typography>)}
                    {hasSubjectAgent.edges.map(x => <Typography component="div"key={"has subject agent" + x.node.label}>
                        <Typography component="span" variant={"relatedprefix"}>{"Has subject agent: "}</Typography>
                        <Typography component="span" variant={"relatedlabel"}>{x.node.label}</Typography>
                    </Typography>)}
                    {isExpressionRelatedToExpression.edges.map(x => <Typography component="div"key={x.role + x.node.label}>
                        <Typography component="span" variant={"relatedprefix"}>{capitalize(x.role) + ": "}</Typography>
                        <Typography component="span" variant={"relatedlabel"}>{x.node.label}</Typography>
                    </Typography>)}
                </details>
            </Typography>*/}
        {/*</div>*/}
            </div>

}



/*


                        {relevantVar().indexOf(props.expression.uri) > -1 && relevantVar().indexOf(props.expression.uri) < (relevantVar().length - 1) ?
                            <Tooltip title={"Mark as relevant"} placement={"right"}>
                            <IconButton size="small" fontSize={"small"} onClick={() => {
                                //Adding or moving to the end so that up => highest index in the ranking array
                                let arr = moveRight(relevantVar(), relevantVar().indexOf(props.expression.uri));
                                relevantVar([...arr]);
                                localStorage.setItem(sessionStorage.getItem('query').toLowerCase(), JSON.stringify(relevantVar()));
                            }}><ArrowCircleUpIcon color="action" fontSize="small"/></IconButton></Tooltip> : <span/>}
                        {relevantVar().indexOf(props.expression.uri) > 0 ?
                            <Tooltip title={"Mark as irrelevant"} placement={"right"}>
                            <IconButton size="small"  onClick={() => {
                                //Adding or moving to the end so that up => highest index in the ranking array
                                let arr = moveLeft(relevantVar(), relevantVar().indexOf(props.expression.uri));
                                relevantVar([...arr]);
                                localStorage.setItem(sessionStorage.getItem('query').toLowerCase(), JSON.stringify(relevantVar()));
                            }}><ArrowCircleDownIcon color="action" fontSize="small"/></IconButton></Tooltip> : <span/>}
                        {relevantVar().indexOf(props.expression.uri) > -1 ?
                            <Tooltip title={"Remove from list of ranked"} placement={"right"}>
                            <IconButton size="small" onClick={() => {
                                //Adding or moving to the end so that up => highest index in the ranking array
                                let arr = relevantVar();
                                let index = arr.indexOf(props.expression.uri);
                                if (index === -1) {
                                    //do nothing
                                } else {
                                    arr.splice(index, 1);
                                }
                                relevantVar([...arr]);
                                localStorage.setItem(sessionStorage.getItem('query').toLowerCase(), JSON.stringify(relevantVar()));
                            }}>
                                <RemoveCircleOutlineIcon color="action" fontSize="small"/>
                            </IconButton>
                        </Tooltip> : <span/>}
 */