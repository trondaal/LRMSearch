import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import {irrelevantVar, relevantVar} from "../api/Cache.js";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp.js";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown.js";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline.js";
import React from "react";
import { PropTypes } from "prop-types";

RankingButtons.propTypes = {
    expression:PropTypes.shape({
        ranking: PropTypes.number.isRequired,
        uri: PropTypes.string.isRequired
    })
};

export default function RankingButtons({expression}){
    return (
    <div className={"rankingbuttons"}>
        { expression.ranking === 0  &&
            <><Tooltip title={"Mark as relevant"} placement={"right"}>
                <IconButton size="small" onClick={() => {
                    const arr = relevantVar();
                    if (arr.indexOf(expression.uri) === -1){
                        arr.push(expression.uri);
                    }
                    relevantVar([...arr]);
                    //console.log("Relevant: " + relevantVar());
                    //localStorage.setItem(sessionStorage.getItem('query').toLowerCase() + " : relevant", JSON.stringify(relevantVar()));
                }}><ArrowCircleUpIcon color="action" fontSize="small"/>
                </IconButton>
            </Tooltip>
                {<Tooltip title={"Mark as irrelevant"} placement={"right"}>
                    <IconButton size="small" onClick={() => {
                        const arr = irrelevantVar();
                        if (arr.indexOf(expression.uri) === -1) {
                            arr.push(expression.uri);
                        }
                        irrelevantVar([...arr]);
                    }}><ArrowCircleDownIcon color="action" fontSize="small"/>
                    </IconButton>
                </Tooltip>}
            </>
        }
        { expression.ranking !== 0  &&
            <Tooltip title={"Remove marking"} placement={"right"}>
                <IconButton size="small" onClick={() => {
                    if (relevantVar().includes(expression.uri)) {
                        const arr = relevantVar();
                        const index = arr.indexOf(expression.uri);
                        arr.splice(index, 1);
                        relevantVar([...arr]);
                        //localStorage.setItem(sessionStorage.getItem('query').toLowerCase() + " : relevant", JSON.stringify(relevantVar()));
                    }
                    if (irrelevantVar().includes(expression.uri)) {
                        const arr = irrelevantVar();
                        const index = arr.indexOf(expression.uri);
                        arr.splice(index, 1);
                        irrelevantVar([...arr]);
                        //localStorage.setItem(sessionStorage.getItem('query').toLowerCase() + " : irrelevant", JSON.stringify(irrelevantVar()));
                    }
                }}>
                    <RemoveCircleOutlineIcon color="action" fontSize="small"/>
                </IconButton>
            </Tooltip>
        }
    </div>)


}