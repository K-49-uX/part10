import { StyleSheet, View } from 'react-native';
import { NativeRouter, Routes, Route, Navigate } from 'react-router-native';
import AppBar from './src/components/AppBar';
import RepositoryList from './src/components/RepositoryList';
import SignIn from './src/components/SignIn';

export default function App() {
  return (
    <NativeRouter>
      <View style={styles.container}>
        <AppBar />
        <Routes>
          <Route path="/" element={<RepositoryList />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </View>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1e4e8',
  },
});