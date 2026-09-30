import { StyleSheet, View } from 'react-native';
import { NativeRouter, Routes, Route, Navigate } from 'react-router-native';
import { ApolloProvider } from '@apollo/client/react';
import AppBar from './src/components/AppBar';
import RepositoryList from './src/components/RepositoryList';
import SignIn from './src/components/SignIn';
import createApolloClient from './src/utils/apolloClient';

const apolloClient = createApolloClient();
export default function App() {
  console.log('AppBar:', AppBar);
  console.log('RepositoryList:', RepositoryList);
  console.log('SignIn:', SignIn);
  console.log('Navigate:', Navigate);
  console.log('ApolloProvider:', ApolloProvider);
  return (
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <View style={styles.container}>
          <AppBar />
          <Routes>
            <Route path="/" element={<RepositoryList />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </View>
      </ApolloProvider>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1e4e8',
  },
});