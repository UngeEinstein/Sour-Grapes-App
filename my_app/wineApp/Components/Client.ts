import { HttpLink, ApolloClient, InMemoryCache } from "@apollo/client";

// Connects to the server on NTNU IDI's Virtual Machine.
const httpLink = new HttpLink({ uri: 'http://it2810-30.idi.ntnu.no:3000/graphql' })

export const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});