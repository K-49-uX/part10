
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 14,
    marginBottom: 4,
  },
  boldText: {
    fontWeight: 'bold',
  },
});

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        <Text style={styles.boldText}>Full name: </Text>
        {item.fullName}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.boldText}>Description: </Text>
        {item.description}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.boldText}>Language: </Text>
        {item.language}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.boldText}>Stars: </Text>
        {item.stargazersCount}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.boldText}>Forks: </Text>
        {item.forksCount}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.boldText}>Reviews: </Text>
        {item.reviewCount}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.boldText}>Rating: </Text>
        {item.ratingAverage}
      </Text>
    </View>
  );
};

export default RepositoryItem;