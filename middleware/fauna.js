import { GraphQLClient, gql } from "graphql-request";

const gqlClient = new GraphQLClient('https://graphql.us.fauna.com/graphql', {
    headers: {
        authorization: `Bearer ${process.env.FAUNA_ADMIN_KEY}`
    }
})

export const insertDriver = async (driverData) => {
    const mutation = gql`
        mutation createDriver($custid: Int!, $displayname: String!, $clubname: String!) {
            createDriver(data: {
                custid: $custid
                displayname: $displayname
                clubname: $clubname
            }) {
                custid
                displayname
            }
        }
    `

    const variables = {
        custid: driverData.custid,
        displayname: driverData.displayname,
        clubname: driverData.clubname
    }

    const data = await gqlClient.request(mutation, variables);

    console.log(JSON.stringify(data, undefined, 2))
}