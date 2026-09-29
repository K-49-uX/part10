
import { StyleSheet, View } from 'react-native';
import RepositoryList from './src/components/RepositoryList';
export default function App() {
  return (
    <View style={styles.container}>
      <RepositoryList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1e4e8',
    paddingTop: 40,
  },
});