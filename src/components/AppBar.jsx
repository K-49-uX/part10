import { View, StyleSheet, ScrollView, Pressable, Text } from 'react-native';
import { Link, useNavigate } from 'react-router-native';
import { useQuery, useApolloClient } from '@apollo/client/react';
import { ME } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    backgroundColor: '#24292e',
    flexDirection: 'row',
  },
  tab: {
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  tabText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const AppBar = () => {
  const { data } = useQuery(ME);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    navigate('/signin');
  };

  const user = data?.me;

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Pressable style={styles.tab}>
          <Link to="/">
            <Text style={styles.tabText}>Repositories</Text>
          </Link>
        </Pressable>

        {user ? (
          <>
            <Pressable style={styles.tab}>
              <Link to="/review">
                <Text style={styles.tabText}>Create a review</Text>
              </Link>
            </Pressable>
            <Pressable style={styles.tab} onPress={handleSignOut}>
              <Text style={styles.tabText}>Sign out</Text>
            </Pressable>
          </>
        ) : (
          <Pressable style={styles.tab}>
            <Link to="/signin">
              <Text style={styles.tabText}>Sign in</Text>
            </Link>
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
