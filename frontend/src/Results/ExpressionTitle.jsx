import Typography from "@mui/material/Typography";
import Highlighter from "react-highlight-words";
import React from "react";
import {manifestationStatement} from "./Manifestation.jsx";

function isEmpty(str) {
    return (!str || str.length === 0 );
}
function selectExpressionTitle(expression) {
    const titles = [];
    if (expression.form !== "part" && expression.manifestations.length === 1){
        titles.push(manifestationStatement(expression.manifestations[0]));
    }
    if (!isEmpty(expression.titlepreferred)){
        titles.push(expression.titlepreferred);
    }else{
        if (!isEmpty(expression.title)) titles.push(expression.title);
    }
    return titles[0];
}
export default function ExpressionTitle ({expression, terms}) {
    //console.log("Terms: " + terms);
    const eTitle= selectExpressionTitle(expression);
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
            <Typography color="primary.main" component="span" variant="fieldname" align="left"><Typography color="primary.main" component="span" align="left" variant="prefix">Title: </Typography></Typography>
            <Highlighter
                highlightClassName="highlighted"
                searchWords={terms}
                autoEscape={true}
                textToHighlight={eTitle}
            />
            {/*wTitle && <Typography color='grey.700' variant="wtitle" component="span"> ({extraText.join(" / ")})</Typography>*/}
        </Typography>)
}