import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { Platform } from 'react-native';
import { setContext } from '@apollo/client/link/context';

const apiUri =
  Platform.OS === 'android'
    ? process.env.EXPO_PUBLIC_APOLLO_URI_ANDROID || 'http://10.0.2.2:4000/graphql'
    : process.env.EXPO_PUBLIC_APOLLO_URI || 'http://localhost:4000/graphql';

const httpLink = createHttpLink({
  uri: apiUri,
});

const createApolloClient = (authStorage) => {
  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken();
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
      };
    } catch (e) {
      console.log(e);
      return {
        headers,
      };
    }
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
