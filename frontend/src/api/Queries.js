import {gql} from "@apollo/client";


export const GET_EXPRESSIONS = gql`
query($query: String!) {
  expressionsFulltextExpressions(
    phrase: $query
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
                role
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
                    role
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
                    role,
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
                    role,
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
                role,
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
                role,
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
                    role
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
    mutation ($uri: String!, $date: String!, $query: String!, $respondent: String!, $relevant: [String!]!, $irrelevant: [String!]!, $results: [String!]!, $bibliographicExpertise: Int!, $searchExpertise: Int!, $taskConfidence: Int!) {
      createRankingResults (input: [
        {
          uri: $uri
          date: $date
          query: $query
          respondent: $respondent
          relevant: $relevant
          irrelevant: $irrelevant
          results: $results
          bibliographicExpertise: $bibliographicExpertise
          searchExpertise: $searchExpertise
          taskConfidence: $taskConfidence
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
        }
      }
    }
`

