import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 15,
    backgroundColor: 'white',
  },
  rating: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#0366d6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingText: {
    color: '#0366d6',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    marginLeft: 15,
  },
  username: {
    color: '#24292e',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  date: {
    color: '#586069',
    fontSize: 14,
    marginBottom: 10,
  },
  text: {
    color: '#24292e',
    fontSize: 14,
    lineHeight: 20,
  },
});

const formatDate = value => {
  const date = new Date(value);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return `${String(date.getDate()).padStart(2, '0')} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

const ReviewItem = ({ review }) => (
  <View style={styles.container}>
    <View style={styles.rating}>
      <Text style={styles.ratingText}>{review.rating}</Text>
    </View>
    <View style={styles.content}>
      <Text style={styles.username}>{review.user.username}</Text>
      <Text style={styles.date}>{formatDate(review.createdAt)}</Text>
      <Text style={styles.text}>{review.text}</Text>
    </View>
  </View>
);

export default ReviewItem;
