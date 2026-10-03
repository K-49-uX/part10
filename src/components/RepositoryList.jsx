import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import { RepositoryListContainer } from './RepositoryListContainer';

const RepositoryList = () => {
  const { repositories } = useRepositories();
  const navigate = useNavigate();

  return (
    <RepositoryListContainer
      repositories={repositories}
      onSelectRepository={id => navigate(`/repositories/${id}`)}
    />
  );
};

export default RepositoryList;
