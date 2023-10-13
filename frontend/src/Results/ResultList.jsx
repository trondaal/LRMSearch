import {selectedVar} from "../api/Cache";
import Expression from "./Expression";

export default function ResultView({results, checkboxes, expanded, display}) {

    if (results === undefined){
        return <div>No results</div>
    }else if (results.length === 0){
        return <div>No results</div>
    }else if (display === 1){
        //return all items in resultset
        return (<div className={"expressionList"}>
            {results.map(x => (<Expression expression={x.expression} key={x.expression.uri} checkboxes={checkboxes} expanded={expanded}/>))}
        </div>)
    }else if (display === 2){
        return (
            <div className={"expressionList"}>
                {results.filter(x => x.expression.form !== "aggregate").map(x => (<Expression expression={x.expression} key={x.expression.uri} checkboxes={checkboxes} expanded={expanded}/>))}
            </div>)
    }else if (display === 3){
        return (
            <div className={"expressionList"}>
                {results.filter(x => x.expression.form !== "part").map(x => (<Expression expression={x.expression} key={x.expression.uri} checkboxes={checkboxes} expanded={expanded}/>))}
            </div>)
    }else{
        return <div></div>
    }
}

/*selectedVar().size === 0 ?
                results ? results.map(x => (<Expression expression={x.expression} key={x.expression.uri} checkboxes={checkboxes} expanded={expanded}/>)) : [] :
                results ? results.filter(exp => exp.checked).map(x => (<Expression expression={x.expression} key={x.expression.uri} checkboxes={checkboxes} expanded={expanded}/>)) : []
            */