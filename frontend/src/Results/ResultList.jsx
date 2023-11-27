import {selectedVar} from "../api/Cache";
import Expression from "./Expression";
import stopwords from "../Search/stopwords.js";
import * as React from "react";

export default function ResultList({results, checkboxes, defaultExpanded, display}) {
    const q = sessionStorage.getItem('query') ? sessionStorage.getItem('query') : "";
    let q1 = q.replace(/[.,;()-/]/g, " ").trim().split(/ +/)
    let terms = q1.filter((word) => !stopwords.includes(word.toLowerCase()));
    //console.log("Terms = " + terms);
    //return q1.filter((word) => !stopwords.includes(word.toLowerCase())).join(bool)  + conditions;
    //const terms = sessionStorage.getItem('query') ? sessionStorage.getItem('query').trim().split(/ +/).filter((word) => !stopwords.includes(word.toLowerCase())) : [];

    if (results === undefined){
        return <div>No results</div>
    }else if (results.length === 0){
        return <div>No results</div>
    }else{
        return (<div className={"expressionList"}>
            {results.map(x => (<Expression expression={x.expression} score={x.score} key={x.expression.uri} checkboxes={checkboxes} defaultExpanded={defaultExpanded} terms={terms}/>))}
        </div>)
    }
}

/*selectedVar().size === 0 ?
                results ? results.map(x => (<Expression expression={x.expression} key={x.expression.uri} checkboxes={checkboxes} expanded={expanded}/>)) : [] :
                results ? results.filter(exp => exp.checked).map(x => (<Expression expression={x.expression} key={x.expression.uri} checkboxes={checkboxes} expanded={expanded}/>)) : []
*/