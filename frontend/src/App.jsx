import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import ResultList from "./Results/ResultList";
import { useLazyQuery} from '@apollo/client';
import {GET_EXPRESSIONS} from "./api/Queries";
import SearchBar from "./Search/SearchBar";
import CircularProgress from '@mui/material/CircularProgress';
import FilterList from "./Filters/FilterList";
import Button from '@mui/material/Button';
import {filterState, showFiltersState, selectedState, configState} from './state/state';
import {useRecoilState, useSetRecoilState, useRecoilValue} from 'recoil';
import {selectedVar} from "./api/Cache";
import {useState} from 'react';


export default function MyApp() {
    //const [config, setConfig] = useRecoilState(configState);
    const showFilters = useRecoilValue(showFiltersState);
    const setChecked = useSetRecoilState(filterState);
   // const setSelected = useSetRecoilState(selectedState);
    //const params = new URLSearchParams(window.location.search)

    const handleClearFilters = (event) => {
        setChecked([]);
        selectedVar(new Set([]));
    }



    const [search, { loading, data, error, called }] = useLazyQuery(GET_EXPRESSIONS);
    const [expanded, setExpanded] = useState(false);
    const [display, setDisplay] = useState(1);

    if (error)
        console.log(error.message);

    return (
        <>
            <CssBaseline/>
            <Grid container spacing={3} marginTop={1} paddingLeft={20} paddingRight={20} >
                <Grid item xs={12}>
                    <SearchBar search={search} expanded={expanded} setExpanded={setExpanded} results={data ? data.expressionsFulltextExpressions : []} display={display} setDisplay={setDisplay}/>
                </Grid>
                <Grid item xs={12}>
                    {called && loading ? <Grid item xs={6}><CircularProgress /></Grid> : <ResultList results={data ? data.expressionsFulltextExpressions : []} expanded={expanded} display={display}/>}
                </Grid>
            </Grid>
        </>
    );
}