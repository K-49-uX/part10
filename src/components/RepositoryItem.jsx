import { View, Text, Image, StyleSheet, Pressable, Linking } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
  },
  topContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 4,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  fullName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
    color: '#24292e',
  },
  description: {
    color: '#586069',
    fontSize: 14,
    marginBottom: 6,
  },
  languageContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#0366d6',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  languageText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statCount: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 2,
    color: '#24292e',
  },
  statLabel: {
    color: '#586069',
    fontSize: 12,
  },
  githubButton: {
    backgroundColor: '#0366d6',
    borderRadius: 4,
    padding: 12,
    marginTop: 15,
    alignItems: 'center',
  },
  githubButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const formatCount = (count) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count;
};

const RepositoryItem = ({ item, showGitHubButton = false }) => {
  return (
    <View testID="repositoryItem" style={styles.container}>
      <View style={styles.topContainer}>
        <Image source={{ uri: item.ownerAvatarUrl }} style={styles.avatar} />
        <View style={styles.infoContainer}>
          <Text style={styles.fullName}>{item.fullName}</Text>
          <Text style={styles.description}>{item.description}</Text>
          {item.language ? (
            <View style={styles.languageContainer}>
              <Text style={styles.languageText}>{item.language}</Text>
            </View>
          ) : null}
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statCount}>{formatCount(item.stargazersCount)}</Text>
          <Text style={styles.statLabel}>Stars</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statCount}>{formatCount(item.forksCount)}</Text>
          <Text style={styles.statLabel}>Forks</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statCount}>{formatCount(item.reviewCount)}</Text>
          <Text style={styles.statLabel}>Reviews</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statCount}>{item.ratingAverage}</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
      </View>
      {showGitHubButton && (
        <Pressable
          accessibilityRole="button"
          style={styles.githubButton}
          onPress={() => Linking.openURL(item.url)}
        >
          <Text style={styles.githubButtonText}>Open in GitHub</Text>
        </Pressable>
      )}
    </View>
  );
};

export default RepositoryItem;
