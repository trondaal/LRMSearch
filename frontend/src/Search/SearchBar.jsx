
import {useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import {selectedVar, relevantVar, irrelevantVar} from '../api/Cache';
import stopwords from './stopwords'
import Grid from "@mui/material/Grid";
import SubmitRanking from "./SubmitRanking.jsx";
import * as React from "react";
import Typography from "@mui/material/Typography";

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
    let sort = {"score": "DESC"};
    if (params.get("sort") && params.get("sort") === "random"){
        sort = {"expression": { "random": "ASC"}};
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
    if (params.get("name")){
        conditions += " AND (names: " + params.get("name") + ")";
    }
    if (params.get("boolean")){
        if (params.get("boolean").toLowerCase() === "or"){
            bool = " OR ";
        }
    }
    console.log(q.trim().split(/ +/).filter((word) => !stopwords.includes(word.toLowerCase())).join(" AND ") + conditions)
    return q.trim().split(/ +/).filter((word) => !stopwords.includes(word.toLowerCase())).join(bool)  + conditions;
}

export default function SearchBar({search, expanded, setExpanded, results, display, setDisplay}) {
    const [query, setQuery] = useState(initialQuery());
    const changeHandler = (event) => {
        if (event.key === 'Enter') {
            selectedVar(new Set());
            const params = new URLSearchParams(window.location.search);
            params.set("query", event.target.value);
            window.location.search = params.toString()
            sessionStorage.setItem('query', query);
            search({ variables: { query: createQuery(query), sort: createSortOrder() } })
        }else{
            setQuery(event.target.value)
        }
    };

    useEffect(() => {
            //retrieves rankings from local storage if they exist
            if (localStorage.getItem(query.toLowerCase())) {
                const rankings = JSON.parse(localStorage.getItem(query.toLowerCase()))
                relevantVar([...rankings.relevant]);
                irrelevantVar([...rankings.irrelevant]);
            }
            sessionStorage.setItem('query', query.toLowerCase());
            search({ variables: { query: createQuery(query), sort: createSortOrder() }});
        }, []
    );

    const params = new URLSearchParams(window.location.search);
    let task = "";
    if (params.get("task")){
        task = params.get("task");
    }
    let context = "";
    if (params.get("context")){
        context = params.get("context");
    }

    return <Grid container spacing={3} marginTop={0} >
        {context !== "" && task !== ""?
            <Grid item xs={12}><Typography color="primary.light" component="span" align="left" variant="body2">{context}<br/>{task}</Typography></Grid>
            : <></>
        }
        <Grid item xs={6}>
            <TextField
                id="filled-search"
                size="small"
                fullWidth
                label="Search field"
                type="search"
                variant="filled"
                value={query}
                onKeyPress={changeHandler}
                onChange={changeHandler}
            />
        </Grid>
        <Grid item xs={6}>
            <SubmitRanking query={query} expanded={expanded} setExpanded={setExpanded} results={results} display={display} setDisplay={setDisplay}/>
        </Grid>
    </Grid>


}