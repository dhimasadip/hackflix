import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client';

export const movieFavorites = makeVar([])

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                movies: {
                    read: () => {
                        return movieFavorites()
                    }
                }
            }
        }
    }
})

const client = new ApolloClient({
    uri: 'http://localhost:3000',
    cache
});

export default client