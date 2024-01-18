import Manifestation from "./Manifestation.jsx";
import React, {useEffect, useRef} from "react";
import PropTypes from "prop-types";
import {expandedVar} from "../api/Cache.js";
import {expandHistoryState} from "../state/state.js";
import {useRecoilValue, useSetRecoilState} from "recoil";


ManifestationExpandableList.propTypes = {
    expression: PropTypes.object,
    terms: PropTypes.array,
    defaultExpanded: PropTypes.bool
};

export default function ManifestationExpandableList({expression, terms}){

    const expandedHistory = useRecoilValue(expandHistoryState);
    const setExpandedHistory = useSetRecoilState(expandHistoryState);

    const detailsRef = useRef(null);

    useEffect(() => {

        const handleToggle = () => {
            const arr = expandedVar();
            let index = arr.indexOf(expression.uri);
            if (detailsRef.current.open) {
                if (!expandedHistory.includes(expression.uri)) {
                    setExpandedHistory([...expandedHistory, expression.uri]);
                }
                //console.log("Expanded : " + expandedHistory);
                if (index === -1) {
                    arr.push(expression.uri);
                }
            } else {
                arr.splice(index, 1);
            }
            expandedVar([...arr]);
        };

        detailsRef.current.addEventListener('toggle', handleToggle);
        return () => {
            if (detailsRef.current) {
                detailsRef.current.removeEventListener('toggle', handleToggle);
            }
        };
    }, []);

    return <div className={"expressionManifestationListing"}>
        <details open={expression.expanded} ref={detailsRef}>
            <summary>{expression.manifestations.length} publications available</summary>
            <ul className={"manifestationlist"}>
                {expression && expression.manifestations.map(m => (<Manifestation manifestation={m} form= {expression.form} key={m.uri} checkboxes={false} contentsDisplayed={expression.contentsnote === null} terms={terms}/>))}
            </ul>
        </details>
    </div>
}

