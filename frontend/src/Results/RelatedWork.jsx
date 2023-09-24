import Typography from "@mui/material/Typography";
import PropTypes from 'prop-types';

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

RelatedWork.propTypes = {
    expression: PropTypes.object.isRequired,
}

export default function RelatedWork(props) {
    const isWorkRelatedToWork = props.expression.work[0].relatedToConnection;
    //const hasRelated = props.expression.work[0].relatedFromConnection;
    const partOf = props.expression.work[0].partOfConnection;
    //const hasPart = props.expression.work[0].hasPartConnection;
    //const isSubjectWork = props.expression.work[0].isSubjectWorkConnection;
    const hasSubjectWork = props.expression.work[0].hasSubjectWorkConnection;
    const hasSubjectAgent = props.expression.work[0].hasSubjectAgentConnection;
    const isExpressionRelatedToExpression = props.expression.relatedToConnection;

    let showRelated = false;

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

    return(<div className={"expressionHeaderTypes"}>
        {showRelated && <Typography component="div" align="left" variant="body2">
            <details
                className={"MuiTypography-root MuiTypography-body2 MuiTypography-alignLeft css-cu2xtv-MuiTypography-root"}>
                <summary>Related works</summary>
                {isWorkRelatedToWork.edges.map(x => <Typography component="div" key={x.role + x.node.label}>
                    <Typography component="span" variant={"relatedprefix"}>{capitalize(x.role) + ": "}</Typography>
                    <Typography component="span" variant={"relatedlabel"}>{x.node.label}</Typography>
                </Typography>)}
                {partOf.edges.map(x => <Typography component="div" key={"is part of" + x.node.label}>
                    <Typography component="span" variant={"relatedprefix"}>{"Is part of: "}</Typography>
                    <Typography component="span" variant={"relatedlabel"}>{x.node.label}</Typography>
                </Typography>)}
                {hasSubjectWork.edges.map(x => <Typography component="div" key={"has subject work" + x.node.label}>
                    <Typography component="span" variant={"relatedprefix"}>{"Has subject work: "}</Typography>
                    <Typography component="span" variant={"relatedlabel"}>{x.node.label}</Typography>
                </Typography>)}
                {hasSubjectAgent.edges.map(x => <Typography component="div" key={"has subject agent" + x.node.label}>
                    <Typography component="span" variant={"relatedprefix"}>{"Has subject agent: "}</Typography>
                    <Typography component="span" variant={"relatedlabel"}>{x.node.label}</Typography>
                </Typography>)}
                {isExpressionRelatedToExpression.edges.map(x => <Typography component="div" key={x.role + x.node.label}>
                    <Typography component="span" variant={"relatedprefix"}>{capitalize(x.role) + ": "}</Typography>
                    <Typography component="span" variant={"relatedlabel"}>{x.node.label}</Typography>
                </Typography>)}
            </details>
        </Typography>}
    </div>)
}