import {gql} from "@apollo/client";


export const GET_EXPRESSIONS = gql`
query($query: String!, $sort: [ExpressionFulltextSort!], $limit: Int!) {
  expressionsFulltextExpressions(
    phrase: $query
    limit: $limit
    sort: $sort
    where: {expression: {manifestationsAggregate: {count_GT: 0}}}) {
    score,
    ranking @client,
    expression {
        id,
        label,
        checked @client,
        ranking @client,
        expanded @client,
        title,
        titlepreferred,
        titlevariant,
        uri,
        form,
        contentsnote
        pagerank,
        language{
            label,
            uri
        },
        content{
            label,
            uri
        },
        creatorsConnection{
          totalCount,
            edges{
                node{
                    id, 
                    name,
                    uri
                },
                properties{
                    role
                }
            }
        }
        work{
            id,
            label,
            title,
            form,
            type{
                label,
                uri
            }
            creatorsConnection{
              totalCount,
                edges{
                    node{
                        id,
                        name,
                        uri
                    },
                    properties{
                        role
                    }
                }
            },
            hasSubjectAgentConnection{
                totalCount,
                edges{
                    node{
                        name,
                        label
                    }
                }
            },
            hasSubjectWorkConnection{
                totalCount,
                edges{
                    node{
                        label,
                        title,
                        titlevariant,
                        titlepreferred
                    }
                }
            },
            isSubjectWorkConnection{
                totalCount,
                edges{
                    node{
                        label,
                        title,
                        titlevariant,
                        titlepreferred
                    }
                }
            },
            relatedToConnection{
                totalCount,
                edges{
                    properties{
                        role
                    },
                    node{
                        id,
                        label,
                        title,
                        titlevariant,
                        titlepreferred
                    }
                }
            },
            relatedFromConnection{
                totalCount,
                edges{
                    properties{
                        role
                    },
                    node{
                        id,
                        label,
                        title,
                        titlevariant,
                        titlepreferred
                    }
                }
            },
            hasPartConnection{
                totalCount,
                edges{
                    properties{
                        role
                    },
                    node{
                        id,
                        label,
                        title,
                        titlevariant,
                        titlepreferred
                    }
                }
            },
            partOfConnection{
                totalCount,
                edges{
                    properties{
                        role
                    },
                    node{
                        id,
                        label,
                        title,
                        titlevariant,
                        titlepreferred
                    }
                }
            }
        },
        hasPartConnection{
            totalCount,
            edges{
                properties{
                    role
                },
                node{
                    id,
                    label,
                    title,
                    titlevariant,
                    titlepreferred
                }
            }
        },
        partOfConnection{
            totalCount,
            edges{
                properties{
                    role
                },
                node{
                    id,
                    label,
                    title,
                    titlevariant,
                    titlepreferred
                }
            }
        },
        relatedToConnection{
            totalCount,
            edges{
                properties{
                    role
                },
                node{
                    id,
                    label,
                    title,
                    titlevariant,
                    titlepreferred
                }
            }
        },
        relatedFromConnection{
            totalCount,
            edges{
                properties{
                    role
                },
                node{
                    id,
                    label,
                    title,
                    titlevariant,
                    titlepreferred
                }
            }
        },
        manifestations{
            id,
            label,
            uri,
            identifier,
            title,
            subtitle,
            numbering,
            part,
            responsibility,
            edition,
            extent,
            dimensions,
            production,
            publication,
            distribution,
            manufacture,
            copyright,
            series,
            seriesnumbering,
            partnote,
            contentsnote
            carrier{
                uri,
                label
            },
            media{
                uri,
                label
            },
            creatorsConnection{
                edges{
                    node{
                        id,
                        label,
                        name,
                        uri
                    },
                    properties{
                        role
                    }
                }
            },
            expressions{
                id,
                label,
                uri,
                title,
                titlepreferred,
                titlevariant,
                form,
                contentsnote,
                work {
                    label
                }
                hasPartConnection{
                    totalCount,
                    edges{
                        properties{
                            role
                        },
                        node{
                            id,
                            label,
                            title,
                            titlevariant,
                            titlepreferred
                        }
                    }
                }
            }
        }
    }
  }
}
`
export const CREATE_RANKING = gql`
    mutation ($uri: String!, $date: String!, $query: String!, $respondent: String!, $task: String!, $relevant: [String!]!, $irrelevant: [String!]!, $results: [String!]!, $bibliographicExpertise: Int!, $searchExpertise: Int!, $taskConfidence: Int!, $expandedHistory: [String]!) {
      createRankingResults (input: [
        {
          uri: $uri
          date: $date
          query: $query
          respondent: $respondent
          task: $task
          relevant: $relevant
          irrelevant: $irrelevant
          results: $results
          bibliographicExpertise: $bibliographicExpertise
          searchExpertise: $searchExpertise
          taskConfidence: $taskConfidence
          expandedHistory: $expandedHistory
        }
    
      ]) {
        rankingResults {
          date
          respondent
          query
          relevant
          irrelevant
          results
          bibliographicExpertise
          searchExpertise
          taskConfidence
          expandedHistory
        }
      }
    }
`

