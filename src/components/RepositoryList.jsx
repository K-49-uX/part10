import { useState } from 'react';
import useDebounce from '../hooks/useDebounce';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import { RepositoryListContainer } from './RepositoryListContainer';

const RepositoryList = () => {
  const [order, setOrder] = useState('latest');
  const [filterKeyword, setFilterKeyword] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const debouncedKeyword = useDebounce(filterKeyword, 500);
  const sorting = {
    latest: { orderBy: 'CREATED_AT', orderDirection: 'DESC', label: 'Latest repositories' },
    highest: { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC', label: 'Highest rated repositories' },
    lowest: { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC', label: 'Lowest rated repositories' },
  };
  const { repositories, error } = useRepositories({
    orderBy: sorting[order].orderBy,
    orderDirection: sorting[order].orderDirection,
    searchKeyword: debouncedKeyword,
  });
  const navigate = useNavigate();

  return (
    <RepositoryListContainer
      repositories={repositories}
      error={error}
      filterKeyword={filterKeyword}
      onFilterKeywordChange={setFilterKeyword}
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
