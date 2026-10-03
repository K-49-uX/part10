import { StyleSheet, View } from 'react-native';
import { NativeRouter, Routes, Route, Navigate } from 'react-router-native';
import { ApolloProvider } from '@apollo/client/react';
import AppBar from './src/components/AppBar';
import RepositoryList from './src/components/RepositoryList';
import SignIn from './src/components/SignIn';
import Repository from './src/components/Repository';
import CreateReview from './src/components/CreateReview';
import SignUp from './src/components/SignUp';
import MyReviews from './src/components/MyReviews';
import createApolloClient from './src/utils/apolloClient';
import AuthStorage from './src/utils/authStorage';
import AuthStorageContext from './src/contexts/AuthStorageContext';

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

export default function App() {
  console.log('AppBar:', AppBar);
  console.log('RepositoryList:', RepositoryList);
  console.log('SignIn:', SignIn);
  console.log('Navigate:', Navigate);
  console.log('ApolloProvider:', ApolloProvider);
  return (
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <AuthStorageContext.Provider value={authStorage}>
          <View style={styles.container}>
            <AppBar />
            <Routes>
              <Route path="/" element={<RepositoryList />} />
              <Route path="/repositories/:id" element={<Repository />} />
              <Route path="/review" element={<CreateReview />} />
              <Route path="/reviews" element={<MyReviews />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </View>
        </AuthStorageContext.Provider>
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
