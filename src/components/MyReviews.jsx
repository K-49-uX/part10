import { ActivityIndicator, Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useMutation, useQuery } from '@apollo/client/react';
import { useNavigate } from 'react-router-native';
import { ME } from '../graphql/queries';
import { DELETE_REVIEW } from '../graphql/mutations';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#e1e4e8',
  },
  item: {
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
  repository: {
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
  actions: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 15,
    paddingBottom: 15,
    backgroundColor: 'white',
  },
  actionButton: {
    flex: 1,
    borderRadius: 4,
    padding: 12,
    alignItems: 'center',
  },
  viewButton: {
    backgroundColor: '#0366d6',
  },
  deleteButton: {
    backgroundColor: '#d73a49',
  },
  actionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    padding: 15,
    backgroundColor: 'white',
    color: '#24292e',
  },
});

const formatDate = value => {
  const date = new Date(value);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${String(date.getDate()).padStart(2, '0')} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

const MyReviewItem = ({ review, onViewRepository, onDeleteReview }) => (
  <View>
    <View style={styles.item}>
      <View style={styles.rating}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.repository}>{review.repository.fullName}</Text>
        <Text style={styles.date}>{formatDate(review.createdAt)}</Text>
        <Text style={styles.text}>{review.text}</Text>
      </View>
    </View>
    <View style={styles.actions}>
      <Pressable
        accessibilityRole="button"
        style={[styles.actionButton, styles.viewButton]}
        onPress={() => onViewRepository(review.repository.id)}
      >
        <Text style={styles.actionText}>View repository</Text>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        style={[styles.actionButton, styles.deleteButton]}
        onPress={() => onDeleteReview(review.id)}
      >
        <Text style={styles.actionText}>Delete review</Text>
      </Pressable>
    </View>
  </View>
);

const MyReviews = () => {
  const { data, loading, error, refetch } = useQuery(ME, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  });
  const [deleteReview] = useMutation(DELETE_REVIEW);
  const navigate = useNavigate();

  const confirmDelete = id => {
    Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const result = await deleteReview({ variables: { id } });
          if (result.data?.deleteReview) {
            await refetch();
          }
        },
      },
    ]);
  };

  if (loading && !data) {
    return <View testID="myReviewsLoading"><ActivityIndicator /></View>;
  }

  if (error) {
    return <Text accessibilityRole="alert" style={styles.message}>Could not load reviews: {error.message}</Text>;
  }

  const reviews = data?.me?.reviews?.edges.map(edge => edge.node) ?? [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <MyReviewItem
          review={item}
          onViewRepository={id => navigate(`/repositories/${id}`)}
          onDeleteReview={confirmDelete}
        />
      )}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListEmptyComponent={<Text style={styles.message}>You have not written any reviews yet.</Text>}
    />
  );
};

export default MyReviews;
