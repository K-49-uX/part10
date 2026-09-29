import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  text: {
    fontSize: 16,
    color: '#24292e',
  },
});

const SignIn = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>The sign-in view</Text>
    </View>
  );
};

export default SignIn;