import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import ResultList from "./Search/Results/ResultList";
import { useLazyQuery} from '@apollo/client';
import {GET_EXPRESSIONS} from "./api/Queries";
import SearchBar from "./Search/SearchBar";
import CircularProgress from '@mui/material/CircularProgress';
import FilterList from "./Search/Filters/FilterList";
import Button from '@mui/material/Button';
import {filterState, showFiltersState, selectedState, configState} from './state/state';
import {useRecoilState, useSetRecoilState, useRecoilValue} from 'recoil';
import {selectedVar} from "./api/Cache";
import {useState} from 'react';


export default function Search() {
    //const [config, setConfig] = useRecoilState(configState);
    //const showFilters = useRecoilValue(showFiltersState);
    //const setChecked = useSetRecoilState(filterState);
   // const setSelected = useSetRecoilState(selectedState);
    //const params = new URLSearchParams(window.location.search)

    /*const handleClearFilters = (event) => {
        setChecked([]);
        selectedVar(new Set([]));
    }*/

    const [search, { loading, data, error, called }] = useLazyQuery(GET_EXPRESSIONS);

    if (error)
        console.log(error.message);

    let results = data ? data.expressionsFulltextExpressions : [];

    //let results = [];

    return (
        <>
            <CssBaseline/>
            <Grid container spacing={3} marginTop={0} paddingLeft={20} paddingRight={20} >
                <Grid item xs={12}>
                    <SearchBar search={search} results={results}/>
                </Grid>
                <Grid item xs={12}>
                    {called && loading ? <Grid item xs={6}><CircularProgress /></Grid> : <ResultList results={results}/>}
                </Grid>
            </Grid>
        </>
    );
}