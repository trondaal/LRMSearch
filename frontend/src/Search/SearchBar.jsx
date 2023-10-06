
import {useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import {selectedVar, relevantVar, irrelevantVar} from '../api/Cache';
import stopwords from './stopwords'
import Grid from "@mui/material/Grid";
import SubmitRanking from "./SubmitRanking.jsx";
import {useRecoilState} from 'recoil';
import {queryState} from "../state/state";

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

export default function SearchBar({search, uuid}) {
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
            //makes sure we run a query on first load
            console.log("Query=" + query);
            sessionStorage.setItem('query', query);
            search({ variables: { query: query.split(" ").join(" AND ") } });
        }, []
    );


    return <Grid container spacing={3} marginTop={1} >
        <Grid item xs={9}>
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

        <Grid item xs={3}>
            <SubmitRanking uuid={uuid} query={query}/>
        </Grid>

    </Grid>


}