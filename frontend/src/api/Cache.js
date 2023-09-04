
import {InMemoryCache, makeVar} from "@apollo/client";

export const selectedVar = makeVar(new Set());
export const relevantVar = makeVar([]);
export const irrelevantVar = makeVar([]);

export const Cache = new InMemoryCache({
    typePolicies: {
        ExpressionFulltextResult: {
            fields: {
                ranking: {
                    read(_, { readField }) { // The read function for the isInCart field
                        if (relevantVar().includes(readField('uri', readField('expression')))){
                            return 1;
                        }else if (irrelevantVar().includes(readField('uri', readField('expression')))) {
                            return -1;
                        }else{
                            return 0;
                        }
                    }
                }
            }
        },
        Expression: {
            fields: {
                checked: {
                    read(_, { readField }) { // The read function for the isInCart field
                        return selectedVar().has(readField('uri'));
                    }
                },
                ranking: {
                    read(_, { readField }) { // The read function for the isInCart field
                        if (relevantVar().includes(readField('uri'))){
                            return 1;
                        }else if (irrelevantVar().includes(readField('uri'))) {
                            return -1;
                        }else{
                            return 0;
                        }
                    }
                }
            }
        }
    }
});