import Typography from "@mui/material/Typography";
import Highlighter from "react-highlighter-words";
import React from "react";
import {manifestationStatement} from "./Manifestation.jsx";

function isEmpty(str) {
    return (!str || str.length === 0 );
}
function selectExpressionTitle(expression) {
    let manifestationFirst = false;
    const titles = [];
    if (expression.form !== "part" && expression.manifestations.length === 1){
        titles.push(manifestationStatement(expression.manifestations[0]));
        manifestationFirst = true;
    }
    if (!isEmpty(expression.titlepreferred)){
        titles.push(expression.titlepreferred);
    }
    if (!isEmpty(expression.title)){
        titles.push(expression.title);
    }
    if (!isEmpty(expression.titlevariant)){
        titles.push(expression.titlevariant);
    }
    let title = titles[0];
    /*if (manifestationFirst && titles[1] && !(titles[0].toLowerCase().includes(titles[1].toLowerCase()))){
        title += titles[0] + " INCLUDES (" + titles[1] + ")";
        console.log(titles[0]);
        console.log(titles[1]);
    }*/
    return title;
}
export default function ExpressionTitle ({expression, terms}) {
    //console.log("Terms: " + terms);
    const eTitle= selectExpressionTitle(expression);
    const wTitle= expression.work[0].title;
    const contentType=expression.content;
    const language=expression.language;
    let extraText = [];
    if (!eTitle.replace(/\W/ig, "").toLowerCase().includes(wTitle.replace(/\W/ig, "").toLowerCase())){
        //console.log(eTitle.replace(/\W/ig, "") + " : " + wTitle.replace(/\W/ig, ""));
        extraText.push(wTitle);
    }else{
        //extraText.push(wTitle);
    }
    if (expression.work[0].form){
        extraText.push(expression.work[0].form)
    }
    /*if (language.length !== 0){
        extraText.push(language[0].label);
    }
    if (contentType.length !== 0){
        extraText.push(contentType[0].label);
    }*/
    return (
        <Typography color="primary.main" component="div" variant="etitle" align="left">
            <Typography color="primary.main" component="span" variant="fieldname" align="left"><Typography color="primary.main" component="span" align="left" variant="prefix">Title: </Typography></Typography>
            <Highlighter
                highlightClassName="highlighted"
                searchWords={terms}
                autoEscape={true}
                textToHighlight={eTitle}
            />
            {extraText.length > 0 && <Typography color='grey.700' variant="wtitle" component="span"> ({extraText.join(" / ")})</Typography>}
        </Typography>)
}