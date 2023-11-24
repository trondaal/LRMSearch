import Typography from "@mui/material/Typography";
import Highlighter from "react-highlight-words";
import React from "react";
import {groupBy} from "lodash";
import PropTypes from 'prop-types';

Agents.propTypes = {
    expression: PropTypes.object,
    terms: PropTypes.array
};

function plurals(str){
    //Returns an s to be added to a role in case of multiple agents
    if (str.includes(' ; ')){
        return 's';
    }else{
        return ''
    }
}

export default function Agents({expression, terms}) {
    //Displays agents in the order they should be presented

    //roles that should default be displayed, in the order they should be presented, contains both work and expression roles
    const roles   = ['Director', 'Producer', 'Composer', 'Lyricist', 'Interviewer', 'Interviewee', 'Honouree', 'Compiler', 'Translator', 'Narrator', 'Abridger', 'Editor', 'Instrumentalist', 'Performer'];
    const mainroles = ['Author', 'Creator', 'Artist'];
    //selecting from work, typical main entries first
    const creatorsmap = groupBy(expression.work[0].creatorsConnection.edges, a => a.role);

    const creators = [];
    for (const r in creatorsmap){
        if (mainroles.includes(r)) {
            creatorsmap[r] && creators.push([r, (creatorsmap[r].map(a => a.node.name)).join(" ; ")]);
        }
    }
    for (const r in creatorsmap){
        if (roles.includes(r)) {
            creatorsmap[r] && creators.push([r, (creatorsmap[r].map(a => a.node.name)).join(" ; ")]);
        }
    }

    //selecting from expression
    const contributorsmap = groupBy(expression.creatorsConnection.edges, a => a.role);
    const contributors = [];
    for (const r in contributorsmap){
        if (roles.includes(r)) {
            contributorsmap[r] && contributors.push([r, (contributorsmap[r].map(a => a.node.name)).join(" ; ")]);
        }
    }
    const others = [];

    for (const k in creatorsmap){
        if (![...mainroles, ...roles].includes(k)){
            contributorsmap.push([k, (creatorsmap[k].map(a => a.node.name)).join(" ; ")]);
        }
    }

    /*for (const k in contributorsmap){
        if (!roles.includes(k)){
            others.push([k, (contributorsmap[k].map(a => a.node.name)).join(" ; ")]);
        }
    }*/

    return <>
        {<div>{creators.map(creator =>
            <Typography color="primary.main" component="span" align="left" variant="agentname" className={"role"} key={creator[0] + creator[1]}><Typography color="primary.main" component="span" align="left" variant="prefix">{creator[0] + plurals(creator[1]) + ": "}</Typography>
                <Highlighter
                    highlightClassName="highlighted"
                    searchWords={terms}
                    autoEscape={true}
                    textToHighlight={creator[1]
                    }/></Typography>) }</div> }
        {<div>{contributors.map(contributor => <Typography color="primary.main" component="span" align="left" variant="agentname" key={contributor[0] + contributor[1]} className={"role"}><Typography color="primary.main" component="span" align="left" variant="prefix">{contributor[0] + plurals(contributor[1]) + ": " }</Typography>{contributor[1]}</Typography>)}</div> }
        {/*<div>{others.map(other => <Typography color="primary.main" component="span" align="left" variant="agentname" className={"role"} key={other[0] + other[1]}>{other[0] + plurals(other[1]) + ": " + other[1]}</Typography>)}</div> */}
    </>
}
