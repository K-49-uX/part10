import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const { data, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

  // Transform the paginated edges/nodes structure to match what RepositoryList expects
  const repositories = data ? data.repositories : null;

  return { repositories, loading, refetch };
};

export default useRepositories;