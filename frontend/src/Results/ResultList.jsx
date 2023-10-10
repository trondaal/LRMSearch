import {selectedVar} from "../api/Cache";
import Expression from "./Expression";

export default function ResultView({results, checkboxes, expanded, noAggregates}) {

    return (
        <div className={"expressionList"}>
            {/*selectedVar().size === 0 ?
                results ? results.map(x => (<Expression expression={x.expression} key={x.expression.uri} checkboxes={checkboxes} expanded={expanded}/>)) : [] :
                results ? results.filter(exp => exp.checked).map(x => (<Expression expression={x.expression} key={x.expression.uri} checkboxes={checkboxes} expanded={expanded}/>)) : []
            */}
            {noAggregates ?
                results ? results.filter(x => x.expression.form !== "collection").map(x => (<Expression expression={x.expression} key={x.expression.uri} checkboxes={checkboxes} expanded={expanded}/>)) : [] :
                results ? results.map(x => (<Expression expression={x.expression} key={x.expression.uri} checkboxes={checkboxes} expanded={expanded}/>)) : []}

        </div>
    );
}