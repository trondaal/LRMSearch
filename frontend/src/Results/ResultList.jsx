import {selectedVar} from "../api/Cache";
import Expression from "./Expression";
import stopwords from "../Search/stopwords.js";
import * as React from "react";
import PropTypes from "prop-types";

ResultList.propTypes = {
    results: PropTypes.array
};


export default function ResultList({results}) {

    //should use some global storage for this, or state in Search.jsx
    const q = sessionStorage.getItem('query') ? sessionStorage.getItem('query') : "";
    let temp_q = q.replace(/[.,;()-/]/g, " ").trim().split(/ +/)
    let terms = temp_q.filter((word) => !stopwords.includes(word.toLowerCase())).filter(word => word.length > 1);

    if (results === undefined){
        return <div>No results</div>
    }else if (results.length === 0){
        return <div>No results</div>
    }else{
        return (<div className={"expressionList"}>
            {results.map(x => (<Expression expression={x.expression} score={x.score} key={x.expression.uri} terms={terms}/>))}
        </div>)
    }
}
