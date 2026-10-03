import { ActivityIndicator, View } from 'react-native';
import { useQuery } from '@apollo/client/react';
import { useParams } from 'react-router-native';
import { GET_REPOSITORY } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';

const Repository = () => {
  const { id } = useParams();
  const { data, loading } = useQuery(GET_REPOSITORY, {
    variables: { id },
    skip: !id,
  });

  if (loading || !data?.repository) {
    return <View testID="repositoryLoading"><ActivityIndicator /></View>;
  }

  return <RepositoryItem item={data.repository} showGitHubButton />;
};

export default Repository;
