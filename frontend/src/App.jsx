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
import SubmitRanking from "./Search/SubmitRanking.jsx";
import {useState} from 'react';


export default function MyApp() {
    //const [config, setConfig] = useRecoilState(configState);
    const showFilters = useRecoilValue(showFiltersState);
    const setChecked = useSetRecoilState(filterState);
   // const setSelected = useSetRecoilState(selectedState);
    const params = new URLSearchParams(window.location.search)

    const handleClearFilters = (event) => {
        setChecked([]);
        selectedVar(new Set([]));
    }

    const [search, { loading, data, error, called }] = useLazyQuery(GET_EXPRESSIONS);
    const [expanded, setExpanded] = useState(false);
    const [noAggregates, setNoAggregates] = useState(params.get("noaggregates") === "true" ? true : false)

    if (error)
        console.log(error);

    return (
        <>
            <CssBaseline/>
            <Grid container spacing={3} marginTop={1} paddingLeft={20} paddingRight={20} >
                {/* Adjusting size according to filters or not, not showing right column when filters are off */}
                <Grid item xs={showFilters ? 9 : 12}>
                    <SearchBar search={search} expanded={expanded} setExpanded={setExpanded} results={data ? data.expressionsFulltextExpressions : []}/>
                </Grid>
                {showFilters && <Grid xs={3} item justifyContent="flex-end">
                    {showFilters ? <Button variant="outlined" size="small" onClick={handleClearFilters}>Clear filters</Button> : ""}
                </Grid> }
                <Grid item xs={showFilters ? 9 : 12}>
                    {called && loading ? <Grid item xs={9}><CircularProgress /></Grid> : <ResultList results={data ? data.expressionsFulltextExpressions : []} expanded={expanded} noAggregates={noAggregates}/>}
                </Grid>
                {showFilters ? <Grid item xs={3}>
                    <FilterList results={data ? data.expressionsFulltextExpressions : []}/>
                </Grid> : ""}
            </Grid>
        </>
    );
}