
import {useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import {selectedVar, relevantVar, irrelevantVar, expandedVar} from '../api/Cache';
import stopwords from './stopwords'
import Grid from "@mui/material/Grid";
import SubmitRanking from "./SubmitRanking.jsx";
import * as React from "react";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Expression from "./Results/Expression.jsx";
//import {expandHistoryState} from "../state/state.js";
//import {useSetRecoilState} from "recoil";

import { useSetAtom  } from 'jotai';
import { expandedHistoryAtom } from '../state/atoms.js'

function initialQuery() {
    const params = new URLSearchParams(window.location.search)
    let q = "enter query here";
    if (params.get("query")){
        q = params.get("query");
        return q;
    }else if (sessionStorage.getItem('query')){
        q = sessionStorage.getItem('query');
        params.set("query", q);
        window.location.search = params.toString()
    }
    return q;
}

function createSortOrder(){
    const params = new URLSearchParams(window.location.search);
    let sort = {
        "score": "DESC"
    };
    if (params.get("sort") && params.get("sort") === "random"){
        sort = {"expression": { "random": "ASC"}};
    }
    if (params.get("sort") && params.get("sort") === "pagerank"){
        sort = {"expression": { "pagerank": "DESC"}};
    }
    if (params.get("sort") && params.get("sort") === "score"){
        sort = {"score": "DESC"};
    }
    return sort;
}

function createQuery(q){
    const params = new URLSearchParams(window.location.search);
    let conditions = "";
    let bool = " AND ";
    if (params.get("content")){
        conditions += " AND (content: " + params.get("content") + ")";
    }
    if (params.get("language")){
        conditions += " AND (language: " + params.get("language") + ")";
    }
    if (params.get("form")){
        conditions += " AND (form: " + params.get("form") + ")";
    }
    if (params.get("types")){
        conditions += " AND (types: " + params.get("types") + ")";
    }
    if (params.get("creator")){
        conditions += " AND (creators: " + params.get("creator") + ")";
    }
    if (params.get("subject")){
        conditions += " AND (subjects: " + params.get("subject") + ")";
    }
    if (params.get("boolean")){
        if (params.get("boolean").toLowerCase() === "or"){
            bool = " OR ";
        }
    }
    let q1 = q.replace(/[.,;()-/:]+/g, " ").trim().split(/ +/).filter((word) => !stopwords.includes(word.toLowerCase())).join(bool)  + conditions;
    //console.log(q1)
    return q1;
}


export default function SearchBar({search, defaultExpanded, setDefaultExpanded, results, display, setDisplay}) {
    //console.log("In Searchbar: " + defaultExpanded);
    const [query, setQuery] = useState(initialQuery());
    const setExpandedHistory = useSetAtom(expandedHistoryAtom);
    const params = new URLSearchParams(window.location.search);
    let limit = 500;
    if (params.get("limit")){
        const lim = parseInt(params.get("limit"));
        if (!isNaN(lim) && lim > 0){
            //console.log(params.get("limit"))
            limit = lim;
        }
    }
    const changeHandler = (event) => {
        if (!params.get("taskid")){
            if (event.key === 'Enter') {
                expandedVar([]);
                selectedVar(new Set());
                params.set("query", event.target.value);
                window.location.search = params.toString()
                sessionStorage.setItem('query', query);
                search({ variables: { query: createQuery(query), sort: createSortOrder(), limit: limit } })
                setExpandedHistory([]);
            }else{
                setQuery(event.target.value)
            }
        }
    };

    useEffect(() => {
            //retrieves rankings from local storage if they exist
            //console.log(window.location.toString());
            /*if (sessionStorage.getItem(window.location.toString())) {
                const rankings = JSON.parse(sessionStorage.getItem(window.location.toString()))
                relevantVar([...rankings.relevant]);
                irrelevantVar([...rankings.irrelevant]);
            }*/
            setExpandedHistory([]);
            sessionStorage.setItem('query', query.toLowerCase());
            search({ variables: { query: createQuery(query), sort: createSortOrder(), limit:limit }});
            //console.log(relevantVar());
        }, []
    );

    //const params = new URLSearchParams(window.location.search);
    let task = "";
    if (params.get("task")){
        task = params.get("task");
    }
    let context = "";
    if (params.get("context")){
        context = params.get("context");
    }

    //console.log("Before SUBMIT: " + defaultExpanded);
    return <Grid container spacing={3} marginTop={0} >
        {context !== "" && task !== ""?
            <Grid item xs={12}><Typography color="primary.light" component="span" align="left" variant="taskdescription">{context}<br/>{task.split("--")[0]}<u>{task.split("--")[1]}</u>{task.split("--")[2]}</Typography></Grid>
            : <></>
        }
        <Grid item xs={6}>
            <TextField
                id="filled-search"
                size="small"
                fullWidth
                disabled = {!params.get("taskid") ? false : true}
                label="Search field"
                type="search"
                variant="filled"
                value={query}
                onKeyPress={changeHandler}
                onChange={changeHandler}
            />
        </Grid>
        <Grid item xs={6}>
            {<SubmitRanking query={query} results={results}/>}
        </Grid>
    </Grid>


}