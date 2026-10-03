import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (variables) => {
  const { data, loading, error, refetch } = useQuery(GET_REPOSITORIES, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  // Transform the paginated edges/nodes structure to match what RepositoryList expects
  const repositories = data ? data.repositories : null;

  return { repositories, loading, error, refetch };
};

export default useRepositories;
