import Typography from "@mui/material/Typography";
import React from "react";
import PropTypes from "prop-types";

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function renameRole(role, language){
    if (role.includes('translation')){
        return language[0].label + " translation of"
    }else{
        return capitalize(role.replace(/is |has | work| expression/g, ""));
    }
}

Related.propTypes = {
    expression: PropTypes.object,
    terms: PropTypes.array,
    expanded: PropTypes.bool,
    checkboxes: PropTypes.bool
};

function bestLabel(e){
    //console.log(e)
    if (e.titlepreferred && e.label){
        if (e.label.includes(e.titlepreferred)){
            return e.label;
        }else{
            return e.titlepreferred;
        }
    }else if (e.titlepreferred){
        return e.titlepreferred;
    }else if (e.label){
        return e.label;
    }else{
        return e.title;
    }


}
export default function Related({expression}){
    const isWorkRelatedToWork = expression.work[0].relatedToConnection;
    const isExpressionRelatedToExpression = expression.relatedToConnection;
    //const partOfWork = expression.work[0].partOfConnection;
    //const partOfExpression = expression.partOfConnection;
    //const hasSubjectWork = expression.work[0].hasSubjectWorkConnection;
    //const hasSubjectAgent = expression.work[0].hasSubjectAgentConnection;

    return <>
        {isExpressionRelatedToExpression.totalCount > 0 && isExpressionRelatedToExpression.edges.map(e => <Typography color="primary.main" component="div" variant="body2" align="left" key={e.role + e.node.label}>{renameRole(e.role, expression.language) + ": "}<a href={"?query=" + (e.node.titlepreferred ? e.node.titlepreferred : e.node.label) + " (" + e.node.id +")"}>{bestLabel(e.node)}</a></Typography>)}
        {isWorkRelatedToWork.totalCount > 0 && isWorkRelatedToWork.edges.map(w => <Typography color="primary.main" component="div" variant="body2" align="left" key={w.role + w.node.label}>{renameRole(w.role) + ": "}<a href={"?query=" + w.node.label}>{bestLabel(w.node)}</a></Typography>)}
    </>
}

export function PartOf({expression}){
    const partOfWork = expression.work[0].partOfConnection;
    const partOfExpression = expression.partOfConnection;
    if (partOfExpression.totalCount > 0){
        return partOfExpression.edges.map(w => <Typography color="primary.main" component="div" variant="body2" align="left" key={w.role + w.node.label}>{renameRole(w.role) + ": "}<a href={"?query=" + w.node.label}>{w.node.label}</a></Typography>)
    } else if (partOfWork.totalCount > 0){
        return partOfWork.edges.map(w => <Typography color="primary.main" component="div" variant="body2" align="left" key={w.role + w.node.label}>{renameRole(w.role) + ": "}<a href={"?query=" + w.node.label}>{w.node.label}</a></Typography>)
    } else {
        <></>
    }
}