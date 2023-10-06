
import {useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import {selectedVar, relevantVar, irrelevantVar} from '../api/Cache';
import stopwords from './stopwords'
import Grid from "@mui/material/Grid";
import SubmitRanking from "./SubmitRanking.jsx";
import {useRecoilState} from 'recoil';
import {queryState} from "../state/state";
import Button from "@mui/material/Button";
import * as React from "react";
import Box from '@mui/material/Box';

function initialQuery() {
    const params = new URLSearchParams(window.location.search)
    let q = "Tolkien Lord of the Rings";
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

export default function SearchBar({search, expanded, setExpanded}) {
    //const [query, setQuery] = useRecoilState(queryState);
    //setQuery(initialQuery());
    const [query, setQuery] = useState(initialQuery());
    const changeHandler = (event) => {
        //runs a query when enter is pressed, otherwise updates the query
        if (event.key === 'Enter') {
            selectedVar(new Set());
            search({ variables: { query: query.split(" ").filter((word) => !stopwords.includes(word.toLowerCase())).join(" AND ") } })
            //console.log(query)
            const params = new URLSearchParams(window.location.search);
            params.set("query", event.target.value);
            window.location.search = params.toString()
            sessionStorage.setItem('query', query);
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
            search({ variables: { query: query.split(" ").join(" AND ") } });
        }, []
    );


    return <Grid container spacing={3} marginTop={1} >
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
            <SubmitRanking query={query} expanded={expanded} setExpanded={setExpanded}/>
        </Grid>

    </Grid>


}