import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const DetailsScreen = ({ route }) => {
  const { movie } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: movie.image.original }} style={styles.image} />
      <Text style={styles.title}>{movie.name}</Text>
      <Text style={styles.summary}>{movie.summary.replace(/<\/?[^>]+(>|$)/g, "")}</Text>
      <Text style={styles.details}>Status: {movie.status}</Text>
      <Text style={styles.details}>Premiered: {movie.premiered}</Text>
      <Text style={styles.details}>Genres: {movie.genres.join(', ')}</Text>
      <Text style={styles.details}>Average Rating: {movie.rating.average}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  summary: {
    fontSize: 16,
    marginBottom: 8,
  },
  details: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default DetailsScreen;
