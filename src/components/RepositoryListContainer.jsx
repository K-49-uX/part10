import { FlatList, View, StyleSheet, Pressable, Text } from 'react-native';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
  },
  selector: {
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  selectorText: {
    fontSize: 18,
  },
  menu: {
    paddingTop: 4,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  optionText: {
    fontSize: 16,
  },
  errorText: {
    color: '#b00020',
    padding: 12,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  repositories,
  error,
  onSelectRepository,
  sortLabel = 'Latest repositories',
  menuVisible = false,
  onToggleMenu,
  onSelectSort,
}) => {
  const repositoryNodes = repositories?.edges
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      ListHeaderComponent={
        <View style={styles.header}>
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ expanded: menuVisible }}
            onPress={onToggleMenu}
            style={styles.selector}
          >
            <Text style={styles.selectorText}>{sortLabel}  ▾</Text>
          </Pressable>
          {menuVisible && (
            <View style={styles.menu}>
              {[
                ['latest', 'Latest repositories'],
                ['highest', 'Highest rated repositories'],
                ['lowest', 'Lowest rated repositories'],
              ].map(([value, label]) => (
                <Pressable
                  key={value}
                  accessibilityRole="button"
                  onPress={() => onSelectSort?.(value)}
                  style={styles.option}
                >
                  <Text style={styles.optionText}>{label}</Text>
                </Pressable>
              ))}
            </View>
          )}
          {error && (
            <Text accessibilityRole="alert" style={styles.errorText}>
              Could not load repositories: {error.message}
            </Text>
          )}
        </View>
      }
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => onSelectRepository?.(item.id)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
      keyExtractor={item => item.id}
    />
  );
};
