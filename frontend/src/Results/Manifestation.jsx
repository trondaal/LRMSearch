import React from 'react';
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import "./ResultList.css";
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import {selectedState, clickableState} from '../state/state';
import {useRecoilState} from 'recoil';

function isEmpty(str) {
    return (!str || str.length === 0 );
}

export default function Manifestation(props){
    const [selected, setSelected] = useRecoilState(selectedState)
    const [clickable] = useRecoilState(clickableState)
    const {title, subtitle, numbering, part, responsibility, extent, edition, uri, partnote} = props.manifestation;
    const {distribution, production, publication, manufacture, expressions} = props.manifestation;
    const parentform = props.form;
    //console.log(expressions)
    const statement = [];
    if (!isEmpty(title) && !isEmpty(subtitle)){
        statement.push(title + " : " + subtitle)
    }else if (!isEmpty(title)){
        statement.push(title);
    }
    if (!isEmpty(numbering)) statement.push(numbering);
    if (!isEmpty(part)) statement.push(part);
    if (!isEmpty(responsibility)) statement.push(responsibility);

    const published = [];
    if (!isEmpty(publication)) published.push(publication);
    if (!isEmpty(production)) published.push(production);
    if (!isEmpty(distribution)) published.push(distribution);
    if (!isEmpty(manufacture)) published.push(manufacture);

    //if (!isEmpty(identifier)) published.push(identifier);
    //if (!isEmpty(uri)) published.push(uri);

    const handleClick = () => {
        //console.log(selected);
        const pos = selected.indexOf(uri)
        if (pos === -1) {
            setSelected([...selected, uri]);
        } else {
            setSelected([...selected.slice(0, pos), ...selected.slice(pos + 1)]);
        }
    };

    const description = () => {
        return <React.Fragment>
            <Typography component="div" color="primary.main" align="left" variant="mtitle.light" className={"mtitle"}>{statement.join(" / ")}</Typography>
            {(expressions.length) > 1 && parentform === "part" && <Typography component="div" variant="body2" className={"contents"}>
                <span className={"prefix"}>Includes: </span>
                {expressions.filter(x => x.form === "collection" || x.form === "parent").map(x => <span className={"content"} key={x.contenstnote}>{x.contentsnote}</span>)}
            </Typography>}
            <div className={"manifestationdetails"}>
            {extent && <Typography component="span" align="left"  variant="body2" className={"manifestationdetails"}><span className={"prefix"}>Extent: </span>{extent}</Typography>}
            {edition && <Typography component="span" align="left"  variant="body2" className={"manifestationdetails"}><span className={"prefix"}>Edition: </span>{edition}</Typography>}
            {published.length > 0 && <Typography component="span" align="left"  variant="body2" className={"manifestationdetails"}><span className={"prefix"}>Published: </span>{published.join(", ")}</Typography>}
            {partnote && <Typography component="div" align="left"  variant="body2" className={"manifestationdetails"}><span className={"prefix"}>In: </span>{partnote}</Typography>}
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