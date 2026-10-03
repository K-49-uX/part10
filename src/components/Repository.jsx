import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { useQuery } from '@apollo/client/react';
import { useParams } from 'react-router-native';
import { GET_REPOSITORY } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#e1e4e8',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const Repository = () => {
  const { id } = useParams();
  const [loadingMore, setLoadingMore] = useState(false);
  const { data, loading, fetchMore } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { id, first: 5 },
    skip: !id,
  });

  if (loading || !data?.repository) {
    return <View testID="repositoryLoading"><ActivityIndicator /></View>;
  }

  const reviewConnection = data.repository.reviews;
  const reviews = reviewConnection?.edges.map(edge => edge.node) ?? [];

  const loadMoreReviews = async () => {
    if (loadingMore || !reviewConnection?.pageInfo?.hasNextPage) return;

    setLoadingMore(true);
    try {
      await fetchMore({
        variables: { after: reviewConnection.pageInfo.endCursor },
      });
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={item => item.id}
      ListHeaderComponent={
        <RepositoryItem item={data.repository} showGitHubButton />
      }
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={loadMoreReviews}
      onEndReachedThreshold={0.5}
      ListFooterComponent={loadingMore ? <ActivityIndicator /> : null}
    />
  );
};

export default Repository;
