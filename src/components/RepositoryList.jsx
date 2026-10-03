import { useState } from 'react';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import { RepositoryListContainer } from './RepositoryListContainer';

const RepositoryList = () => {
  const [order, setOrder] = useState('latest');
  const [menuVisible, setMenuVisible] = useState(false);
  const sorting = {
    latest: { orderBy: 'CREATED_AT', orderDirection: 'DESC', label: 'Latest repositories' },
    highest: { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC', label: 'Highest rated repositories' },
    lowest: { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC', label: 'Lowest rated repositories' },
  };
  const { repositories, error } = useRepositories({
    orderBy: sorting[order].orderBy,
    orderDirection: sorting[order].orderDirection,
  });
  const navigate = useNavigate();

  return (
    <RepositoryListContainer
      repositories={repositories}
      error={error}
      sortLabel={sorting[order].label}
      menuVisible={menuVisible}
      onToggleMenu={() => setMenuVisible(visible => !visible)}
      onSelectSort={value => {
        setOrder(value);
        setMenuVisible(false);
      }}
      onSelectRepository={id => navigate(`/repositories/${id}`)}
    />
  );
};

export default RepositoryList;
