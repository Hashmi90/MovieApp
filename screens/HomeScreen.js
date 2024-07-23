import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TextInput, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [movies, setMovies] = useState([]);
  const navigation = useNavigation();
  
  useEffect(() => {
    fetch('https://api.tvmaze.com/search/shows?q=all')
      .then(response => response.json())
      .then(data => setMovies(data.map(item => item.show)));
  }, []);

  const handlePress = (movie) => {
    navigation.navigate('DetailsScreen', { movie });
  };

  const handleSearchPress = () => {
    navigation.navigate('SearchScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput placeholder="Search..." style={styles.searchInput} />
        <Button title="Search" onPress={handleSearchPress} />
      </View>
      <FlatList
        data={movies}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item)}>
            <View style={styles.movieItem}>
              <Image source={{ uri: item.image.medium }} style={styles.thumbnail} />
              <View style={styles.movieDetails}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.summary}>{item.summary.replace(/<\/?[^>]+(>|$)/g, "")}</Text>
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
    padding: 16,
  },
  searchBar: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
  },
  movieItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  thumbnail: {
    width: 100,
    height: 150,
    marginRight: 16,
  },
  movieDetails: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  summary: {
    fontSize: 14,
  },
});

export default HomeScreen;
