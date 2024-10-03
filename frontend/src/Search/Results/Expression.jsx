import Typography from "@mui/material/Typography";
import IconTypes from "./IconTypes.jsx";
import "./ResultList.css";
import {PublicationData, ManifestationTitle, ContentsNote} from "./Manifestation.jsx";
import {useRecoilState} from 'recoil';
import {showUriState} from "../../state/state.js";
import "./ResultList.css";
import RankingButtons from "./RankingButtons.jsx";
import Agents from "./Agents.jsx";
import Related, {PartOf} from "./Related.jsx";
import PropTypes from "prop-types";
import ExpressionTitle from "./ExpressionTitle.jsx";
import ManifestationExpandableList from "./ManifestationExpandableList.jsx";

Expression.propTypes = {
    expression: PropTypes.shape({
        uri: PropTypes.string,
        language: PropTypes.array,
        content: PropTypes.array,
        manifestations: PropTypes.array,
        ranking: PropTypes.number,
        form: PropTypes.string,
        work: PropTypes.array,
        partOfConnection: PropTypes.object,
        relatedToConnection: PropTypes.object,
        contentsnote: PropTypes.string,
        pagerank: PropTypes.number
    }),
    terms: PropTypes.array,
    score: PropTypes.number
};

function relevantClass(ranking){
    //Check if an entry is marked as relevant or not, used for styling
    if (ranking === 1){
        return "relevant";
    }else if (ranking === -1){
        return "irrelevant";
    }else{
        return "";
    }
}

export default function Expression({expression, terms, score}){
    const [showUri] = useRecoilState(showUriState);

    //identify content type, want text to be first
    const content = expression.content.map(c => c.label);
    content.sort();
    content.reverse();

    const ExpressionDetails = () => {
        if (expression.manifestations.length === 1) {
            return <div className={"expressionHeader"}>
                        <div className={"expressionHeaderTitle"}>
                            <ExpressionTitle expression={expression} terms={terms}/>
                            <Agents expression={expression} terms={terms}/>
                            <Related expression={expression}/>
                            <PartOf expression={expression}/>
                            {expression.form === "part" &&
                            <ManifestationTitle terms={terms} manifestation={expression.manifestations[0]}
                                                    prefix={"In: "}/>}
                            <PublicationData manifestation={expression.manifestations[0]}/>
                            {!(expression.manifestations[0].contentsnote === null) &&
                            <ContentsNote contents={expression.manifestations[0].contentsnote} terms={terms}/>}
                            {showUri && <Typography component="div" align="left"
                                                    variant="eroles">{expression.uri + " : " + score + " : " + expression.pagerank}</Typography>}
                        </div>
                    </div>
        } else {
            return <>
                <div className={"expressionHeader"}>
                    <div className={"expressionHeaderTitle"}>
                        <ExpressionTitle expression={expression} terms={terms}/>
                        <Agents expression={expression} terms={terms}/>
                        <Related expression={expression}/>
                        <PartOf expression={expression}/>
                        {!(expression.contentsnote === null) &&
                        <ContentsNote contents={expression.contentsnote} terms={terms}/>}
                        {showUri && <Typography component="div" align="left"
                                                variant="eroles">{expression.uri + " : " + score + " : " + expression.pagerank}</Typography>}
                    </div>
                </div>
                <ManifestationExpandableList expression={expression} terms={terms}/>
            </>
        }
    }

    // Return the expression component
    return <div className={"expression"} key={expression.uri}>
                <div className={relevantClass(expression.ranking) + " expressionLeft"}>
                    <IconTypes type={content[0]} text={expression.language[0] ? expression.language[0].uri.split("/").at(-1) : ""}/>
                    <RankingButtons expression={expression}/>
                </div>
                <div className="resultitem expressionRight">
                    <ExpressionDetails/>
                </div>
            </div>
}