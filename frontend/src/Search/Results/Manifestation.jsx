import React from 'react';
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import "./ResultList.css";
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import {selectedState, clickableState} from '../../state/state.js';
import {useRecoilState} from 'recoil';
import TruncateText from "./TruncateText.jsx";
import {groupBy} from "lodash";
import {TrendingUp} from "@mui/icons-material";
import Highlighter from "react-highlighter-words";

function isEmpty(str) {
    return (!str || str.length === 0 );
}

function plurals(str){
    //Returns an s to be added to a role in case of multiple agents
    if (str.includes(' ; ')){
        return 's';
    }else{
        return ''
    }
}

export const PublicationData = ({manifestation}) => {
    const {extent, edition, partnote, distribution, production, publication, manufacture, identifier, series, seriesnumbering} = manifestation;

    const published = [];
    if (!isEmpty(publication)) published.push(publication);
    if (!isEmpty(production)) published.push(production);
    if (!isEmpty(distribution)) published.push(distribution);
    if (!isEmpty(manufacture)) published.push(manufacture);

    return <>
        {extent && <Typography component="span" align="left"  variant="description" className={"manifestationdetails"}><span className={"prefix"}>Extent: </span>{extent}</Typography>}
        {edition && <Typography component="span" align="left"  variant="description" className={"manifestationdetails"}><span className={"prefix"}>Edition: </span>{edition}</Typography>}
        {published.length > 0 && <Typography component="span" align="left"  variant="description" className={"manifestationdetails"}><span className={"prefix"}>Published: </span>{published.join(", ")}</Typography>}
        {series  && <Typography component="span" align="left"  variant="description" className={"manifestationdetails"}><span className={"prefix"}></span>{series + (seriesnumbering ? " ; " + seriesnumbering : "")}</Typography>}
        {identifier  && <Typography component="span" align="left"  variant="description" className={"manifestationdetails"}><span className={"prefix"}></span>{identifier}</Typography>}
        {partnote && <Typography component="div" align="left"  variant="description" className={"manifestationdetails"}><span className={"prefix"}>In: </span>{partnote}</Typography>}
    </>
}

export function manifestationStatement(manifestation){
    const {title, subtitle, numbering, part, responsibility} = manifestation;
    const statement = [];
    if (!isEmpty(title) && !isEmpty(subtitle)){
        statement.push(title + " : " + subtitle)
    }else if (!isEmpty(title)){
        statement.push(title);
    }
    if (!isEmpty(numbering)) statement.push(numbering);
    if (!isEmpty(part)) statement.push(part);
    if (!isEmpty(responsibility)) statement.push(responsibility);
    return statement.join(" / ")
}

export function ManifestationTitle({manifestation, prefix = "", terms = []}){
    return (
    <Typography
    component="div" color="primary.main" align="left" variant="mtitle.light" className={"mtitle"}>
    {prefix}
    <Highlighter
        highlightClassName="highlighted"
        searchWords={terms}
        autoEscape={true}
        textToHighlight={manifestationStatement(manifestation)}/>
    </Typography>)
}

export function ContentsNote({contents, prefix = "Includes: ", terms = []}){
    return <div>
    <Typography component="span" variant="contentsprefix">{prefix}</Typography>
    <Typography component="span" variant="contents"><TruncateText text={contents} terms={terms} maxLength={80}/></Typography>
    </div>
}

export default function Manifestation(props){
    //console.log(props.terms);
    const [selected, setSelected] = useRecoilState(selectedState)
    const [clickable] = useRecoilState(clickableState)
    //const {title, subtitle, numbering, part, responsibility, extent, edition, uri, partnote} = props.manifestation;
    const {distribution, production, publication, manufacture, expressions, uri, terms} = props.manifestation;
    const parentform = props.form;

    const published = [];
    if (!isEmpty(publication)) published.push(publication);
    if (!isEmpty(production)) published.push(production);
    if (!isEmpty(distribution)) published.push(distribution);
    if (!isEmpty(manufacture)) published.push(manufacture);

    const handleClick = () => {
        //console.log(selected);
        const pos = selected.indexOf(uri)
        if (pos === -1) {
            setSelected([...selected, uri]);
        } else {
            setSelected([...selected.slice(0, pos), ...selected.slice(pos + 1)]);
        }
    };

    //roles that should default be displayed for manifestation, in the order they should be presented, contains both work and expression roles
    const roles = ['Editor', 'Illustrator', 'Contributor', 'Cartographer', 'Designer', 'Printer', 'Publisher'];

    //selecting creator from manifestation and organize by role
    const creatorsmap = groupBy(props.manifestation.creatorsConnection.edges, a => a.role);
    const creators = [];
    for (const r in creatorsmap){
        if (roles.includes(r)) {
            creatorsmap[r] && creators.push([r, (creatorsmap[r].map(a => a.node.name)).join(" ; ")]);
        }
    }
    //console.log(props.manifestation.creatorsConnection.edges);
    //separate array for additional creators
    const others = [];
    for (const k in creatorsmap){
        if (!roles.includes(k)){
            others.push([k, (creatorsmap[k].map(a => a.node.name)).join(" ; ")]);
        }
    }


    const description = () => {
        return <React.Fragment>
            <ManifestationTitle manifestation={props.manifestation} terms={props.terms}/>
            {creators.map(creator => <Typography color="primary.main" component="span" align="left" variant="body2" className={"role"} key={creator[0] + creator[1]}>{creator[0] + plurals(creator[1]) + ": " + creator[1]}</Typography>) }
            {others.map(creator => <Typography color="primary.main" component="span" align="left" variant="body2" className={"role"} key={creator[0] + creator[1]}>{creator[0] + plurals(creator[1]) + ": " + creator[1]}</Typography>) }
            <div className={"manifestationdetails"}>
            <PublicationData manifestation={props.manifestation}/>
            {props.contentsDisplayed && props.manifestation.contentsnote ? <ContentsNote contents={props.manifestation.contentsnote} terms={props.terms}/> : <></>}
            {/*(expressions.length) > 1 && parentform === "part" && <Typography component="div" variant="body2" className={"contents"}>
                {contentsnote === null ? "" : <>
                    <span className={"prefix"}>Includes: </span>
                    <TruncateText text={expressions.filter(x => x.form === "aggregate" || x.form === "parent")[0].contentsnote} maxLength={100}/>
                </>
                }
            </Typography>*/}
            </div>
            </React.Fragment>
    }

    return clickable ? <ListItemButton alignItems="flex-start" onClick={handleClick}sx={{pl: 9, pr: 0}}>
                            {description()}
                        </ListItemButton>
                        :
                        <div className={"manifestation"}>
                            {description()}
                            <hr width={"50%"} align={"left"}/>
                        </div>
}