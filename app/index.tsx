import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';

const HomeScreen = () => {
  const [movies, setMovies] = React.useState([]);
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = React.useState('');

  React.useEffect(() => {
    fetch('https://api.tvmaze.com/search/shows?q=all')
      .then(response => response.json())
      .then(data => setMovies(data.map(item => item.show)));
  }, []);

  const handleMoviePress = (movie) => {
    navigation.navigate('DetailsScreen', { movie });
  };

  const handleSearchPress = () => {
    navigation.navigate('SearchScreen');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for movies..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        onFocus={handleSearchPress}
      />
      <FlatList
        data={movies}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleMoviePress(item)}>
            <View style={styles.movieItem}>
              <Image source={{ uri: item.image?.medium }} style={styles.image} />
              <View style={styles.movieInfo}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.summary}>{item.summary.replace(/<[^>]+>/g, '').slice(0, 100)}...</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  movieItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  movieInfo: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  summary: {
    fontSize: 14,
    color: 'gray',
  },
});

export default HomeScreen;
