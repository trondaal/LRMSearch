
import React, {useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import {selectedVar, relevantVar, irrelevantVar} from '../api/Cache';
import stopwords from './stopwords'

/* interface Rankings {
  relevant: string[]
  irrelevant: string[]
// } */


function initialQuery() {
    const params = new URLSearchParams(window.location.search)
    let q = "Tolkien Lord of the Rings";
    if (params.get("query")){
        q = params.get("query");
    }else if (sessionStorage.getItem('query')){
        q = sessionStorage.getItem('query');
    }
    return q;
}

export default function SearchBar(props) {
    const [query, setQuery] = useState(initialQuery());
    const {search} = props;

    //const data = JSON.parse(localStorage.getItem(query.toLowerCase()));

    //const [relevant, setRelevant] = useState(data.relevant ?? []);
    //const [irrelevant, setIrrelevant] = useState(data.irrelevant ?? []);

 /*   localStorage.setItem(query, JSON.stringify(
        {
            relevant: [],
            irrelevant: [],
        }
    ))*/




    /*const relevant = JSON.parse(localStorage.getItem(query.toLowerCase() + " : relevant"));
    if (relevant){
        relevantVar([...relevant]);
    }else{
        relevantVar([]);
    }

    const irrelevant = JSON.parse(localStorage.getItem(query.toLowerCase() + " : irrelevant"));
    if (irrelevant){
        irrelevantVar([...irrelevant]);
    }else{
        irrelevantVar([]);
    }*/

    const changeHandler = (event) => {
        if (event.key === 'Enter') {
            selectedVar(new Set());
            props.search({ variables: { query: query.split(" ").filter((word) => !stopwords.includes(word.toLowerCase())).join(" AND ") } })
            //for prev queries retrieve existing ranking from localstorage and insert into rankingVar
            //or set to empty array if no ranking exists
            /*const relevant = JSON.parse(localStorage.getItem(query.toLowerCase() + " : relevant"));
            if (relevant){
                relevantVar([...relevant]);
            }else{
                relevantVar([]);
            }
            const irrelevant = JSON.parse(localStorage.getItem(query.toLowerCase() + " : irrelevant") );
            if (irrelevant){
                irrelevantVar([...irrelevant]);
            }else{
                irrelevantVar([]);
            }*/
            sessionStorage.setItem('query', query);
        }else{
            setQuery(event.target.value)
        }
    };

    useEffect(() => {
        sessionStorage.setItem('query', query);
        search({ variables: { query: query.split(" ").join(" AND ") } });
        }, [search]

    );

    return <>

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

    </>


}