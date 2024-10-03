import {relevantVar, irrelevantVar} from "../../api/Cache.js";
import Expression from "./Expression.jsx";
import stopwords from "../stopwords.js";
import * as React from "react";
import PropTypes from "prop-types";
import {useEffect} from "react";

ResultList.propTypes = {
    results: PropTypes.array
};

export default function ResultList({results}) {

    useEffect(() => {
            //retrieves rankings from local storage if they exist
            //console.log(window.location.toString());
            if (sessionStorage.getItem(window.location.toString())) {
                const rankings = JSON.parse(sessionStorage.getItem(window.location.toString()))
                relevantVar([...rankings.relevant]);
                irrelevantVar([...rankings.irrelevant]);
            }else{
                //make sure we start with empty rankings
                relevantVar([]);
                irrelevantVar([]);
            }
        }, []
    );


    //should use some global storage for this, or state in Search.jsx
    const q = sessionStorage.getItem('query') ? sessionStorage.getItem('query') : "";
    let temp_q = q.replace(/[.,;()-/]/g, " ").trim().split(/ +/)
    let terms = temp_q.filter((word) => !stopwords.includes(word.toLowerCase())).filter(word => word.length > 1);

    //console.log(relevantVar());

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
