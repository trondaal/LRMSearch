const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { Neo4jGraphQL } = require("@neo4j/graphql");
const neo4j = require("neo4j-driver");
require('dotenv').config()

//https://community.neo4j.com/t/integrate-neo4j-graphql-driver-in-apollo-v4/58766/2?u=taalberg

// noinspection GraphQLMissingType
const typeDefs = `
    type Expression @fulltext(indexes: [{ indexName: "expressions", fields: ["titles", "names"] }]) {
        _id: Int!
        label: String
        uri: String
        title: String
        titlepreferred: String
        titlevariant: String
        titles: String
        names: String
        form: String
        contentsnote: String
        manifestations: [Manifestation!]! @relationship(type: "EMBODIES", direction: IN)
        work: [Work!]! @relationship(type: "REALIZES", direction: OUT)
        language: [Concept!]! @relationship(type: "LANGUAGE", direction: OUT)
        content: [Concept!]! @relationship(type: "CONTENT", direction: OUT)
        creators: [Agent!]! @relationship(type: "CREATOR", properties: "roleType", direction: OUT)
        partOf: [Expression!]! @relationship(type: "PARTOF", direction: OUT)
        hasPart: [Expression!]! @relationship(type: "PARTOF", direction: IN)
        relatedTo: [Expression!]! @relationship(type: "RELATED", properties: "roleType", direction: OUT)
        relatedFrom: [Expression!]! @relationship(type: "RELATED", properties: "roleType", direction: IN)
    }
    type Work @fulltext(indexes: [{ indexName: "works", fields: ["titles", "names"] }]) {
        _id: Int!
        label: String
        uri: String
        title: String
        titlepreferred: String
        titlevariant: String
        titles: String
        names: String
        form: String
        type: [Concept!]! @relationship(type: "TYPE", direction: OUT)
        creators: [Agent!]! @relationship(type: "CREATOR", properties: "roleType", direction: OUT)
        hasSubjectWork: [Work!]! @relationship(type: "SUBJECT", direction: OUT)
        isSubjectWork: [Work!]! @relationship(type: "SUBJECT", direction: IN)
        hasSubjectAgent: [Agent!]! @relationship(type: "SUBJECT", direction: OUT)
        partOf: [Work!]! @relationship(type: "PARTOF", direction: OUT)
        hasPart: [Work!]! @relationship(type: "PARTOF", direction: IN)
        relatedTo: [Work!]! @relationship(type: "RELATED", properties: "roleType", direction: OUT)
        relatedFrom: [Work!]! @relationship(type: "RELATED", properties: "roleType", direction: IN)

    }
    type Manifestation {
        _id: Int!
        label: String
        uri: String
        identifier: String
        title: String
        subtitle: String
        numbering: String
        part: String
        responsibility: String
        edition: String
        extent: String
        dimensions: String
        publication: String
        production: String
        distribution: String
        manufacture: String
        productionplace: String
        producer: String
        productiondate: String
        publicationplace: String
        publisher: String
        publicationdate: String
        distributionplace: String
        distributor: String
        distributiondate: String
        manufactureplace: String
        manufacturer: String
        manufacturedate: String
        copyright: String
        series: String
        seriesnumbering: String
        partnote: String
        contentsnote: String
        carrier: [Concept!]! @relationship(type: "CARRIER", direction: OUT)
        media: [Concept!]! @relationship(type: "MEDIATYPE", direction: OUT)
        creators: [Agent!]! @relationship(type: "CREATOR", properties: "roleType", direction: OUT)
        expressions: [Expression!]! @relationship(type: "EMBODIES", direction: OUT)
    }
    type Concept{
        _id: Int!
        label: String,
        uri: String
    }
    type Agent {
        _id: Int!
        label: String
        name: String
        uri: String
    }
    interface roleType @relationshipProperties {
        role: String
    }
    type RankingResult{
        uri: String
        query: String
        respondent: String
        date: String
        relevant: [String]
        irrelevant: [String]
        results: [String]
        bibliographicExpertise: Int
        searchExpertise: Int
        taskConfidence: Int
    }
`;

console.log(process.env)

const driver = neo4j.driver(
    process.env.NEO4J_URI,
    neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);



const neoSchema = new Neo4jGraphQL({ typeDefs, driver });

neoSchema.getSchema().then(async (schema) => {
    const server = new ApolloServer({
        schema,
    });

    const { url } = await startStandaloneServer(server, {listen: { port: process.env.API_PORT }});
    console.log(`Server ready at ${url}`);
});