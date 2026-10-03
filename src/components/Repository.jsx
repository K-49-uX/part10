import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
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
  const { data, loading } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { id },
    skip: !id,
  });

  if (loading || !data?.repository) {
    return <View testID="repositoryLoading"><ActivityIndicator /></View>;
  }

  const reviews = data.repository.reviews?.edges.map(edge => edge.node) ?? [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={item => item.id}
      ListHeaderComponent={
        <RepositoryItem item={data.repository} showGitHubButton />
      }
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default Repository;
