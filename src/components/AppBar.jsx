import { View, StyleSheet, Pressable, Text } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
    padding: 15,
    flexDirection: 'row',
  },
  tab: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 15,
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Link to="/" component={Pressable} style={styles.tab}>
        <Text style={styles.text}>Repositories</Text>
      </Link>
      <Link to="/signin" component={Pressable} style={styles.tab}>
        <Text style={styles.text}>Sign in</Text>
      </Link>
    </View>
  );
};

export default AppBar;