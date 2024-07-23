import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TextInput, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const navigation = useNavigation();

  const handleSearch = () => {
    fetch(`https://api.tvmaze.com/search/shows?q=${searchTerm}`)
      .then(response => response.json())
      .then(data => setResults(data.map(item => item.show)));
  };

  const handlePress = (movie) => {
    navigation.navigate('DetailsScreen', { movie });
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Search for a movie..."
          value={searchTerm}
          onChangeText={setSearchTerm}
          style={styles.searchInput}
        />
        <Button title="Search" onPress={handleSearch} />
      </View>
      <FlatList
        data={results}
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

export default SearchScreen;
