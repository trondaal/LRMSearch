import {gql} from "@apollo/client";


export const GET_EXPRESSIONS = gql`
query($query: String!) {
  expressionsFulltextExpressions(
    phrase: $query
    where: {expression: {manifestationsAggregate: {count_GT: 0}}}) {
    score,
    ranking @client,
    expression {
        label,
        checked @client,
        ranking @client,
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
                    name,
                    uri
                },
                role
            }
        }
        work{
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
                        name,
                        label,
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
                    label,
                    title,
                    titlevariant,
                    titlepreferred
                }
            }
        },
        manifestations{
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
                        label,
                        name,
                        uri
                    },
                    role
                }
            },
            expressions{
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
    mutation ($date: String!, $query: String!, $respondent: String!, $relevant: [String!]!, $irrelevant: [String!]!, $neutral: [String!]!, $bibliographicExpertise: Int!, $searchExpertise: Int!) {
      createRankingResults (input: [
        {
          date: $date
          query: $query
          respondent: $respondent
          relevant: $relevant
          irrelevant: $irrelevant
          neutral: $neutral
          bibliographicExpertise: $bibliographicExpertise
          searchExpertise: $searchExpertise
        }
    
      ]) {
        rankingResults {
          date
          respondent
          query
          relevant
          irrelevant
          neutral
          bibliographicExpertise
          searchExpertise
        }
      }
    }
`

